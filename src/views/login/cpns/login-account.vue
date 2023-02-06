<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElForm } from 'element-plus'
import { reactive, ref } from 'vue-demi'
const account = reactive({
  name: '',
  password: ''
})

const formRef = ref<InstanceType<typeof ElForm>>()
// 父组件点击登录实际执行函数
const loginAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('通过账号密码发送网络请求')
    }
  })
}
const rules = {
  name: [
    {
      required: true,
      message: '这是必填项哟~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '填写长度为5~10为哟~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必填的',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,12}$/,
      message: '长度为6~12位~',
      trigger: 'blur'
    }
  ]
}
// eslint-disable-next-line no-undef
defineExpose({ loginAction })
</script>

<style scoped lang="less"></style>
