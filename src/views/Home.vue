<template>
  <main
    class="overflow-hidden h-screen flex flex-col gap-3 items-center justify-center sm:flex-row"
  >
    <div class="text-center sliding-left relative">
      <img
        src="../assets/images/farmer-market.png"
        alt="happy seller guy"
        class="max-h-[35vh] w-auto md:max-h-[50vh]"
      />
      <RouterLink to="/suppliers">
        <button
          class="mt-2 bg-yellow1 text-purple1 font-bold py-2 px-4 rounded-full button-transition md:py-3 md:px-10 md:text-xl"
        >
          Suppliers
        </button>
      </RouterLink>
    </div>
    <div class="text-center md:flex-col sliding-right relative">
      <img
        src="../assets/images/farmer-market-2.png"
        alt="happy seller girl"
        class="w-auto max-h-[35vh] md:max-h-[50vh]"
      />
      <RouterLink to="/quotes">
        <button
          class="mt-2 bg-yellow1 text-purple1 font-bold py-2 px-4 rounded-full button-transition md:py-3 md:px-10 md:text-xl"
        >
          Quotes
        </button>
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// After a second, remove the 'hidden' class to trigger the transitions
onMounted(() => {
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
    transform: translateX(
      -100%
    ); /*At the beginning (0% of the animation), the element is positioned far to the left, translated by -100% of its own width.  This means it's entirely outside the viewport on the left side.*/
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
    transform: translateX(
      0
    ); /*At the end (100% of the animation), the element is fully visible, positioned with no horizontal translation (translateX(0)). It's fully inside the viewport.*/
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
  animation: slide-in-left 1s ease-in-out forwards; /*it will slide in from the left side with a 1-second animation, starting slowly, accelerating, and stopping in its final position while remaining fully visible.*/
}

.sliding-right {
  animation: slide-in-right 1s ease-in-out forwards;
}

/* Apply the button visibility animations to the buttons */
.button-transition {
  animation: button-slide-in 0.5s ease-in-out forwards;
}
</style>
