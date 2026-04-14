import type debounce from "lodash.debounce";

export type DebounceSettings = NonNullable<Parameters<typeof debounce>[2]>;