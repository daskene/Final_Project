<template>
    <div>
        <Header />

        <form @submit.prevent="signup">
            <div class="field is-grouped">
                <p class="control is-expanded">
                    <input v-model="email" class="input" type="email" placeholder="Enter email">
                    <input v-model="password" class="input" type="password" placeholder="Enter password">
                </p>
                <p class="control">
                    <button :disabled="!email || !password" class="button is-info">
                        Sign Up!
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
    import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

    const auth = getAuth();
    const email = ref('');
    const password = ref('');

    const signup = () => {
        createUserWithEmailAndPassword(auth, email.value, password.value);
    };

    onAuthStateChanged(auth, (user) => {
        console.log('user status changed:', user);
    });
</script>

<style scoped>
    @import 'bulma/css/bulma.css';
</style>
