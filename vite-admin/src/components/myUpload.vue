<template>
  <div>
    <ul class="wraper">
      <li class="wraper-list">
        <img
          src="http://image.nbd.com.cn/uploads/articles/images/673466/500352700_banner.jpg"
          alt=""
          class="wraper-img"
          @click="handleUpload"
        />
        <span class="wraper-add">+</span>
      </li>
      <li class="wraper-list">
        <img
          src=""
          alt=""
          class="wraper-img"
          width="100px"
          @click="handleUpload"
        />
        <span class="wraper-add" v-show="addIconShow">+</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'myUpload',
  setup() {
    const addIconShow = ref(false);
    function handleUpload(params: any) {
      console.log(params);
      console.log('图片上传');
    }
    return {
      handleUpload,
      addIconShow,
    };
  },
});
</script>

<style scoped>
ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  position: relative;
  padding: 5px;
}
:hover {
  box-shadow: 0 0 2px 1px rgba (0, 140, 186, 0.5);
}
.wraper-img {
  background-color: #fffff0;
  width: 10em;
  height: 10em;
  border: 2px dashed rgb(232, 225, 225);
  padding: 5px;
}
:hover {
  border-color: rgb(5, 12, 206);
  cursor: pointer;
}
.wraper-add {
  display: block;
  position: absolute;
  top: 4.8em;
  right: 4.8em;
}
</style>
