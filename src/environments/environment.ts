declare const window: Window & { ENV_VARIABLES?: { [key: string]: string } };

export const environment = {
  production: false, // Set to true in environment.prod.ts
  functionKey: 'default-dev-key'
};