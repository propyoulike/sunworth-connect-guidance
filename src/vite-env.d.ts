/// <reference types="vite/client" />

declare global {
  function gtag(command: string, ...args: any[]): void;
  function fbq(command: string, ...args: any[]): void;
  
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}
