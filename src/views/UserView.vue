<script lang="ts" setup>
import { UserService } from '@/services/user.service';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const router = useRoute()
const route = useRoute()

</script>
<template>
    <pre>{{ UserService.getActiveUser() }}</pre>
</template>