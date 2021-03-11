<template>
  <el-row>
    <el-col :span="18">
      <el-table
        :data="tableData"
        style="width: 100%"
        @cell-mouse-enter="handleMouseEnter"
        @cell-mouse-leave="handleMouseLeave"
        @row-click="handleRowClick"
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
        <!-- <el-table-column prop="tag" label="标签" width="50">
          <template #default="scope">
            <el-tag :type="scope.row.uplaodState" disable-transitions>{{
              scope.row.uplaodState === 'danger' ? 'failed' : 'success'
            }}</el-tag>
          </template>
        </el-table-column> -->
      </el-table>
    </el-col>
    <el-col :span="6">
      <!-- <el-image
        style="width: 300px; height: 300px"
        :src="imageUrl"
        :preview-src-list="srcList"
      >
      </el-image -->
      <img class="pr-img" :src="imageUrl" alt="" />
    </el-col>
  </el-row>
  <el-dialog v-model="display" width="80%">
    <manual-uplaod @receiveFileUrl="receiveFileUrl"></manual-uplaod>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onUnmounted } from 'vue';
import mySelect from './mySelect.vue';
import { IImageModel } from '@/views/upload/image';
import ManualUplaod from './manualUplaod.vue';
import { debounce, throttle } from 'lodash-es';

export default defineComponent({
  components: { mySelect, ManualUplaod },
  name: 'addImage',
  emits: ['receiveImageData'],
  setup(props, { emit }) {
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
    };

    const handleMouseLeave = (row) => {
      row.showEdit = false;
    };

    const handleRowClick = debounce((row) => {
      imageUrl.value = row.url;
    }, 500);
    function receiveFileUrl(params: any) {
      tableData.push(params);
    }
    function sendImageData() {
      emit('receiveImageData', tableData);
    }
    onUnmounted(() => {
      handleRowClick.cancel();
    });
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
      handleRowClick,
      sendImageData,
    };
  },
});
</script>

<style scoped>
.pr-img {
  border: 1px solid rgb(17, 151, 223);
  width: 300px;
  height: 300px;
  padding: 2px;
}
</style>
