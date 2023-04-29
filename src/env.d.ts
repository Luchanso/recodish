declare global {
    namespace NodeJS {
        interface ProcessEnv {
            STEAM_API_KEY: string;
        }
    }
}

export {};
