<template>
  <div>
    <el-form
      :model="data.product"
      ref="productData"
      label-width="80px"
      v-loading="loading"
    >
      <el-form-item label="产品名称">
        {{ JSON.stringify(data.product) }}
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, ref } from 'vue';
import { getProductById, getProductIDStorage } from './product';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'productDetail',
  setup() {
    const store = useStore();
    let loading = ref(false);
    const id = computed(() => store.state.product.productID);
    const data = reactive({
      product: {},
    });
    const getData = async () => {
      let _id = 0;
      if (id.value) {
        _id = id.value;
      } else {
        _id = getProductIDStorage();
      }
      loading.value = true;
      data.product = await getProductById(_id);
      loading.value = false;
    };
    onMounted(() => {
      getData();
    });
    return {
      data,
      loading,
    };
  },
});
</script>

<style scoped></style>
