<template>
    <div class="carousel-container">
      <div class="carousel-row">

        <div class="carousel-item" v-for="image in visibleImages" :key="image.ImageName">
          
          <ImageTest :image="image" />

        </div>
        
        </div>
        
    </div>
  </template>
  
  <script>
  import ImageTest from './ImageTest.vue';

  export default {
  components: {
    ImageTest
  },
  props: {
    images: Array
  },
  data() {
      return {
        currentIndex: 0,
        interval: null, // Add this line to store the interval ID
      };
    },
    computed: {
      visibleImages() {
        if (!this.images || this.images.length === 0) {
          
        return [];
        }
        // Use a computed property for reactive updates
        let end = this.currentIndex + 3;
        
        if (end > this.images.length) {
          // // If the end exceeds the array length, slice until the end and start from the beginning
          // return this.images.slice(this.currentIndex, this.images.length).concat(this.images.slice(0, end - this.images.length));
          let visibleImages = this.images.slice(this.currentIndex, this.images.length).concat(this.images.slice(0, end - this.images.length));
            
          return visibleImages;
          
        }
        return this.images.slice(this.currentIndex, end);
      },
    },
    mounted() {
      this.interval = setInterval(this.advanceCarousel, 5000); // Store the interval ID
    },
    methods: {
      advanceCarousel() {

    if (!this.images || this.images.length === 0) {
      // Optionally stop the interval or handle the undefined case
      clearInterval(this.interval);
      return;
    }
    console.log("advanceCarousel - Current Index before advance:", this.currentIndex);
      this.currentIndex += 3;
      if (this.currentIndex >= this.images.length) {

        this.currentIndex -= this.images.length; // Loop back to the start if we reach the end
        console.log("advanceCarousel - Looping back to start");
      }
      }
    },
    beforeDestroy() {
      clearInterval(this.interval); // Clear the interval when the component is destroyed
    },
  }
  </script>
  
  <style scoped>
  .carousel-container {
    overflow: hidden;
    width: 100%; /* Ensure the container is full width */
  }
  
  .carousel-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 240px;
    padding: 10px;
    background-color: green;
  }
  
  .carousel-item {
    display: flex;
    background-color: purple;
    justify-self: center;
    width: 300px;
    height: 100%;
    color: white;
    text-align: center;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  </style>
  