import { userDTOSchema } from "@/domain/user/model";
import type { Parser, Service } from "@pkg/api";
import z from "zod";

export default function userApi(s: Service, p: Parser) {
  return {
    list: () => s.post("/user").then(p.parse({ 200: z.array(userDTOSchema) })),
  }
}