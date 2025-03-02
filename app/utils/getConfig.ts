import "dotenv/config";

export interface Config {
  token: string;
  serverUrl: string;
  preferredVideoExtension?: string;
}

export function getConfig(): Config {
  const config: Partial<Config> = {};

  // Helper function to convert camelCase to snake_case
  function camelToSnakeCase(key: string): string {
    return key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  // Iterate over the keys of the Config interface
  (Object.keys(config) as (keyof Config)[]).forEach((key) => {
    const envKey = camelToSnakeCase(key).toUpperCase(); // Convert camelCase to snake_case and uppercase
    if (process.env[envKey]) {
      config[key] = process.env[envKey] as string;
    } else {
      throw new Error(`Missing environment variable: ${envKey}`);
    }
  });

  return config as Config;
}
