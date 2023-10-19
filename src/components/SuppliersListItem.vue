<template>
  <li
    class="bg-blue1 mt-2 px-2 py-4 rounded-md gap-2 sm:px-4 lg:flex lg:p-8 lg:gap-3"
  >
    <p class="justify-self-start"><strong>Name:</strong> {{ supplier.name }}</p>
    <p class="justify-self-start">
      <strong>Description:</strong> {{ supplier.description }}
    </p>
    <button
      @click="viewSupplierDetail(supplier.id)"
      class="mt-2 bg-yellow1 text-purple1 font-bold py-1 px-4 rounded-full text-sm lg:flex-end lg:px-5 lg:py-3"
    >
      View Details
    </button>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Extract 'supplier' and 'viewSupplierDetail' props from the parent component using defineProps
const { supplier, viewSupplierDetail } = defineProps([
  'supplier',
  'viewSupplierDetail',
]);
</script>
