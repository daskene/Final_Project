

<template>
  <div class="grid-container">
    <div class="home-header">
      <Logo class="home-logo" />
      <div class="home-middle-header">
        <SearchBar class="home-search-bar" />
        <router-link class="home-link" to="/">Go to Home</router-link>
        <router-link class="login-link" to="/login">Go to Login</router-link>
        <router-link class="signup-link" to="/signup">Go to Sign up</router-link>
      </div>
      <Title class="home-title" />
    </div>
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
import Logo from '../components/Logo.vue'
import SearchBar from '../components/SearchBar.vue'
import Title from '../components/Title.vue'
import ArtDisplay from '../components/ArtDisplay.vue'
import MyFooter from '../components/MyFooter.vue'
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
  grid-template-rows: 130px 240px 1fr 120px; /* Change this line */
  grid-template-columns: 1fr;
  gap: 20px; /* Add this line */
}

.grid-item {
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
}
.home-header {
  display: grid;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: black;
  grid-template-columns: 20% 50% 30%;
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
.home-tite{
  grid-column: 3 / 4;
  font-size: 30;
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