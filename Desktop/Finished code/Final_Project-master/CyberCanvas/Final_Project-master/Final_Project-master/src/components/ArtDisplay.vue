<template>
    <div class="art-display">
      <ImageTest v-if="selectedImage" :image="selectedImage" class="image-test" />
      <div class="reactions">
        <button @click="likeImage">Like</button>
        <button @click="dislikeImage">Dislike</button>
        <span v-if="selectedImage.likes">Likes: {{ selectedImage.likes }}</span>
        <span v-if="selectedImage.dislikes">Dislikes: {{ selectedImage.dislikes }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import { getImages } from "../firebase/imageService";
  import ImageTest from "@/components/ImageTest.vue";
  
  export default {
    name: "ArtDisplay",
    components: {
      ImageTest,
    },
    data() {
      return {
        images: [],
        selectedImage: {
          likes: 0,
          dislikes: 0,
        },
      };
    },
    async created() {
      this.images = await getImages();
      this.selectedImage = this.images.reduce((maxImage, image) => {
        return image.likes > maxImage.likes ? image : maxImage;
      });
    },
    methods: {
      likeImage() {
        if (this.selectedImage) {
          this.selectedImage.likes++;
          // db.collection('ImageLinks').doc(this.selectedImage.id).update({ likes: this.selectedImage.likes })
        }
      },
      dislikeImage() {
        if (this.selectedImage) {
          this.selectedImage.dislikes++;
          // db.collection('ImageLinks').doc(this.selectedImage.id).update({ dislikes: this.selectedImage.dislikes })
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .art-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  
  .image-test {
    width: 500px;
    height: 500px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  
  .reactions {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }
  
  button {
    margin-bottom: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }
  
  span {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  </style>