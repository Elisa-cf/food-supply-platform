<template>
  <div class="flex justify-center py-20">
    <LoadingSpinner :isLoading="isLoading" />

    <div
      v-if="!isLoading"
      class="flex flex-col gap-3 w-11/12 mx-auto max-w-4xl justify-center text-purple2"
    >
      <ul
        class="grid grid-cols-1 gap-2 xs:grid-cols-2 xs:gap-2 xs:gap-x-4 lg:gap-x-8 items-center"
      >
        <SuppliersListItem
          v-for="supplier in suppliers"
          :key="supplier.id"
          :supplier="supplier"
          :viewSupplierDetail="viewSupplierDetail"
        />
      </ul>
      <button @click="loadMoreSuppliers" v-if="hasMore">Load More</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuthToken, fetchSuppliers } from '../utils/api';
import SuppliersListItem from '../components/SuppliersListItem.vue';
import LoadingSpinner from '../utils/LoadingSpinner.vue';

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
