<template>
    <div class="carousel-container">
      <div class="carousel-wrapper">
        
        <div class="carousel-item" v-for="(image, index) in visibleImages" :key="`item-${currentIndex}-${index}`">
            
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
        interval: null, // Store the interval ID
      };
    },
    computed: {
      visibleImages() {
        if (!this.images || this.images.length === 0) {
          return [];
        }
        // Show only the current image plus the next two
        let end = this.currentIndex + 3;
        if (end > this.images.length) {
          let visibleImages = this.images.slice(this.currentIndex, this.images.length).concat(this.images.slice(0, end - this.images.length));
          return visibleImages;
        }
        return this.images.slice(this.currentIndex, end);
      },
    },
    mounted() {
      this.interval = setInterval(this.advanceCarousel, 3000); // Adjust the timing as needed
    },
    methods: {
      advanceCarousel() {
        if (!this.images || this.images.length === 0) {
          // Optionally stop the interval or handle the undefined case
          clearInterval(this.interval);
          return;
        }
    // Decrement currentIndex to move the carousel one image to the left
        this.currentIndex -= 1

        if (this.currentIndex < 0) {
          this.currentIndex = this.images.length - 1;
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
    width: 100%;
    height: 240px;
    background-color: green; /* The green bar */
  }
  
  .carousel-wrapper {
    display: flex;
    justify-content: flex-start; /* Align items to the start */
    gap: 10px; /* Optional: adds space between items */
    height: 100%;
  }
  
  .carousel-item {
    flex: 0 0 33.33%; /* Each item takes up one-third of the container's width */
    display: flex; /* To center the content inside each item */
    justify-content: center;
    align-items: center;
    height: 100%;
    animation: slideInRight 1s forwards; /* Adjust duration as needed */
  }
  
  .carousel-item img {
  max-width: auto; /* Ensure image width does not exceed item width */
  max-height: 70%; /* Control image height to fit within the item */
  object-fit: contain; /* Adjust the object-fit as needed */
  margin: auto;
  }

  @keyframes slideInRight {
    0% {
      transform: translateX(-100%); /* Start off-screen to the left */
    }
    100% {
      transform: translateX(0); /* Move into the visible area */
    }
  }
  </style>
  