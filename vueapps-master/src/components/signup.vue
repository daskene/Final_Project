<template>
  <form @submit.prevent="signup">
    <div class="field is-grouped">
      <p class="control is-expanded">
        <input v-model ='email'class="input" type="email" placeholder="Enter email">
        <input v-model ='password'class="input" type="password" placeholder="Enter password">
      </p>
      <p class="control">
        <button :disabled="!email && password" class="button is-info">
          Sign Up!
        </button>
      </p>
    </div></form>


</template>


<script setup>
import {ref, onMounted} from 'vue';

import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, where, orderBy
  ,serverTimestamp, getDoc, updateDoc} from "firebase/firestore"

import{getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword
  ,onAuthStateChanged} from "firebase/auth"

import{db} from '@/firebase'

const auth = getAuth()


//signing users up
const email = ref('')
const password = ref('')
const signup = () =>{
    createUserWithEmailAndPassword(auth,email.value,password.value)

}

onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)
})


</script>


<style scoped>
@import 'bulma/css/bulma.css';
</style>