<template>
  <button @click="confirmDelete" class="delete-account-button">Delete Account</button>
</template>

<script>
import { getAuth, deleteUser } from 'firebase/auth';

export default {
  methods: {
    confirmDelete() {
      // Display a confirmation dialog before deleting the account
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        this.deleteAccount();
      }
    },
    async deleteAccount() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          await deleteUser(user);
          console.log('User account deleted successfully.');
          // You can add additional actions after successful deletion, such as redirecting to another page
        } catch (error) {
          console.error('Error deleting user account:', error);
        }
      } else {
        console.error('No user is currently logged in.');
      }
    }
  }
};
</script>

<style scoped>
.delete-account-button {
  background-color: #ff0000; /* Red color for delete button */
  color: #ffffff; /* White text color */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.delete-account-button:hover {
  background-color: #cc0000; /* Darker red on hover */
}
</style>
