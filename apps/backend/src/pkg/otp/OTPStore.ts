export type OTPStore = {
  /** stores an object and returns the associated unique otp */
  store(ttl: number, value: any): string;

  /** consumes an otp and the associated object or null if otp not present or expired */
  consume<T>(otp: string): T | null;

  /** checks whether the store contains an otp without consuming it */
  has(otp: string): boolean;
};
