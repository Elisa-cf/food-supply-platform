<template>
  <div
    class="bg-purple2 z-50 fixed h-screen w-screen flex flex-col justify-center items-center"
  >
    <section
      class="bg-blue1 flex flex-col justify-center items-center w-11/12 py-10 gap-4 rounded-md sm:w-[500px]"
    >
      <h1 class="font-bold text-xl text-white">Log in to Opply</h1>
      <input
        class="bg-grey1 w-10/12 p-2 rounded-md focus:outline-none focus:ring-grey3 focus:ring-2 caret-grey3"
        type="text"
        placeholder="Username"
        v-model="username"
      />
      <input
        class="bg-grey1 w-10/12 p-2 rounded-md focus:outline-none focus:ring-grey3 focus:ring-2 caret-grey3"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <p
        class="bg-red1 border border-red4 text-red3 w-10/12 p-1.5"
        v-if="errMsg"
      >
        {{ errMsg }}
      </p>
      <div class="bg-purple1 text-blue1 w-10/12 p-2 rounded text-center">
        <button @click="logIn">LOGIN</button>
      </div>

      <p>
        <span class="text-white font-bold">No account? </span>
        <RouterLink to="/register" class="text-white font-bold"
          >Sign up</RouterLink
        >
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInUser } from '../utils/api';

const username = ref('');
const errMsg = ref();
const router = useRouter();
const password = ref('');
let isUserLogged = false;

const logIn = async () => {
  if (isUserLogged) return; // If login attempt already made, don't proceed

  try {
    //calling the function from api.ts to sign in whith username and password
    const token = await signInUser(username.value, password.value);
    // Store the token in sessionStorage
    sessionStorage.setItem('authToken', token);

    isUserLogged = true;
    router.push('/');
  } catch (error) {
    console.error('Sign-in failed:', error);
  }
};
</script>

<style scoped></style>
