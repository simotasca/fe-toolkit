import { statusCodes, successStatusCodes, type StatusCode, type SuccessStatusCode } from "./status-codes";
import { z } from "zod";

type ParserFn = (res: Response) => Promise<any> | any;

export type StatusParserMap = Partial<
  Record<
    StatusCode,
    ({ type?: z.ZodType<any, any, any>; label?: string; parser?: ParserFn; } | string | z.ZodType<any, any, any>)
  >
>;

export type ParserOptions = { baseBodyParser?: ParserFn };

type ParseResult<SP extends StatusParserMap> = {
  [K in keyof SP]: {
    status: K;
    body: z.infer<
      SP[K] extends z.ZodType<any, any, any> 
        ? SP[K]
        : SP[K] extends { type: z.ZodType<any, any, any> }
          ? SP[K]["type"]
          : z.ZodAny
    >;
    label: SP[K] extends string 
      ? SP[K] 
      : SP[K] extends { label: string } 
        ? SP[K]["label"] 
        /* the check here should be unnecessary since SP is a Record<StatusCode, ...> */
        : (K extends keyof (typeof statusCodes) ? (typeof statusCodes)[K] : undefined)
    res: Response;
    ok: K extends SuccessStatusCode ? true : false
  };
}[keyof SP];

type ParseUnexpectedResult<SP extends StatusParserMap> = {
  status: Exclude<StatusCode, keyof SP>
  label: "UNEXPECTED",
  body: unknown,
  res: Response,
  message?: string,
  ok: false;
};

export class Parser {
  private baseBodyParser: ParserFn = async (res) => {
    if (res.status >= 500) throw { message: res.statusText, status: res.status, error: await extractKnownBody(res), res };
    return extractKnownBody(res);
  };
  
  constructor(options?: ParserOptions) {
    if (options?.baseBodyParser) this.baseBodyParser = options?.baseBodyParser;
  }

  public parse<const SP extends StatusParserMap = {}>(
    parsers?: SP
  ): (res: Response) => Promise<(ParseResult<SP> | ParseUnexpectedResult<SP>)> {
    return async (res: Response) => {
      const { schema, body, label, message } = await this.extract(res, parsers);
      
      let valid = await schema.parseAsync(body);

      const ok = parsers 
        && Object.keys(parsers).includes(String(res.status)) 
        && Object.keys(successStatusCodes).includes(String(res.status));

      return { status: res.status, label, body: valid, res, message, ok } as any;
    };
  }

  private async extract<const SP extends StatusParserMap>(res: Response, parsers?: SP): 
    Promise<{ schema: z.ZodType<any, any, any>, label?: string, body: any, message?: any }> 
  {
    const p = parsers?.[res.status];

    if (!p) {
      return {
        label: "UNEXPECTED",
        schema: z.any(),
        body: await this.baseBodyParser(res)
      }
    }
  
    if (typeof p === "string") {
      return {
        label: p,
        schema: z.any(),
        body: await this.baseBodyParser(res)
      }
    }

    if (p instanceof z.ZodType) {
      return {
        label: statusCodes[res.status],
        schema: p,
        body: await this.baseBodyParser(res)
      }
    }

    const body = await (p?.parser || this.baseBodyParser)(res);
    return { 
      schema: p?.type || z.any(), 
      body, 
      label: p.label || statusCodes[res.status],
      message: String(body) /* error compatibility */
    };
  }
}

type UnexpectedStatusErrorPayload = { [key: string | number | symbol]: any, status: number } | number;

export class UnexpectedStatusError extends Error {
  public payload: UnexpectedStatusErrorPayload;
  constructor(payload: UnexpectedStatusErrorPayload) {
    super(
      "Unexpected status code " + 
      (typeof payload === "number" ? payload : payload.status) + 
      ((typeof payload === "object" && payload.message) ? ": " + payload.message : "")
    );
    this.payload = payload;
    Object.setPrototypeOf(this, UnexpectedStatusError.prototype);
  }
}
UnexpectedStatusError.prototype.name = "UnexpectedStatusError";

/**
 * Attempts to extract a known body type from a Fetch Response.
 * 
 * Provides extensive defaults for common content types.
 * 
 * If body type is unrecognized leaves it unconsumed.
 */
export async function extractKnownBody(res: Response) {
  const cType = (res.headers.get("content-type") || "").toLowerCase(); // .split(";")[0];
  const [l, r = ""] = cType.split("/").map(s => s.trim());

  if (!cType) return null;
  
  if (l === "text") return res.text();
  
  if (l === "application") {
    if (r.includes("json")) return res.json();

    if (r.includes("x-www-form-urlencoded")) 
      return Object.fromEntries(new URLSearchParams(await res.text()));

    if (r.includes("xml") || r.includes("html")) return res.text();

    if (r.includes("pdf")) return res.blob();
    
    if (r.includes("octet-stream")) return res.arrayBuffer();
  }
  
  if (["image",  "audio", "video"].includes(l)) return res.blob();

  return null;
}

// helper types
export type StatusResponse<T extends { status: number }, S extends number> = T extends { status: S } ? T : never;
export type StatusBody<T extends { status: number, body: any }, S extends number> = StatusResponse<T, S>["body"];

// DEMO USAGE: type ListUsersResponseBody = StatusBody<Awaited<ReturnType<typeof api.users.list>>, 200>;
