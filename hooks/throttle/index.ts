import type throttle from "lodash.throttle";

export type ThrottleSettings = NonNullable<Parameters<typeof throttle>[2]>;