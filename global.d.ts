export {}

declare module 'vue' {
  export interface GlobalComponents {
    PowerfulForm: typeof import('el-plus-powerful-form')['PowerfulForm']
    FCheckbox: typeof import('el-plus-powerful-form/components')['FCheckbox']
    FDatePicker: typeof import('el-plus-powerful-form/components')['FDatePicker']
    FInput: typeof import('el-plus-powerful-form/components')['FInput']
    FRadio: typeof import('el-plus-powerful-form/components')['FRadio']
    FRate: typeof import('el-plus-powerful-form/components')['FRate']
    FRenderJsx: typeof import('el-plus-powerful-form/components')['FRenderJsx']
    FSelect: typeof import('el-plus-powerful-form/components')['FSelect']
    FSwitch: typeof import('el-plus-powerful-form/components')['FSwitch']
    // FUploadFile: typeof import('el-plus-powerful-form')['FUploadFile']
    // FUploadMedia: typeof import('el-plus-powerful-form')['FUploadMedia']
  }
}
