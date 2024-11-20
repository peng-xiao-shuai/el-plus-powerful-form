import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import PowerfulTable from 'el-plus-powerful-table'
// import en from 'element-plus/lib/locale/lang/en'
// import zh from 'element-plus/lib/locale/lang/zh-cn'
// import PowerfulTable from '../es'
import App from './App.vue'
import 'element-plus/theme-chalk/src/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)
// app.use(ElementPlus, {
//   size: 'large',
//   locale: zh,
// })
app.use(PowerfulTable)
app.mount('#app')
