<template>
  <div>
    <h2 class="text-red3">I'm the registration</h2>
    <div class="bg-grey2 h-screen w-screen flex justify-center items-center">
      <section
        class="bg-white flex flex-col justify-center items-center w-11/12 py-10 gap-4 rounded-md sm:w-[500px]"
      >
        <h1 class="font-bold text-xl text-grey3">Create an account</h1>

        <input
          class="bg-grey1 w-10/12 p-2 rounded-md focus:outline-none focus:ring-grey3 focus:ring-2 caret-grey3"
          type="text"
          placeholder="Email"
          v-model="email"
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
        <div class="bg-blue3 w-10/12 p-2 rounded text-center text-white">
          <button @click="register">SUBMIT</button>
        </div>

        <p>
          <span class="text-grey3 font-bold">Already have an account? </span>
          <RouterLink to="/signin" class="text-blue3 font-bold"
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

const email = ref('');
const password = ref('');
const errMsg = ref();
const router = useRouter();

const register = () => {};
</script>

<style scoped></style>
