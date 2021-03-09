import type { App } from 'vue';
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElMenuItemGroup,
  ElInput,
  ElTabs,
  ElTabPane,
  ElUpload,
  ElRow,
  ElCol,
  ElTooltip,
  ElLoading,
} from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

let components = [
  ElButton,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElMenuItemGroup,
  ElInput,
  ElTabs,
  ElTabPane,
  ElUpload,
  ElRow,
  ElCol,
  ElTooltip,
];
const plugins = [ElLoading];

export function setupElement(app: App<Element>) {
  components.forEach((component) => {
    app.component(component.name, component);
  });

  plugins.forEach((plugin) => {
    app.use(plugin);
  });
}
