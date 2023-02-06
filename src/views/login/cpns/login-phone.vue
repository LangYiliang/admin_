<template>
  <div class="login-phone">
    <el-form label-width="80px" :model="phone" ref="fromRef">
      <el-form-item label="手机号" :rules="rules" prop="phone">
        <el-input v-model="phone.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code">
          <el-input v-model="phone.code"></el-input>
          <el-button class="btn" type="primary" @click="handleCodeClick"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { validate } from '@babel/types'
import { ElForm, ElMessage } from 'element-plus'
import { reactive, ref } from 'vue-demi'

const phone = reactive({
  phone: '',
  code: ''
})
const fromRef = ref<InstanceType<typeof ElForm>>()
const loginAction = () => {
  fromRef.value?.validate((valid) => {
    if (valid) {
      if (phone.code) {
        console.log('通过手机号验证码发送网络请求')
      } else {
        ElMessage({
          message: '请获取验证码',
          grouping: true,
          type: 'warning'
        })
      }
    }
  })
}
const arrCode = ['159357', '123852', '147951']
const handleCodeClick = () => {
  phone.code = arrCode[Math.floor(Math.random() * arrCode.length)]
}

const rules = [
  {
    required: true,
    message: '手机号必填~~',
    trigger: 'blur'
  },
  {
    pattern: /^[0-9]{11}$/,
    message: '长度为11为~~',
    trigger: 'blur'
  }
]

// eslint-disable-next-line no-undef
defineExpose({ loginAction })
</script>

<style scoped lang="less">
.code {
  display: flex;
  .btn {
    margin-left: 5px;
    width: 90px;
  }
}
</style>
