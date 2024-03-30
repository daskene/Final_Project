<template>
  <form @submit.prevent="login" class="login-form">
    <h2 class="form-title">Login</h2>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input v-model='loginEmail' class="input" type="email" placeholder="Enter email">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input v-model='loginPassword' class="input" type="password" placeholder="Enter password">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button :disabled="!loginEmail || !loginPassword" class="button is-info is-fullwidth">
          Log in
        </button>
      </div>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <button v-if="showResetPasswordButton" @click="resetPassword" class="button is-link is-fullwidth">Reset Password</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from "firebase/auth";
import { useRouter } from 'vue-router';

const loginEmail = ref('');
const loginPassword = ref('');
const auth = getAuth();
const router = useRouter();
const errorMessage = ref('');
let failedLoginAttempts = 0;
const maxFailedAttempts = 3;
const showResetPasswordButton = ref(false);

const login = () => {
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
      .then(() => {
        // Handle successful login
        console.log('User logged in');
        // Redirect user to home page
        router.push('/');
      })
      .catch((error) => {
        // Handle login error
        errorMessage.value = 'Login failed. Please check your credentials.';
        console.error('Login error:', error.message);
        failedLoginAttempts++;
        if (failedLoginAttempts >= maxFailedAttempts) {
          showResetPasswordButton.value = true;
        }
      });
}

const resetPassword = () => {
  const emailAddress = loginEmail.value;
  sendPasswordResetEmail(auth, emailAddress)
      .then(() => {
        // Email sent.
        console.log('Password reset email sent successfully');
        // Optionally, you can provide feedback to the user that the email has been sent.
      })
      .catch((error) => {
        // An error happened.
        console.error('Error sending password reset email:', error);
        // Optionally, provide feedback to the user that there was an error sending the email.
      });
}

// Log current login status to console when the page is opened
console.log('Current login status:', auth.currentUser !== null ? 'Logged in' : 'Logged out');
</script>

<style scoped>
/* Your component styles here */

.login-form {
  width: 100%;
  max-width: 500px; /* Set max width */
  margin: auto; /* Center horizontally */
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
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;
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

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
