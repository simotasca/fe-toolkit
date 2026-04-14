import { z, ZodError } from "zod";

const settingsSchema = z.object({
  apiHost: z.url(),
});

type Settings = z.infer<typeof settingsSchema>;

let _settings: Settings;
try {
  _settings = settingsSchema.parse(window.RUNTIME_SETTINGS);
} catch (error) {
  if (error instanceof ZodError) {
    console.error("Invalid settings: ", window.RUNTIME_SETTINGS, error);
    throw new Error("Failed to load settings");
  } else throw error;
}

export const settings = _settings;