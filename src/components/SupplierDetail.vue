<template>
  <div>
    <h1>Supplier Detail</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Failed to load supplier details.</div>
    <div v-else>
      <strong>ID:</strong> {{ supplier?.id }}<br />
      <strong>Name:</strong> {{ supplier?.name }}<br />
      <strong>Description:</strong> {{ supplier?.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchSupplierDetail } from '../utils/api';

const authToken = sessionStorage.getItem('authToken'); // Retrieve the token from sessionStorage

if (!authToken) {
  console.error('No authToken found in sessionStorage.');
}

interface Supplier {
  id: string;
  name: string;
  description: string;
}
const supplier = ref<Supplier | null>(null);

const route = useRoute();
const supplierId = route.params.id as string;

const isLoading = ref(true);
const error = ref<boolean | null>(null);

onMounted(async () => {
  if (!authToken) return; // Early return if no authToken is found

  try {
    const response = await fetchSupplierDetail(authToken, supplierId);
    supplier.value = response;
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
    error.value = true;
    console.error('Error fetching supplier details:', err);
  }
});
</script>
