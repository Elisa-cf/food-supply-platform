<template>
  <div>
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

    <!-- Display the list of suppliers when not loading and no error -->
    <div
      v-else-if="!isLoading"
      class="flex flex-col gap-3 w-11/12 mx-auto max-w-4xl justify-center my-3 text-purple2"
    >
      <ul
        class="grid grid-cols-1 gap-2 xs:grid-cols-2 xs:gap-2 xs:gap-x-4 lg:gap-x-8 items-center"
      >
        <li
          v-for="supplier in suppliers"
          :key="supplier.id"
          class="bg-blue1 mt-2 px-2 py-4 rounded-md gap-2 sm:px-4 lg:flex lg:p-8 lg:gap-3"
        >
          <p class="justify-self-start">
            <strong>Name:</strong> {{ supplier.name }}
          </p>
          <p class="justify-self-start">
            <strong>Description:</strong> {{ supplier.description }}
          </p>
          <button
            @click="() => viewSupplierDetail(supplier.id)"
            class="mt-2 bg-yellow1 text-purple1 font-bold py-1 px-4 rounded-full text-sm lg:flex-end lg:px-5 lg:py-3"
          >
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
