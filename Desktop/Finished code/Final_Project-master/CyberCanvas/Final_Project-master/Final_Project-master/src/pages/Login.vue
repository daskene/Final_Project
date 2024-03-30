<script setup>
import login from '@/components/login.vue';
import Header from '../components/Header.vue'
</script>
<template>
  <Header/>
   <div class="page-background">
     <login/>

  </div>  
</template>

<style scoped>
  

    .page-background {
        background: linear-gradient(to bottom right, #000206, rgb(79, 87, 122));
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
