<template>
  <button @click="logout" class="button is-danger">Logout</button>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

const logout = () => {
  signOut(auth)
      .then(() => {
        console.log('User logged out');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
};
</script>

<style scoped>
/* Your component styles here */
</style>
