<template>
  <div class="field">
    <label class="label">Search Photos</label>
    <div class="control">
      <div class="search-bar">
        <input class="input" type="text" v-model="searchQuery" placeholder="Search for photos">
        <button @click="performSearch" class="button is-primary">Search</button>
      </div>
    </div>
    <div v-if="searchResults.length > 0" class="search-results">
      <div v-for="image in searchResults" :key="image.id" class="search-result">
        <router-link :to="{ name: 'ImageDetails', params: { id: image.id }}" class="image-link">
          <div class="image-overlay">
            <img :src="image.ImageURL" alt="Image" class="search-image">
            <div class="overlay-content">
              <p class="name">{{ image.ImageName }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else class="no-results">
      No results found.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Logo from '@/components/Logo.vue';
import LogoutButton from '@/components/logout.vue'; // Import your Logout component

const auth = getAuth();
const router = useRouter();
const currentUser = ref(null);
const searchQuery = ref('');

const searchImages = () => {
  if (searchQuery.value.trim() !== '') {
    router.push({ name: 'SearchResultPage', query: { q: searchQuery.value } }); // Use 'q' as the query parameter
  }
};

onAuthStateChanged(auth, (user) => {
  currentUser.value = user;
});
</script>


<style scoped>
.field {
  margin-bottom: 20px;
}

.control {
  display: flex;
  align-items: center;
}

.label {
  margin-bottom: 5px;
  font-weight: bold;
}

.search-bar {
  display: flex;
  align-items: center;
}

.input {
  flex: 1;
  border-radius: 20px 0 0 20px;
  border-right: none;
}

.button {
  border-radius: 0 20px 20px 0;
}

.button:hover {
  background-color: #4a90e2;
}

.search-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
}

.search-result {
  position: relative;
  overflow: hidden;
}

.image-overlay {
  position: relative;
}

.search-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.overlay-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  opacity: 0;
}

.search-result:hover .overlay-content {
  transform: translateY(0);
  opacity: 1;
}

.overlay-content .name {
  margin: 5px 0;
}

.no-results {
  text-align: center;
  margin-top: 20px;
  color: #ff3333;
}

.image-link {
  text-decoration: none;
  color: inherit;
}
</style>
