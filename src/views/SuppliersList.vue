<template>
  <div>
    <h2>Suppliers List</h2>

    <!-- Display when isLoading is true -->
    <div v-if="isLoading">Loading suppliers...</div>

    <!-- Display the list of suppliers when not loading and no error -->
    <div v-else-if="!isLoading">
      <ul>
        <li v-for="supplier in suppliers" :key="supplier.id">
          <strong>Name:</strong> {{ supplier.name }} |
          <strong>Description:</strong> {{ supplier.description }}
          <button @click="() => viewSupplierDetail(supplier.id)">
            View Details
          </button>
        </li>
      </ul>
      <button @click="loadMoreSuppliers" v-if="hasMore">Load More</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuthToken, fetchSuppliers } from '../utils/api';

interface Supplier {
  id: string;
  name: string;
  description: string;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Supplier[];
}

const suppliers = ref<Supplier[]>([]);

const isLoading = ref<boolean>(true);
const hasMore = ref<boolean>(true);
let authToken: string | null = null;
let nextPage: number = 1;

const router = useRouter();

const loadMoreSuppliers = async () => {
  if (!authToken) return;
  isLoading.value = true;
  try {
    const response: PaginatedResponse = await fetchSuppliers(
      authToken,
      nextPage
    );
    if (response && response.results) {
      suppliers.value = [...suppliers.value, ...response.results];
      nextPage++;
      hasMore.value = !!response.next;
    }
    isLoading.value = false;
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
    isLoading.value = false;
  }
};

const viewSupplierDetail = (id: string) => {
  router.push(`/supplier/${id}`);
};

onMounted(async () => {
  authToken = await getAuthToken('username', 'password');
  sessionStorage.setItem('authToken', authToken);
  await loadMoreSuppliers();
});
</script>

<style scoped></style>
