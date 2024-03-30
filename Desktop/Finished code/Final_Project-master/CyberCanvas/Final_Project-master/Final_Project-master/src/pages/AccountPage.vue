<template>
    <div class="account-page">
        <Header />

        <div class="content">
            <div class="left-panel">
                <MyAccount />
                <DeleteAccount />
            </div>
            <div class="right-panel">
                <div class="user-likes-top">
                    <UserLikes />
                </div>
            </div>
        </div>

        <MyFooter />
    </div>
</template>

<script setup>
    import MyAccount from '../components/MyAccount.vue';
    import UserLikes from '../components/UserLikes.vue';
    import MyFooter from '../components/MyFooter.vue';
    import Header from '../components/Header.vue';
    import DeleteAccount from '../components/deleteAccount.vue';
</script>

<style scoped>
    .account-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: linear-gradient(to bottom, #000206, rgb(79, 87, 122)); /* Gradient from black to softer blue */
        min-height: 100vh;
        color: #fff; /* White text for better readability */
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        max-width: 1200px;
        margin: 20px;
    }

    .left-panel,
    .right-panel {
        width: 48%;
        background-color: transparent; /* Remove solid background to see the gradient */
        border-radius: 8px;
        padding: 20px;
        box-shadow: none; /* Remove box shadow to avoid box-like appearance */
        backdrop-filter: blur(5px); /* Optional: keep for a frosted effect or remove if clear background is desired */
    }

    .user-likes-top {
        margin-bottom: 20px;
    }

    @media screen and (max-width: 768px) {
        .content {
            flex-direction: column;
        }

        .left-panel,
        .right-panel {
            width: 100%;
            margin-bottom: 20px;
        }
    }
</style>
