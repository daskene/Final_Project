<template>
    <div class="page-container">
        <Header />

        <div class="content">
            <Policies />
        </div>
      
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
        min-height: 100vh; /* Use min-height to cover at least the full viewport height */
        background: linear-gradient(to bottom right, #000206, rgb(79, 87, 122)); /* Gradient background */
    }

    .content {
        flex: 1; /* This will make sure the content expands to fill the space between header and footer */
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    /* Ensure Policies and MyFooter components don't have a solid background that overrides the gradient */
    policies,
    my-footer {
        background: transparent;
    }
</style>
