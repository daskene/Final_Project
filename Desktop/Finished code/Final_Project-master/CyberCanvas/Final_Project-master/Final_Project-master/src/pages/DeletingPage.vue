<template>
    <div>
        <Header />
        <Deleting />
        <Footer />
    </div>
</template>

<script setup>
    import Header from '@/components/Header.vue';
    import Deleting from '@/components/Deleting.vue';
    import Footer from '@/components/MyFooter.vue';
</script>

<style scoped>
    .flex-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        max-width: 1200px; /* Example max-width */
        margin: 0 auto; /* Center the flex container */
    }
</style>
