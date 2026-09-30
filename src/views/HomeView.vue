<script setup lang="ts">
import { QuestionService } from '@/services/question.service';
import { ref } from 'vue';
  const questions = ref<any[]>()

  QuestionService.getAll()
  .then(rsp=>questions.value = rsp.data)

</script>

<template>
  <ul>
    <li>ID - Pitanje</li>
    <li v-for="q in questions" class="yellow">{{ q.questionId }} - {{ q.text }}</li>

  </ul>
  <pre>{{ questions }} </pre>
</template>

