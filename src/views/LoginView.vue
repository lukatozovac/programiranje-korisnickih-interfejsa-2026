<script lang="ts" setup>
import { ref } from 'vue';

const email = ref<String>('')
const password = ref<String>('')




</script>
<template>
    <p>Input: {{ email }} {{ password }}</p>
<form>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" v-model="email">
    <div id="emailHelp" class="form-text"></div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" v-model="password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</template>