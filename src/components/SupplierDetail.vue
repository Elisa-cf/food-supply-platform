<template>
  <div>
    <h1>Supplier Detail</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="errMsg">{{ errMsg }}</div>
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

const authToken: string | null = sessionStorage.getItem('authToken');
if (!authToken) {
  console.error('No authentication token found in sessionStorage.');
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
const errMsg = ref<string | null>(null);

onMounted(async () => {
  if (!authToken) return;

  try {
    const response = await fetchSupplierDetail(authToken, supplierId);
    supplier.value = response;
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
    errMsg.value = 'Error fetching supplier details';
    console.error('Error fetching supplier details:', err);
  }
});
</script>
