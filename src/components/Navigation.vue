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

      <div class="items-center sm:flex hidden gap-2">
        <RouterLink to="/suppliers">
          <button class="p-2 rounded text-center text-blue1 text-lg font-bold">
            All Suppliers
          </button>
        </RouterLink>

        <RouterLink to="/quotes">
          <button class="p-2 rounded text-center text-blue1 text-lg font-bold">
            My Quotes
          </button>
        </RouterLink>
      </div>
      <button
        class="flex items-center z-50 gap-1 sm:gap-2 font-bold"
        @click="handleSignOut"
      >
        <p class="text-blue1 md:text-lg">Log out</p>
        <div class="w-4">
          <img :src="LogOut" alt="log out logo" class="text-yellow1" />
        </div>
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import LogOut from '../assets/images/log-out.svg';
import OpplyLogo from '../assets/images/opply-logo.webp';

const router = useRouter();

//removing the Token from the local storage in order to be automatically log out of the app
const handleSignOut = () => {
  sessionStorage.removeItem('authToken');
  router.push('/signin');
};
</script>

<style scoped></style>
