export class StatusError extends Error {
  public status: number;
  public payload: Record<string, any> = {};

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  public withPayload(cb: (payload: Record<string, any>) => void): StatusError {
    cb(this.payload);
    return this;
  }

  public addPayload(payload: Record<string, any>): StatusError {
    Object.assign(this.payload, payload);
    return this;
  }
}
