<template>
  <header>
    <nav
      class="bg-purple1 fixed flex w-full items-center justify-between px-2 py-2 border-b-10"
    >
      <RouterLink to="/">
        <div class="w-24 md:w-32 lg:w-40">
          <img :src="OpplyLogo" alt="opply logo" />
        </div>
      </RouterLink>

      <!-- Conditionally show logout for mobile and desktop based on isLoggedIn -->
      <button
        v-if="isLoggedIn"
        class="flex items-center gap-1 sm:gap-2 font-bold sm:hidden"
        @click="handleSignOut"
      >
        <p class="text-grey4">Log out</p>
        <div class="w-4">
          <img :src="LogOut" alt="log out logo" />
        </div>
      </button>

      <div class="items-center sm:flex hidden gap-2" v-if="isLoggedIn">
        <RouterLink to="/suppliers">
          <button class="bg-blue5 p-2 rounded text-center text-white">
            All Suppliers
          </button>
        </RouterLink>

        <RouterLink to="/quotes">
          <button class="bg-blue5 p-2 rounded text-center text-white">
            My Quotes
          </button>
        </RouterLink>

        <button
          class="flex items-center gap-1 sm:gap-2 font-bold"
          @click="handleSignOut"
        >
          <p class="text-grey4">Log out</p>
          <div class="w-4">
            <img :src="LogOut" alt="log out logo" />
          </div>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import LogOut from '../assets/images/log-out.svg';
import OpplyLogo from '../assets/images/opply-logo.webp';

const router = useRouter();

// Reactive computed property for the authentication state
const isLoggedIn = computed(() => !!sessionStorage.getItem('authToken'));

const handleSignOut = () => {
  sessionStorage.removeItem('authToken');
  router.push('/signin');
};
</script>

<style scoped></style>
