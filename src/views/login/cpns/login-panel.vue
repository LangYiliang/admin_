<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" :stretch="true" v-model="tabName">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Phone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="checke">
      <el-checkbox v-model="isChecked" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="btn" type="primary" @click="handleLoginClick"
      >点击登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { UserFilled, Phone } from '@element-plus/icons-vue'
import { ref } from 'vue-demi'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'

const tabName = ref('account')
const isChecked = ref(true)
// const accountRef = ref()
const accountRef = ref<InstanceType<typeof loginAccount>>()
const phoneRef = ref<InstanceType<typeof loginPhone>>()
const handleLoginClick = () => {
  if (tabName.value == 'account') {
    accountRef.value?.loginAction()
  } else {
    phoneRef.value?.loginAction()
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  .title {
    text-align: center;
  }
  .checke {
    display: flex;
    justify-content: space-between;
  }
  .btn {
    width: 325px;
  }
}
</style>
