import { InMemoryOTPStore } from "@/pkg/otp/InMemoryOTPStore.js";
import { type OTPStore } from "@/pkg/otp/OTPStore.js";

export const otpStore: OTPStore = new InMemoryOTPStore()