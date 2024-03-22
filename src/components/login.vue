<template>
    <div>
        <Header />

        <form @submit.prevent="login">
            <div class="field is-grouped">
                <p class="control is-expanded">
                    <input v-model="loginEmail" class="input" type="email" placeholder="Enter email">
                    <input v-model="loginPassword" class="input" type="password" placeholder="Enter password">
                </p>
                <p class="control">
                    <button :disabled="!loginEmail || !loginPassword" class="button is-info">
                        Log in!
                    </button>
                </p>
            </div>
        </form>

        <MyFooter />
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Header from '@/components/Header.vue'; 
    import MyFooter from '@/components/MyFooter.vue';
    import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

    const auth = getAuth();

    const loginEmail = ref('');
    const loginPassword = ref('');

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    onAuthStateChanged(auth, (user) => {
        console.log('user status changed:', user);
    });
</script>

<style scoped>
    @import 'bulma/css/bulma.css';
</style>
