

<template>
    <div class="grid-container">
        <!-- Replace direct HTML with Header component -->
        <Header class="home-header" />

        <div class="Awards">
            <ScrollableRow :images="images" />
        </div>

        <div class="home-main">
            <ArtDisplay />
        </div>

        <div class="home-footer">
            <MyFooter ref="footer" />
        </div>
    </div>
</template>

<script setup>

import Title from '../components/Title.vue'
import ArtDisplay from '../components/ArtDisplay.vue'
    import MyFooter from '../components/MyFooter.vue'
    import Header from '../components/Header.vue'
import { ref, onMounted } from 'vue'
import ScrollableRow from '../components/ScrollableRow.vue'
import { getImages } from '../firebase/imageService' // Replace with your actual import

const images = ref([])
const footer = ref(null)

// Preload images function
const preloadImages = (imagesToPreload) => {
  imagesToPreload.forEach(image => {
    const img = new Image();
    img.src = image.ImageURL; // Make sure "ImageURL" matches the property in your images
  });
};

onMounted(async () => {
  images.value = await getImages();
  preloadImages(images.value); // Call preloadImages after fetching
  console.log(images.value);
})

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    footer.value.$el.classList.add('show')
  } else {
    footer.value.$el.classList.remove('show')
  }
})
</script>


<style>
/* Add your styling here */
</style>



<style scoped>
    .grid-container {
        display: grid;
        width: 100vw;
        height: 100%;
        grid-template-rows: auto 240px 1fr 120px; /* Changed from fixed height to auto */
        grid-template-columns: 1fr;
        gap: 20px;
    }

.grid-item {
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
}
   
    


.home-footer {
  grid-row: 4;
}



.home-main {
  width: 100%;
  justify-self: center;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px; /* Add this line */
}
.home-search-bar{
  grid-column: 1 / 4;
}

.home-middle-header{
  display: grid;
  width: 95%;
  height: 90%;
  justify-self: center;
  grid-column: 2 / 3;
  grid-template-rows: 50% 50%;
  grid-template-columns: 1fr 1fr 1fr;
}
.ArtDisplay {
  grid-row: 3;
  width: 90%;
  justify-self: center;
}


.home-logo{
  grid-column: 1 / 2;
}
.home-link{
  grid-column: 1 / 2;
}
.login-link{
  grid-column: 2 / 3;
}
.signup-link{
  grid-column: 3 / 4;
}


</style>