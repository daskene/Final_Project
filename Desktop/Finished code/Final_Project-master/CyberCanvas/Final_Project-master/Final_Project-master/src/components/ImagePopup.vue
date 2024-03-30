<template>
  <div class="image-popup" v-if="image">
    <div class="image-container">
      <img :src="image.imageUrl" :alt="image.imageName" class="popup-image" />
    </div>
    <div class="details-container">
      <h2>{{ image.imageName }}</h2>
      <p>Artist: {{ image.imageArtist }}</p>
      <p>Description: {{ image.imageDescription }}</p>
      <div class="button-container">
        <LikeButton :imageName="image.imageName" />
      </div>
    </div>
    <button @click="closePopup">Close</button>
  </div>
</template>

<script>
import LikeButton from '@/components/likeButton.vue'; // Adjust the path as needed

export default {
  props: {
    image: Object
  },
  components: {
    LikeButton
  },
  methods: {
    closePopup() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
/* Your existing styles here */

.image-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
}

.image-container {
  width: 50%;
  height: 100%;
}

.popup-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.details-container {
  width: 50%;
  padding: 2rem;
  color: white;
  text-align: center; /* Center text */
}

.details-container h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.details-container p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem; /* Adjust spacing between text and buttons */
}

button {
  margin: 0 0.5rem; /* Add some margin between buttons */
}
</style>
