<template>
    <div class="page-container">
        <Header />

        <div class="content">
            <!-- Content goes here -->
        </div>
        <Contact />
        <MyFooter />
    </div>
</template>

<script>
    import MyFooter from '../components/MyFooter.vue';
    import Header from '../components/Header.vue';
    import Contact from '../components/Contact.vue';

    export default {
        components: {
            MyFooter,
            Header,
            Contact
        }
    };
</script>

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background: linear-gradient(to bottom right, #000206, rgb(79, 87, 122)); /* Gradient applied to the entire container */
    }

    .content {
        flex: 1; /* This will make sure the content expands to fill the space between header and footer */
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }
</style>
