<template>
  <div>
    <el-table
      :data="products.data.results"
      style="width: 100%"
      v-loading="loading"
      size="mini"
    >
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
    <el-pagination
      @current-change="handleCurrentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="20"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive, ref, unref } from 'vue';
import { getProductsAPI, setProductIDStorage } from './product';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { EProductDispatch } from '@/store/modules/product';

export default defineComponent({
  name: 'productTable',
  setup() {
    const router = useRouter();
    const store = useStore();
    let loading = ref(false);
    let products = reactive({
      data: [],
    });
    let total = ref(0);
    const route = reactive({
      data: {
        meta: {
          title: '',
          ignoreAuth: false,
          parent: 'product',
          transitionName: 'productDetail',
          id: 0,
        },
        name: '',
        path: '',
        isActive: true,
      },
    });
    const addTab = inject('addTab');
    const checkProduct = (row) => {
      let id = row.row.id;
      route.data.meta = {
        title: row.row.number,
        ignoreAuth: false,
        parent: 'product',
        transitionName: 'productDetail',
        id: id,
      };
      route.data.name = row.row.number;
      route.data.path = '/product' + '/' + id;
      route.data.isActive = true;
      addTab(route.data);
      store.dispatch(EProductDispatch.SET_PRODUCT_ID, id);
      setProductIDStorage(id);
      store.dispatch('product/setProductID', id);
    };
    const handleCurrentChange = (val: number) => {
      getPage(val);
    };
    const prevClick = (val: number) => {
      getPage(unref(val));
    };
    const nextClick = (val: number) => {
      getPage(val);
    };
    const getPage = async (page: number) => {
      loading.value = true;
      const data = await getProductsAPI(page);
      loading.value = false;
      products.data = data;
      total.value = data.count;
    };
    onMounted(() => {
      getPage(1);
    });
    return {
      products,
      loading,
      checkProduct,
      handleCurrentChange,
      prevClick,
      nextClick,
      total,
      addTab,
    };
  },
});
</script>

<style scoped></style>
