/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MODEL_PATH: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
} 