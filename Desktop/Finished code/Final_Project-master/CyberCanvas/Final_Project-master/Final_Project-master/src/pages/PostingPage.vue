<template>
    <div class="page-container">
        <Header />
        <div class="content-container">
            <Posting />
        </div>
        <Footer />
    </div>
</template>



<script setup>
    import Header from '@/components/Header.vue';
    import Posting from '@/components/Posting.vue';
    import Footer from '@/components/MyFooter.vue';
</script>

<style scoped>
    .page-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh; /* Ensure it covers the full height of the viewport */
        width: 100%; /* Ensure it covers the full width of the viewport */
        margin: 0; /* Remove auto margin to allow full width */
    }

    .content-container {
        flex-grow: 1; /* Ensure content container takes the remaining space */
        background: linear-gradient(to bottom right, #000206, rgb(79, 87, 122)); /* Gradient background */
        color: #fff; /* White text for readability */
        padding-top: 20px; /* Add padding at the top of the content container */
        padding-bottom: 20px; /* Add padding at the bottom to separate from the footer */
    }

    /* Assuming Header and Footer have their own styling, they should be unaffected by these changes */
</style>
