<template>
  <el-button type="primary" size="mini" @click="checkItem">查看</el-button>
  <el-dialog
  :before-close="handleClose"
  v-model="drawerVisible"
  width="80%"
  ref="addMoreDrawer"
  >
    <select-more-type @receiveSelectMoreType="receiveSelectMoreType"></select-more-type>
  <div class="more-drawer__content">
     <el-form :model="addFormItem" ref="form" label-width="80px" size="mini">
    <el-row :gutter="0">
      <el-col
        :span="item.span"
        v-for="(item, index) in addFormItem.data"
        :key="index"
      >
        <el-form-item :label="item.label" :prop="'data.' + index + '.element'">
          <!-- 增加字符输入 -->
          <template v-if="item.type === 'input'">
            <el-input v-model="item.element">
              <template #append>
                <el-button
                  icon="el-icon-delete"
                  @click="removeInputItem(index, dictIndex)" :style="removeBtn"></el-button> 
              </template>
            </el-input>
          </template>
          <!-- 列表输入 -->
          <template v-if="item.type === 'list'">
            <el-input
              v-model="item.element[listIndex]"
              v-for="(listItem, listIndex) in item.element"
              :key="listIndex"
            >
              <template #prepend>
                 <el-button icon="el-icon-plus" @click="addListItem(item.element)" :style="addBtn"></el-button>
              </template>
              <template #append>
                <el-button
                  icon="el-icon-delete"
                  @click="removeListItem(index, listIndex)" :style="removeBtn"></el-button> 
              </template>
            </el-input>
          </template>
          <!-- 字典输入 -->
          <template v-if="item.type === 'dict'" >
            <template
              v-for="(kv, kvIndex) in item.element['key']"
              :key="kvIndex"
            >
              <el-input
                v-model="item.element['value'][kvIndex]"
                placeholder=""
              >
              <template #prepend>
                <el-input v-model="item.element['key'][kvIndex]" class="add-form-dict-key-input"></el-input>
              </template>
              <template #append>
                <el-button icon="el-icon-plus" @click="addDictItem(item.element)" :style="addBtn"></el-button>
                <el-button icon="el-icon-delete" @click="removeDistItem(index, kvIndex)"></el-button>
              </template>
              </el-input>
            </template>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
    <div class="more-drawer__footer">
      <el-popconfirm
  confirmButtonText='确定'
  cancelButtonText='考虑一下!'
  icon="el-icon-info"
  iconColor="red"
  title="这将清空所有内容!!!"
  @confirm="clearDialog"
>
<template #reference>
  <el-button>清 空</el-button>
  </template>
</el-popconfirm>
      <el-button type="primary" @click="confirmDialog">确 定</el-button>
    </div>
  </div>
</el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import selectMoreType, { IselectMoreTypeForm, IMoreDict } from './child/selectMoreType.vue';

interface IIAddMoreItem {
  data: IselectMoreTypeForm[]
}

export default defineComponent({
  components: { selectMoreType },
  name: 'addMore',
  setup(props,{emit}) {
    let drawerVisible = ref(false)
    const form = ref()
    const addFormItem = <IIAddMoreItem>reactive({
      data: [],
    });
    const addBtn = {
      backgroundColor:'#0066CC'
    }
    const removeBtn = {
      backgroundColor:'#F5F5F5'
    }
    function receiveSelectMoreType(data:IselectMoreTypeForm) {
      addFormItem.data.push(data)
    }
    function removeInputItem(index: number) {
      addFormItem.data.splice(index, 1);
    }
    function addListItem(el:any) {
      el.push('')
    }
    function removeListItem(index: number, listIndex: number) {
      let el = addFormItem.data[index].element
      if (Array.isArray(el)) {
        el.splice(listIndex, 1)
        if (el.length === 0) {
          removeInputItem(index)
        }
      }
      // addFormItem.data[index].element.splice(listIndex, 1);
    }
    function addDictItem(el:any) {
      el.key.push('')
      el.value.push('')
    }
    function removeDistItem(index: number, keyIndex: number) {
      let el = addFormItem.data[index].element as IMoreDict
      el.key.splice(keyIndex, 1);
      el.value.splice(keyIndex, 1);
      if (el.key.length === 0) {
        removeInputItem(index)
      }
    }
    function handleClose(done) {
      done()
    }
    function clearDialog() {
      addFormItem.data = []
    }
    function confirmDialog() {
      
    }
    function checkItem() {
      drawerVisible.value = true
    }
    return {
      addFormItem,
      removeInputItem,
      removeListItem,
      removeDistItem,
      handleClose,
      drawerVisible,
      clearDialog,
      confirmDialog,
      checkItem,
      receiveSelectMoreType,
      form,
      addBtn,
      removeBtn,
      addDictItem,
      addListItem
    };
  },
});
</script>

<style scoped>
.add-form-dict {
  display: flex;
}
.add-form-dict-key-input{
  width:10em;
}
.more-drawer__footer{
  display: flex;
  justify-content:flex-end;
}
.more-drawer__footer button{
  margin: 0 10px;
}
</style>
