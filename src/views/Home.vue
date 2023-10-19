<template>
  <main class="flex flex-col items-center justify-center sm:flex-row">
    <div class="text-center sliding-left relative">
      <img
        src="../assets/images/farmer-market.webp"
        alt="arrow right"
        class="w-auto max-w-sm"
      />
      <RouterLink to="/suppliers">
        <button
          class="mt-2 bg-yellow1 text-purple1 font-bold py-2 px-4 rounded-full button-transition"
        >
          Suppliers
        </button>
      </RouterLink>
    </div>
    <div class="text-center mt-4 md:flex-col sliding-right relative">
      <img
        src="../assets/images/farmer-market-2.png"
        alt="arrow right"
        class="w-auto max-w-sm"
      />
      <RouterLink to="/quotes">
        <button
          class="mt-2 bg-yellow1 text-purple1 font-bold py-2 px-4 rounded-full button-transition"
        >
          Quotes
        </button>
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

onMounted(() => {
  // After a second, remove the 'hidden' class to trigger the transitions
  setTimeout(() => {
    const elements = document.querySelectorAll(
      '.button-transition'
    ) as NodeListOf<HTMLElement>;
    elements.forEach(el => {
      el.style.opacity = '1';
    });
  }, 1000);
});
</script>

<style scoped>
.button-transition {
  opacity: 0;
  transition: opacity 0.5s;
}

@keyframes slide-in-left {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes button-slide-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Apply the sliding animations to images */
.sliding-left {
  animation: slide-in-left 1s ease-in-out forwards;
}

.sliding-right {
  animation: slide-in-right 1s ease-in-out forwards;
}

/* Apply the button visibility animations to the buttons */
.button-transition {
  animation: button-slide-in 0.5s ease-in-out forwards;
}
</style>
