<template>
  <form @submit.prevent="signup" class="login-form">
    <h2 class="form-title">Sign Up</h2>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input v-model='signupEmail' class="input" type="email" placeholder="Enter email">
      </div>
    </div>
    <!-- Add other fields for first name, last name, and date of birth -->
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input v-model='signupPassword' class="input" type="password" placeholder="Enter password">
      </div>
    </div>
    <div class="field">
      <label class="label">First Name</label>
      <div class="control">
        <input v-model='firstName' class="input" type="text" placeholder="Enter first name">
      </div>
    </div>
    <div class="field">
      <label class="label">Last Name</label>
      <div class="control">
        <input v-model='lastName' class="input" type="text" placeholder="Enter last name">
      </div>
    </div>
    <div class="field">
      <label class="label">Date of Birth</label>
      <div class="control">
        <input v-model='dob' class="input" type="date">
      </div>
    </div>
    <!-- Add other fields for address, gender, and profile picture here -->

    <div class="field">
        <div class="control">
            <button :disabled="!signupEmail || !signupPassword || !firstName || !lastName || !dob" class="button is-info is-fullwidth">
                Sign Up
            </button>
            <p class="fine-print"> <br> Discover creativity. Sign up to explore the world of art!</p>
        </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/firebase';
import { useRouter } from 'vue-router';

const signupEmail = ref('');
const signupPassword = ref('');
const firstName = ref('');
const lastName = ref('');
const dob = ref('');

const auth = getAuth();
const router = useRouter();

async function saveUserToFirestore(uid, email) {
  const userRef = doc(db, 'users', uid);

  await setDoc(userRef, {
    email: email,
    uid: uid,
    firstName: firstName.value,
    lastName: lastName.value,
    dob: dob.value,
    phoneNo: null,
    address: null, // Set default values for other fields
    gender: null,
    profilePicture: null
  });
}

const signup = () => {
  createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
      .then((userCredential) => {
        const user = userCredential.user;

        // Send verification email
        sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log('Verification email sent');
            })
            .catch((error) => {
              console.error('Error sending verification email:', error);
            });

        // Save user's data in Firestore
        saveUserToFirestore(user.uid, signupEmail.value)
            .then(() => {
              console.log('User data saved successfully');
              // Redirect to the home page
              router.push('/');
            })
            .catch((error) => {
              console.error('Error saving user data:', error);
              // Handle error
            });
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        // Handle signup error
      });
}
</script>

<style scoped>
.login-form {
  width: 400px; /* Adjust width as needed */
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.field {
  margin-bottom: 20px;
}

.label {
  font-size: 16px;
  font-weight: bold;
}

.input {
  width: calc(100% - 20px); /* Adjusted width to account for padding */
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;
  box-sizing: border-box; /* Ensure padding is included in the width */
}

.input:focus {
  border-color: #3273dc;
  outline: none;
}

.button {
  border-radius: 6px;
}

.button.is-fullwidth {
  width: 100%;
}
</style>
