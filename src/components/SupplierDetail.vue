<template>
  <div class="flex justify-center items-center h-screen">
    <!-- Display when isLoading is true -->
    <LoadingSpinner :isLoading="isLoading" />
    <div v-if="!isLoading">
      <img
        v-if="supplier?.name.includes('Potatoes')"
        src="../assets/images/patata.jpg"
        alt="Potatoes"
        class="w-auto max-w-sm"
      />
      <img
        v-else-if="supplier?.name.includes('Chocolate')"
        src="../assets/images/chocolate.jpg"
        alt="Chocolate"
        class="w-auto max-w-sm"
      />
      <img
        v-else-if="supplier?.name.includes('Pineapples')"
        src="../assets/images/piña.jpg"
        alt="Pineapples"
        class="w-auto max-w-sm"
      />
      <img
        v-else-if="supplier?.name.includes('Oranges')"
        src="../assets/images/naranja.jpg"
        alt="Oranges"
        class="w-auto max-w-sm"
      />
      <img
        v-else-if="supplier?.name.includes('Apples')"
        src="../assets/images/manzana.webp"
        alt="Apples"
        class="w-auto max-w-sm"
      />
      <img
        v-else
        src="../assets/images/monkey.jpg"
        alt="happy monkey"
        class="w-auto max-w-sm"
      />
      <div>
        <div class="bg-yellow1 text-purple2 m-4 p-2 rounded-xl">
          <p><strong>Name:</strong> {{ supplier?.name }}<br /></p>
          <p><strong>Description:</strong> {{ supplier?.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchSupplierDetail } from '../utils/api';
import LoadingSpinner from '../utils/LoadingSpinner.vue';

// Check if an authentication token exists in session storage
const authToken: string | null = sessionStorage.getItem('authToken');
if (!authToken) {
  console.error('No authentication token found in sessionStorage.');
}

interface Supplier {
  id: string;
  name: string;
  description: string;
}

const supplier = ref<Supplier | null>(null); // supplier is a reactive reference that can hold an object of type Supplier or a null value.
const route = useRoute();
const supplierId = route.params.id as string;
const isLoading = ref(true);
const errMsg = ref<string | null>(null);

// Use the onMounted hook to initiate data retrieval when the component is mounted
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
