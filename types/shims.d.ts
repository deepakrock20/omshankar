// Lightweight shims to avoid editor red underlines when dependencies/types aren't installed yet
declare module "esbuild" {
  export function build(opts: any): Promise<any>;
}

declare module "vite" {
  export function build(opts?: any): Promise<any>;
}

declare module "fs/promises" {
  export function rm(path: string, options?: any): Promise<void>;
  export function readFile(path: string, enc?: string): Promise<string>;
}

// Minimal process shim if @types/node not installed yet
declare const process: {
  env: { [key: string]: string | undefined };
  exit(code?: number): never | void;
};

// Global window typings for analytics
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Minimal ImportMeta.env typing for Vite env vars
interface ImportMetaEnv {
  VITE_GA_ID?: string;
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};

