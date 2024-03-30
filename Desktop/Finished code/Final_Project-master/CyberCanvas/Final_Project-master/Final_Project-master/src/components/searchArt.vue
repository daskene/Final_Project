<template>
  <div>
    <div class="select">
      <select v-model="selectedGenre" @change="getImages">
        <option value="">Select Genre</option>
        <option v-for="genre in genres" :value="genre">{{ genre }}</option>
      </select>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else class="image-container">
      <div v-for="image in images" :key="image.id" class="image-item">
        <img :src="image.imageUrl" alt="Image" class="image">
        <p>{{ image.artist }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const selectedGenre = ref('');
const images = ref([]);
const loading = ref(false);

const genres = ['Painting', 'Sculpture', 'Drawing', 'Digital Art', 'Photograph'];

async function getImages() {
  loading.value = true;
  images.value = [];

  if (!selectedGenre.value) {
    loading.value = false;
    return;
  }

  const q = query(collection(db, 'ImageLinks'), where('Genre', '==', selectedGenre.value));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    images.value.push({ id: doc.id, ...data, imageUrl: data.ImageURL }); // Assuming the image URL field is named "ImageURL" in Firestore
  });

  loading.value = false;
}

onMounted(getImages);
</script>

<style scoped>
.select {
  margin-bottom: 1rem;
}

/* Adjust the container and item styles */
.image-container {
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  width: 200px; /* Adjust as needed */
  margin-right: 20px; /* Adjust spacing between images */
  margin-bottom: 20px;
}

.image {
  width: 100%; /* Ensure the image fills its container */
}
</style>
