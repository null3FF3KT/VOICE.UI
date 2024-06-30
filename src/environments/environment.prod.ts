declare const window: Window & { ENV_VARIABLES?: { [key: string]: string } };

export const environment = {
  production: true, // Set to true in environment.prod.ts
  functionKey: ''
};