<template>
  <div class="flex justify-center items-center h-screen">
    <!-- Display when isLoading is true -->
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
    <div v-else>
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
        v-else
        src="../assets/images/default.jpg"
        alt="Default"
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
import { ref, onMounted, computed } from 'vue';
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
