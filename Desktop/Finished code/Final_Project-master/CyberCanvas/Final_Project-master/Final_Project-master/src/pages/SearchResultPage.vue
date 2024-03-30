<template>
  <Header/>
  <div class="search-result-page">
    <h2>Search Results</h2>
    <div v-if="searchResults.length > 0" class="search-results">
      <div v-for="image in searchResults" :key="image.id" class="search-result">
        <div class="image-overlay" @click="showImagePopup(image)">
          <img :src="image.ImageURL" alt="Image" class="search-image">
          <div class="overlay-content">
            <p class="name">{{ image.ImageName }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-results">
      No results found.
    </div>
    <ImagePopup :image="selectedImage" v-if="isImagePopupVisible" @close="closeImagePopup" />
  </div>
  <MyFooter/>
</template>
<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import Header from '../components/Header.vue'

const props = defineProps({
  query: String // Define query as a prop of type String
});

const searchResults = ref([]);

const fetchSearchResults = async (searchQuery) => {
  try {
    if (searchQuery.trim() !== '') {
      const q = query(collection(db, 'ImageLinks'), where('ImageName', '>=', searchQuery), where('ImageName', '<', searchQuery + '\uf8ff'));
      const querySnapshot = await getDocs(q);
      searchResults.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }
  } catch (error) {
    console.error('Error searching images:', error);
  }
};


onMounted(() => {
  fetchSearchResults(props.query);
});

watch(() => props.query, (newValue, oldValue) => {
  fetchSearchResults(newValue);
});

const isImagePopupVisible = ref(false);
const selectedImage = ref(null);

const showImagePopup = (image) => {
  selectedImage.value = image;
  isImagePopupVisible.value = true;
};

const closeImagePopup = () => {
  selectedImage.value = null;
  isImagePopupVisible.value = false;
};

</script>


<style scoped>
.search-result-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.search-results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.search-result {
  position: relative;
}

.image-overlay {
  position: relative;
  overflow: hidden;
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
</style>
