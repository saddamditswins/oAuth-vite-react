export const ENV_VAR = {
    GOOGLE_AUTH_ID: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID as string,
    GOOGLE_AUTH_SECRET: import.meta.env.VITE_GOOGLE_AUTH_SECRET as string,
    APP_DOMAIN: import.meta.env.VITE_APP_DOMAIN as string,
    APPLE_CLIENT_ID: import.meta.env.VITE_APPLE_CLIENT_ID as string,
    DSN_SENTRY: import.meta.env.VITE_DSN_SENTRY as string,
    SMAPLE_RATE: import.meta.env.VITE_SAMPLE_RATE as string,
}