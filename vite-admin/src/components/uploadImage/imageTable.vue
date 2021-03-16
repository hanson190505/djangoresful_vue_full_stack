<template>
  <el-row>
    <el-col :span="18">
      <el-table
        :data="tableData"
        style="width: 100%"
        @cell-mouse-enter="handleMouseEnter"
        @cell-mouse-leave="handleMouseLeave"
      >
        <el-table-column width="50">
          <template #header>
            <el-button @click="addNewRow" type="text" size="small">
              新增
            </el-button>
          </template>
          <template #default="scope">
            <el-button
              @click="deleteRow(scope, tableData)"
              type="text"
              size="small"
              v-show="scope.row.showEdit"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="owner" label="Owner" width="120">
          <template #default="scope">
            <my-select
              v-model="scope.row.owner"
              @receiveSelected="receiveOwnerSelected"
              :options="'imageOwnerOptions'"
            ></my-select>
          </template>
        </el-table-column>
        <el-table-column prop="site" label="site" width="120">
          <el-input v-model="table.data.site" clearable></el-input>
        </el-table-column>
        <el-table-column prop="alt" label="Alt">
          <template #default="scope">
            <el-input
              v-model="scope.row.alt"
              placeholder="alt"
              clearable
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="URL"></el-table-column>
      </el-table>
    </el-col>
    <el-col :span="6">
      <img class="pr-img" :src="imageUrl" alt="" />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onUnmounted } from 'vue';
import mySelect from '@/components/select/mySelect.vue';
import { IImageModel } from '@/views/upload/image';
import { zipObject } from 'lodash-es';

export default defineComponent({
  components: { mySelect },
  name: 'imageTable',
  setup() {
    const tableData = <IImageModel[]>reactive([]);
    const imageUrl = ref('');
    const srcList = reactive(['']);
    const addNewRowShow = ref(false);
    const display = ref(false);
    function addNewRow(scope: any, data: IImageModel[]) {
      display.value = true;
    }
    function deleteRow(scope: any, data: IImageModel[]) {
      data.splice(scope.$index, 1);
    }
    function receiveOwnerSelected(params: string) {
      // console.log(params);
    }
    const handleMouseEnter = (row) => {
      row.showEdit = true;
      imageUrl.value = row.tempUrl;
    };

    const handleMouseLeave = (row) => {
      row.showEdit = false;
    };

    function receiveFileUrl(params: any) {
      tableData.push(params);
    }
    function sendImageData() {
      let keys = <string[]>[];
      tableData.forEach((el) => {
        keys.push(el.owner);
      });
      let data = zipObject(keys, tableData);
      emit('receiveImageData', data);
    }

    return {
      tableData,
      imageUrl,
      srcList,
      receiveOwnerSelected,
      addNewRow,
      handleMouseEnter,
      addNewRowShow,
      handleMouseLeave,
      deleteRow,
      display,
      receiveFileUrl,
      sendImageData,
    };
  },
});
</script>

<style scoped></style>
