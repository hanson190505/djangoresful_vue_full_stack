<template>
  <el-button type="primary" size="mini" @click="addItem">新增</el-button>
  <el-dialog title="新增其他属性" v-model="selectMoreTypeFormVisible" append-to-body>
  <el-form :model="selectMoreTypeForm" ref="selectMoreTypeFormRef" label-width="100px" :rules="rules">
    <el-form-item label="属性名称" prop="label">
      <el-input v-model="selectMoreTypeForm.label" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="内容格式" prop="type">
      <el-select v-model="selectMoreTypeForm.type" placeholder="内容格式" clearable>
        <el-option label="字符" value="input"></el-option>
        <el-option label="列表" value="list"></el-option>
        <el-option label="字典" value="dict"></el-option>
      </el-select>
    </el-form-item>
    <ul class="form-type">
      <h3>内容格式说明:</h3>
      <li>字符:输入的内容为单独的一串文字或者数字</li>
      <li>列表:输入的内容为多列表格形式,但都属于同一属性</li>
      <li>字典:输入的内容为多属性,不同内容</li>
    </ul>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="cancelSelectMoreType">重 置</el-button>
      <el-button type="primary" @click="addSelectMoreType">确 定</el-button>
    </span>
  </template>
</el-dialog>
</template>

<script lang="ts">
import { defineComponent,ref,reactive } from 'vue'
import {cloneDeep}  from 'lodash-es';

interface IMoreDict {
  key:[string]
  value:[string]
}
export interface IselectMoreTypeForm {
  label: string
  element: string | [string|number] |  number | IMoreDict
  span:number
  type: string
}

export default defineComponent({
  name:'selectMoreType',
  props:{
    selectMoreTypeFormVisible:{
      type:Boolean,
      default:false
    }
  },
  emits:['receiveSelectMoreType'],
  setup (props,{emit}) {
    const selectMoreTypeFormVisible = ref(false)
    let selectMoreTypeForm = <IselectMoreTypeForm>reactive({
      span:8,
    })
    let selectMoreTypeFormRef = ref()
    const rules = {
       label: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
          ],
        type:[
          { required: true, message: '请选择内容格式', trigger: 'change' },
        ]
    }
    function cancelSelectMoreType(form:IselectMoreTypeForm) {
      selectMoreTypeFormRef.value.resetFields()
    }
    function addSelectMoreType() {
      selectMoreTypeFormRef.value.validate(valid=>{
        if (valid) {
          switch (selectMoreTypeForm.type) {
            case 'dict':
              selectMoreTypeForm.element = {
              key:[''],
              value:['']
            }
              break;
            case 'list':
              selectMoreTypeForm.element = ['']
              break
            case 'input':
              selectMoreTypeForm.element = ''
              break
            default:
              break;
          }
          let _data = cloneDeep(selectMoreTypeForm)
          emit('receiveSelectMoreType', _data)
          selectMoreTypeFormVisible.value = false
        }else{
          return false
        }
      })
    }
    function addItem() {
      selectMoreTypeFormVisible.value = true
    }
    return {
      selectMoreTypeFormVisible,
      selectMoreTypeForm,
      cancelSelectMoreType,
      addSelectMoreType,
      selectMoreTypeFormRef,
      addItem,
      rules
    }
  }
})
</script>

<style scoped>

</style>