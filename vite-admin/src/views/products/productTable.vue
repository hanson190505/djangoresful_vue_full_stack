<template>
  <div>
    <el-table :data="products.data" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="name"> </el-table-column>
      <el-table-column prop="number" label="number"> </el-table-column>
      <el-table-column prop="category" label="category_id"> </el-table-column>
      <el-table-column prop="create_at" label="create_time"> </el-table-column>
      <el-table-column prop="update_at" label="update_time"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button @click="checkProduct(scope)" type="text" size="small">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { getProductsAPI } from '@/api/products';

export default defineComponent({
  name: 'productTable',
  setup() {
    let loading = ref(false);
    let products = reactive({
      data: [],
    });
    const checkProduct = (row) => {
      console.log(row);
    };
    onMounted(async () => {
      loading.value = true;
      const data = await getProductsAPI();
      loading.value = false;
      products.data = data;
    });
    return {
      products,
      loading,
      checkProduct,
    };
  },
});
</script>

<style scoped></style>
