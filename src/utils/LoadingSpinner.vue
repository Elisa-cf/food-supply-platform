<template>
  <div v-if="isLoading" class="flex justify-center mt-10">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const { isLoading } = defineProps(['isLoading']);
</script>
