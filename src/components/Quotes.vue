<template>
  <div>
    <h2>Quotes List</h2>

    <!-- Display when isLoading is true -->
    <div v-if="isLoading">Loading quotes...</div>

    <!-- Display the list of quotes when not loading and no error -->
    <div v-else-if="!isLoading">
      <ul>
        <li v-for="quote in quotes" :key="quote.id">
          <strong>Amount:</strong> {{ quote.amount }} |
          <strong>Created:</strong> {{ formatDate(quote.created) }}

          <strong>Title:</strong> {{ quote.title }}
        </li>
      </ul>
      <button @click="loadMoreQuotes" v-if="hasMore">Load More</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuthToken, fetchQuotes } from '../utils/api';

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

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

onMounted(async () => {
  authToken = await getAuthToken('username', 'password');
  sessionStorage.setItem('authToken', authToken);
  await loadMoreQuotes();
});
</script>

<style scoped></style>
