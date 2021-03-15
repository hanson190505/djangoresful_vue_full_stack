<template>
  <div>
    <el-form
      :model="formData"
      label-width="100px"
      v-loading="loading"
      :rules="rules"
      size="mini"
    >
      <el-row :gutter="0">
        <el-col :span="8">
          <el-form-item label="产品类型">
            <el-input v-model="formData.category"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品编号" placeholder="自动生成">
            <el-input v-model="formData.number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="8" autocomplete="on">
          <el-form-item label="产品标题">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="产品描述">
            <el-input v-model="formData.desc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="4">
          <el-form-item label="新品">
            <my-select
              v-model="formData.is_new"
              @receiveSelected="receiveIsNewSelected"
              :options="'YNoptions'"
            ></my-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="热销">
            <my-select
              v-model="formData.is_hot"
              @receiveSelected="receiveIsHotSelected"
              :options="'YNoptions'"
            ></my-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="在产">
            <my-select
              v-model="formData.is_product"
              @receiveSelected="receiveIsProductSelected"
              :options="'YNoptions'"
            ></my-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="重量(g)">
            <el-input v-model="formData.weight"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="库存">
            <el-input v-model="formData.stock" placeholder="默认999"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="6">
          <el-form-item label="尺寸">
            <el-input v-model="formData.size"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供应商">
            <el-input v-model="formData.provider"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="品牌">
            <el-input v-model="formData.brand"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="材质">
            <multiple-select
              :optType="'materialOptions'"
              @receiveSelected="handelMaterialSeleted"
            ></multiple-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="颜色">
          <add-more
            @receiveColor="receiveColor"
            :owner="'color'"
            ref="addColorMore"
          ></add-more>
        </el-form-item>
      </el-row>
      <el-form-item label="定制log">
        <add-more
          @receiveLog="receiveLog"
          :owner="'log'"
          ref="addLogMore"
        ></add-more>
      </el-form-item>
      <el-form-item label="其他属性">
        <add-more
          @receiveMore="receiveMore"
          :owner="'more'"
          ref="addOtherMore"
        ></add-more>
      </el-form-item>
      <el-form-item label="图片">
        <add-image
          @receiveImageData="receiveImageData"
          ref="addImage"
        ></add-image>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" :loading="submitLoading">{{
          loading ? '提交中...' : '提交'
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
color json material select mutipl custom_log json

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { IProduct } from './models';
import { postProduct } from './product';
import { useMessage } from '@/hooks/web/useMessage';
import mySelect from '@/components/select/mySelect.vue';
import AddImage from '@/components/addImage.vue';
import { IImageModel } from '../upload/image';
import MultipleSelect from '@/components/select/multipleSelect.vue';
import AddMore from '@/components/addMore/addMore.vue';

export default defineComponent({
  components: { mySelect, AddImage, MultipleSelect, AddMore },
  name: 'addProduct',
  setup() {
    const { createSuccessMessage, createErrorMessage } = useMessage();
    const addColorMore = ref();
    const addLogMore = ref();
    const addOtherMore = ref();
    let loading = ref(false);
    let submitLoading = ref(false);
    const addImage = ref();
    const formData = <IProduct>reactive({
      image: {},
    });
    const rules = {
      name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
    };
    function receiveIsNewSelected(params: number) {
      formData.is_new = params;
    }
    function receiveIsHotSelected(params: number) {
      formData.is_hot = params;
    }
    function receiveIsProductSelected(params: number) {
      formData.is_product = params;
    }
    function receiveImageData(data: IImageModel) {
      formData.image = data;
    }
    function handelMaterialSeleted(params: string[]) {
      formData.material = params.toString();
    }
    function submit() {
      addColorMore.value.sendMoreData();
      addLogMore.value.sendMoreData();
      addOtherMore.value.sendMoreData();
      if (
        formData.color !== undefined &&
        formData.custom_log !== undefined &&
        formData.more !== undefined
      ) {
        // addImage.value.sendImageData();
        // // loading.value = true;
        // submitLoading.value = true;
        // postProduct(formData)
        //   .then((res) => {
        //     loading.value = false;
        //     submitLoading.value = false;
        //     createSuccessMessage('提交成功');
        //   })
        //   .catch((err) => {
        //     loading.value = false;
        //     submitLoading.value = true;
        //     createErrorMessage('提交失败');
        //   });
      }
    }
    function receiveColor(data) {
      formData.color = data;
    }
    function receiveLog(data) {
      formData.custom_log = data;
    }
    function receiveMore(data) {
      formData.more = data;
    }
    return {
      submit,
      formData,
      loading,
      receiveIsNewSelected,
      receiveIsHotSelected,
      receiveIsProductSelected,
      handelMaterialSeleted,
      rules,
      receiveImageData,
      addImage,
      submitLoading,
      receiveColor,
      receiveLog,
      receiveMore,
      addColorMore,
      addLogMore,
      addOtherMore,
    };
  },
});
</script>

<style scoped></style>
