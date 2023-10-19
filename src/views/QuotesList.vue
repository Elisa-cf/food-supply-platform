<template>
  <div>
    <LoadingSpinner :isLoading="isLoading" />

    <div
      v-if="!isLoading"
      class="flex flex-col gap-3 w-11/12 mx-auto max-w-4xl justify-center my-3 text-purple1"
    >
      <ul
        class="grid grid-cols-1 gap-2 xs:grid-cols-2 xs:gap-2 xs:gap-x-4 lg:gap-x-8 items-center"
      >
        <QuotesListItem
          v-for="quote in quotes"
          :key="quote.id"
          :quote="quote"
        />
      </ul>
      <button @click="loadMoreQuotes" v-if="hasMore">Load More</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuthToken, fetchQuotes } from '../utils/api';

import LoadingSpinner from '../utils/LoadingSpinner.vue';
import QuotesListItem from '../components/QuotesListItem.vue';

interface Quote {
  id: string;
  amount: string;
  created: string;
  title: string;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Quote[];
}

const quotes = ref<Quote[]>([]);

const isLoading = ref<boolean>(true);
const hasMore = ref<boolean>(true);
let authToken: string | null = null;
let nextPage: number = 1;

const router = useRouter();

const loadMoreQuotes = async () => {
  if (!authToken) return;
  isLoading.value = true;
  try {
    const response: PaginatedResponse = await fetchQuotes(authToken, nextPage);
    if (response && response.results) {
      quotes.value = [...quotes.value, ...response.results];
      nextPage++;
      hasMore.value = !!response.next;
    }
    isLoading.value = false;
  } catch (error) {
    console.error('Failed to fetch quotes:', error);
    isLoading.value = false;
  }
};

onMounted(async () => {
  authToken = await getAuthToken('username', 'password');
  sessionStorage.setItem('authToken', authToken);
  await loadMoreQuotes();
});
</script>
