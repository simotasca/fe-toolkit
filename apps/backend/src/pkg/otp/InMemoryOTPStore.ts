import { type OTPStore } from "@/pkg/otp/OTPStore.js";
import { randomUUID } from "node:crypto";

type OTPData = { value: any; expiresAt: number };

export class InMemoryOTPStore implements OTPStore {
  private otps: Map<string, OTPData> = new Map();

  constructor(cleanupInterval: number = 1000 * 60 * 30) {
    setInterval(() => {
      for (const [otp, { expiresAt, value }] of this.otps.entries()) {
        if (expiresAt < Date.now() || value === null) {
          this.otps.delete(otp);
        }
      }
    }, cleanupInterval);
    // interval cleanup?
  }

  public store(ttl: number, value: any) {
    const otp = randomUUID();
    this.otps.set(otp, { value, expiresAt: Date.now() + ttl });
    return otp;
  }

  public consume(otp: string) {
    const data = this.otps.get(otp);
    if (data === undefined || data === null) return null;
    if (data.expiresAt <= Date.now()) {
      // expired; remove and return null
      this.otps.delete(otp);
      return null;
    }
    // consume is single-use
    this.otps.delete(otp);
    return data.value;
  }

  public has(otp: string) {
    const data = this.otps.get(otp);
    if (!data || data.expiresAt < Date.now()) {
      this.otps.delete(otp);
      return false;
    }
    return true;
  }
}
