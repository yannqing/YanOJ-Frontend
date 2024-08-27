<script setup lang="ts">
import { reactive } from 'vue'
import { useLoginUserStore } from '@/stores/user'
import type { UserLoginRequest } from '@/generated'

const form: UserLoginRequest = reactive({
  userAccount: '',
  userPassword: ''
})
const rules = {
  userAccount: [
    {
      required: true,
      message: 'name is required'
    }
  ],
  userPassword: [
    {
      required: true,
      message: 'password is required'
    }
  ]
}

const user = useLoginUserStore()

function doLogin() {
  console.log('form', form)
  user.login(form)
}
</script>

<template>
  <a-form :model="form" :rules="rules" style="margin-top: 20px; max-width: 500px">
    <a-form-item field="userAccount" label="账户" feedback>
      <a-input v-model="form.userAccount" placeholder="please enter your username..." />
    </a-form-item>
    <a-form-item field="userPassword" label="密码" feedback>
      <a-input-password v-model="form.userPassword" placeholder="please enter your password..." />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button html-type="submit" type="primary" @click="doLogin">登录</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<style scoped></style>
