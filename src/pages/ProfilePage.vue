<template>
    <div class="profile-page">
        <Header />
        <Profile />
        <Footer />
    </div>
</template>


<script setup>
    import Header from '@/components/Header.vue';
    import Profile from '@/components/Profile.vue';
    import Footer from '@/components/MyFooter.vue';
</script>


<style scoped>
    .profile-page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100vw; /* Use the full viewport width */
    }
    Header, Deleting {
        flex: 1; /* Makes the content expand to fill available space */
    }
</style>

