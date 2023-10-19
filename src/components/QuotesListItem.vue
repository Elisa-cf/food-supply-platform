<template>
  <li
    class="bg-blue1 mt-2 px-2 py-4 rounded-md gap-2 sm:px-4 lg:flex lg:p-8 lg:gap-3"
  >
    <p class="justify-self-start">
      <strong>Amount:</strong> {{ quote.amount }}
    </p>
    <p class="justify-self-start">
      <strong>Created:</strong> {{ formatDate(quote.created) }}
    </p>
    <p class="justify-self-start"><strong>Title:</strong> {{ quote.title }}</p>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const { quote } = defineProps(['quote']);

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
</script>
