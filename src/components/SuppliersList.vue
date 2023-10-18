<template>
  <div>
    <ul>
      <li v-for="supplier in suppliers" :key="supplier.id">
        <strong>Name:</strong> {{ supplier.name }} |
        <strong>Description:</strong> {{ supplier.description }}
      </li>
    </ul>
    <button @click="loadMoreSuppliers" v-if="hasMore">Load More</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
let authToken: string | null = null;
let nextPage = 1;
let hasMore = true;

// function to fetch the suppliers and fetch the suppliers of the next page if necessary
const loadMoreSuppliers = async () => {
  if (!authToken) return;

  try {
    const response = await fetchSuppliers(authToken, nextPage);
    if (response && response.results) {
      suppliers.value = suppliers.value.concat(response.results);
      nextPage++;
      hasMore = !!response.next;
    }
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
  }
};

onMounted(async () => {
  try {
    // Sign in to obtain the authentication token
    authToken = await getAuthToken('username', 'password');

    // Fetch suppliers using the obtained authentication token
    const response = await fetchSuppliers(authToken);
    if (response && response.results) {
      suppliers.value = response.results;
      nextPage++; // Start with the next page for pagination
      hasMore = !!response.next;
    }
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
  }
});
</script>
