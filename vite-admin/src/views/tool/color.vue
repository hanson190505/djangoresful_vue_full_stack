<template>
  <el-button type="primary" @click="uploadColor">上传颜色</el-button>
  <color-select></color-select>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { colorValue } from '@/components/color';
import { defHttp } from '@/utils/http/axios';
import { EApiPath } from '@/api/api';
import colorSelect from './colorSelect.vue';

export default defineComponent({
  components: { colorSelect },
  name: 'color',
  setup() {
    let color = colorValue;
    let uploadColorData = reactive({});
    function transformColor(colors) {
      let _obj = {
        value: 'pantone_c',
        label: 'pantone_c',
        children: [
          {
            value: 'color0',
            label: 'color0',
            children: [],
          },
          {
            value: 'color1',
            label: 'color1',
            children: [],
          },
          {
            value: 'color2',
            label: 'color2',
            children: [],
          },
          {
            value: 'color3',
            label: 'color3',
            children: [],
          },
          {
            value: 'color4',
            label: 'color4',
            children: [],
          },
          {
            value: 'color5',
            label: 'color5',
            children: [],
          },
          {
            value: 'color6',
            label: 'color6',
            children: [],
          },
          {
            value: 'color7',
            label: 'color7',
            children: [],
          },
          {
            value: 'color8',
            label: 'color8',
            children: [],
          },
          {
            value: 'color9',
            label: 'color9',
            children: [],
          },
          {
            value: 'default',
            label: 'default',
            children: [],
          },
        ],
      };
      colors.forEach((el) => {
        if (el.value.startsWith('0')) {
          let tmp = {
            value: el.value,
            table: el.html_color,
          };
          _obj.children[0].children.push(tmp);
        }
        if (el.value.startsWith('1')) {
          let tmp = {
            value: el.value,
            table: el.html_color,
          };
          _obj.children[1].children.push(tmp);
        }
        if (el.value.startsWith('2')) {
          let tmp = {
            value: el.value,
            table: el.html_color,
          };
          _obj.children[2].children.push(tmp);
        }
        if (el.value.startsWith('3')) {
          let tmp = {
            value: el.value,
            table: el.html_color,
          };
          _obj.children[3].children.push(tmp);
        }
        if (el.value.startsWith('4')) {
          let tmp = {
            value: el.value,
            table: el.html_color,
          };
          _obj.children[4].children.push(tmp);
        }
        if (el.value.startsWith('5')) {
          let tmp = {
            value: el.value,
            table: el.html_color,
          };
          _obj.children[5].children.push(tmp);
        }
        if (el.value.startsWith('6')) {
          let tmp = {
            value: el.value,
            table: el.html_color,
          };
          _obj.children[6].children.push(tmp);
        }
        if (el.value.startsWith('7')) {
          let tmp = {
            value: el.value,
            table: el.html_color,
          };
          _obj.children[7].children.push(tmp);
        }
        if (el.value.startsWith('8')) {
          let tmp = {
            value: el.value,
            table: el.html_color,
          };
          _obj.children[8].children.push(tmp);
        }
        if (el.value.startsWith('9')) {
          let tmp = {
            value: el.value,
            table: el.html_color,
          };
          _obj.children[9].children.push(tmp);
        }
        console.log(_obj);
        let tmp = {
          value: el.value,
          table: el.html_color,
        };
        _obj.children[10].children.push(tmp);
      });

      return _obj;
    }
    function uploadColor() {
      uploadColorData = transformColor(colorValue);
      console.log(uploadColorData);
      defHttp.post({
        url: EApiPath.TOOLS,
        data: {
          more: uploadColorData,
          tool: 'color',
        },
      });
    }
    return {
      color,
      uploadColor,
      uploadColorData,
    };
  },
});
</script>

<style scoped></style>
