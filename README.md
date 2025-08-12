## [DEMO](https://peng-xiao-shuai.github.io/vite-vue-admin-docs/zh-CN/component_directive/component/powerful-form-demo.html)

## [DOCS](https://peng-xiao-shuai.github.io/vite-vue-admin-docs/zh-CN/component_directive/component/powerful-form-doc.html)

## 语言
对于语言方面组件是默认使用 `英语` 因为 `element-plus` 默认是使用英语，不引用中文包的主要原因是避免增大体积。
组件内部语言跟随 `element-plus`。 部分 提示文字 语言，组件内部也支持 `中、英` 文，如果你需要支持更多语言或者更改组件内部
的语言，可以在 `use(PowerfulForm, { local: 您的语言变量 })` 替换。也可以参考我们提供的 `demo` 实现。


## 更新预告
- 2.0.0 版本
- - 支持上传功能

## 1.0.16 20250812
- 修复类型错误
## 1.0.15 20250812
- 表单继承表格的配置数据从 `headerList` 更改为 `props.header`。以修复表格配置 `defaultShow` 为 `false` 时表单不会显示
## 1.0.14 20240811
- 升级依赖，去除对 `scss` 强制引入

## 1.0.13 20241128
- 优化继承表格组件 `filters` 数据时只继承了 `key` 和 `label` 问题，改成全部继承

## 1.0.12 20241121
- 修复 `PowerfulForm` 组件鼠标悬浮没有类型提示

## 1.0.11 20241120
- 修复调用 `refreshRender` 函数报错
- 更改依赖配置为 `el-plus-powerful-table`

## 1.0.7 20241119
- 暴露 `visibleFormTrigger` 函数，用于控制表单显示或者隐藏

## 1.0.6 20241118
- `submitForm` 函数添加参数 `options` 支持传递 `successMessage`, `errorMessage` 属性用于覆盖默认提示
- 修复 `submitForm` 验证失败没用返回 false
- 更改类型错误
- 更改 `f-date-picker` 组件默认样式

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- `feat` 添加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关，不影响运行结果
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤消 编辑
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流程改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中
