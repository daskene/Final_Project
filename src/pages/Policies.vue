<template>
    <div class="page-container">
        <Header />
        
        <div class="content">
        </div>
        <Policies />
        <MyFooter />
    </div>
</template>

<script>
    import MyFooter from '../components/MyFooter.vue';
    import Header from '../components/Header.vue';
    import Policies from '../components/Policies.vue';

    export default {
        components: {
            MyFooter,
            Header,
            Policies
        }
    };
</script>

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .content {
        flex: 1; /* This will make sure the content expands to fill the space between header and footer */
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }
   

        </style>
