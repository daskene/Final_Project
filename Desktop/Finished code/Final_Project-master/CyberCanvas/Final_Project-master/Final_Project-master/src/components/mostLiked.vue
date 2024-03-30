<template>
  <div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="image-container">
      <div v-for="image in images" :key="image.id" class="image-item">
        <div class="image-overlay">
          <img :src="image.imageUrl" alt="Image" class="image">
          <div class="overlay-content">
            <p class="artist">{{ image.artist }}</p>
            <p class="likes">Likes: {{ image.likes }}</p>
            <LikeButton :imageName="image.id" :firestore="db" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import LikeButton from '@/components/likeButton.vue';

const images = ref([]);
const loading = ref(false);

async function getMostLikedImages() {
  loading.value = true;
  images.value = [];

  try {
    const q = query(collection(db, 'ImageLinks'), orderBy('Likes', 'desc'), limit(6));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      images.value.push({ id: doc.id, ...data, imageUrl: data.ImageURL, likes: data.Likes });
    });
  } catch (error) {
    console.error('Error fetching most liked images:', error);
  }

  loading.value = false;
}

onMounted(getMostLikedImages);
</script>

<style scoped>
.image-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
}

.image-item {
  position: relative;
  overflow: hidden;
}

.image-overlay {
  position: relative;
}

.image {
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
  padding: 15px;
  box-sizing: border-box;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  opacity: 0;
}

.image-item:hover .overlay-content {
  transform: translateY(0);
  opacity: 1;
}

.overlay-content p {
  margin: 5px 0;
}

.loading {
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
}
</style>
