<template>
    <div class="home-header">
        <div class="logo-container">
            <Logo/>
            <span class="site-name">CyberCanvas</span>
        </div>
        <div class="search-bar-container">
            <input class="input home-search-bar" type="text" v-model="searchQuery" @keyup.enter="searchImages" placeholder="Search for photos">
            <button @click="searchImages" class="button is-primary is-small search-button">
                <span>&#10003;</span> <!-- Tick icon -->
            </button>
        </div>
        <div class="nav-links">
            <div v-if="isAdmin" class="login-link">
                <!-- Add admin-specific content here -->
                <router-link to="/admin">Admin Panel</router-link>
            </div>
            <router-link class="home-link" to="/">Home</router-link>
            <router-link class="gallery-link" to="/gallery">Galleries</router-link>
            <template v-if="currentUser">
                <!-- Render "Post Artwork" link if user is logged in -->
                <router-link class="posting-link" to="/posting">Post Artwork</router-link>
                <router-link class="login-link" to="/account">My Account</router-link>
                <!-- Render logout button if user is logged in -->
                <LogoutButton />
            </template>
            <template v-else>
                <!-- Render login/signup links if user is not logged in -->
                <router-link class="login-link" to="/login">Login</router-link>
                <router-link class="signup-link" to="/signup">Sign up</router-link>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase';
import LogoutButton from '../components/logout.vue';
import { doc, getDoc } from 'firebase/firestore';
import Logo from '../components/Logo.vue';
const auth = getAuth();
const router = useRouter();
const currentUser = ref(null);
const searchQuery = ref('');
const isAdmin = ref(false);

const searchImages = () => {
  if (searchQuery.value.trim() !== '') {
    router.push({ name: 'SearchResult', query: { q: searchQuery.value } });
  }
};

onAuthStateChanged(auth, async (user) => {
  currentUser.value = user;
  if (user) {
    try {
      // Fetch user document from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      // Check if the user has a role field and if its value is 'admin'
      isAdmin.value = userData && userData.role === 'admin';
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      isAdmin.value = false; // Set isAdmin to false if there's an error
    }
  } else {
    isAdmin.value = false; // Set isAdmin to false if user is not logged in
  }
});
</script>


<style scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw; /* Use percentage to fit container width */
  background-color: black;
  padding: 10px 20px;
}

.logo-container {
  display: flex;
  align-items: center; /* Centers items vertically */
}

.site-name {
  color: white; /* Set text color */
  margin-left: 10px; /* Add spacing between logo and site name */
  font-size: 20px; /* Adjust font size */
}

.search-bar-container {
  display: flex;
  align-items: center;
}

.home-search-bar {
  max-width: 600px; /* Example max-width, adjust as needed */
  margin-right: 10px; /* Adjust margin */
  padding: 10px; /* Adjust padding to fit your design */
}

/* Style for the search button */
.search-button {
  height: 2rem; /* Adjust height */
  width: 2rem; /* Adjust width */
  font-size: 1.2rem; /* Adjust font size */
  padding: 0.3rem; /* Adjust padding */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%; /* Make it circular */
}

.nav-links {
  display: flex; /* Use flexbox for side-by-side layout */
}

/* Style for individual links */
.home-link,
.gallery-link,
.posting-link,
.login-link,
.delete-link,
.signup-link {
  margin-right: 20px; /* Adjust spacing between links */
  color: white; /* Set text color */
  text-decoration: none; /* Remove default underline */
}

/* Hover styles for links */
.home-link:hover,
.gallery-link:hover,
.posting-link:hover,
.login-link:hover,
.delete-link:hover,
.signup-link:hover {
  text-decoration: underline; /* Add underline on hover */
}

/* Styles for admin header */
.admin-header {
  margin-left: auto; /* Push admin header to the right */
}

.admin-header a {
  margin-left: 20px; /* Adjust spacing between admin links */
  color: white; /* Text color */
  text-decoration: none; /* Remove underline */
}

.admin-header a:hover {
  text-decoration: underline; /* Add underline on hover */
}
</style>
