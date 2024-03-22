<template>
    <Header />
    <div class="page-background">
        <div class="login-box">
            <h2>{{ pageTitle }}</h2>
            <form @submit.prevent="handleSubmit">
                <div class="input-group">
                    <input type="email" placeholder="Email" v-model="user.email" required />
                </div>
                <div class="input-group">
                    <input type="password" placeholder="Password" v-model="user.password" required />
                </div>
                <button type="submit">{{ buttonLabel }}</button>
            </form>
        </div>
    </div>
    <MyFooter />
</template>

<script setup>
    import Header from '@/components/Header.vue'; 
    import MyFooter from '@/components/MyFooter.vue'; 
</script>

<script>
    export default {
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                },
                pageTitle: 'Sign In', // Change to 'Sign Up' for the signup page
                buttonLabel: 'Sign In' // Change to 'Sign Up' for the signup page
            };
        },
        methods: {
            handleSubmit() {
                console.log('Form Submitted', this.user);
            }
        }
    };
</script>

<style scoped>
    .page-background {
        background: linear-gradient(to bottom right, darkblue, lightblue);
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-box {
        background-color: #404040;
        padding: 20px;
        border-radius: 15px;
        width: 400px;
        height: 350px;
    }

        .login-box h2 {
            color: yellow;
            text-align: center;
            margin-bottom: 30px;
        }

    .input-group {
        margin-bottom: 30px;
    }

    input {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ddd;
    }

    button {
        width: 100%;
        margin-top: 30px;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: blue;
        color: white;
        cursor: pointer;
    }
</style>
