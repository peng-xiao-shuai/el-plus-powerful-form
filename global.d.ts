export {}

declare module 'vue' {
  export interface GlobalComponents {
    PowerfulForm: typeof import('./index')['PowerfulForm']
  }
}
