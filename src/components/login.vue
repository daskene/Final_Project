<template>

  <form @submit.prevent="login">
    <div class="field is-grouped">
      <p class="control is-expanded">
        <input v-model ='loginEmail'class="input" type="email" placeholder="Enter email">
        <input v-model ='loginPassword'class="input" type="password" placeholder="Enter password">
      </p>
      <p class="control">
        <button :disabled="!loginEmail && loginPassword" class="button is-info">
          Log in!
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


const colRef = collection(db, 'art')
const auth = getAuth()
//queries


const loginEmail = ref('')
const loginPassword = ref('')
const login = () => {
  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
}


onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)
})


</script>


<style scoped>
@import 'bulma/css/bulma.css';
</style>