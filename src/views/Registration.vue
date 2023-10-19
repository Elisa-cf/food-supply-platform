<template>
  <div>
    <div
      class="bg-blue1 h-screen w-screen z-50 fixed flex justify-center items-center"
    >
      <section
        class="bg-purple2 flex flex-col justify-center items-center w-11/12 py-10 gap-4 rounded-md sm:w-[500px]"
      >
        <h1 class="font-bold text-xl text-white">Create an account</h1>

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

        <div
          class="bg-blue3 w-10/12 p-2 rounded text-center text-purple1 bg-blue1"
        >
          <button @click="handleRegistration">SUBMIT</button>
        </div>

        <p>
          <span class="text-white font-bold">Already have an account? </span>
          <RouterLink to="/signin" class="text-white font-bold"
            >Log in</RouterLink
          >
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerNewUser, getAuthToken } from '../utils/api';

const username = ref('');
const router = useRouter();
const password = ref('');

//calling the functions from api.ts to create the new username, password and token
const handleRegistration = async () => {
  try {
    await registerNewUser(username.value, password.value);
    const token = await getAuthToken(username.value, password.value);
    localStorage.setItem('jwtToken', token);

    router.push('/signin');
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
</script>

<style scoped></style>
