export {}

declare module 'vue' {
  export interface GlobalComponents {
    PowerfulForm: typeof import('el-plus-powerful-form')['PowerfulForm']
  }
}
