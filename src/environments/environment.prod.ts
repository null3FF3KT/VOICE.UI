declare const window: Window & { ENV_VARIABLES?: { [key: string]: string } };

export const environment = {
  production: true, // Set to true in environment.prod.ts
  functionKey: typeof window !== 'undefined' ? window.ENV_VARIABLES?.FUNCTION_KEY || 'default-dev-key' : 'default-dev-key'
};