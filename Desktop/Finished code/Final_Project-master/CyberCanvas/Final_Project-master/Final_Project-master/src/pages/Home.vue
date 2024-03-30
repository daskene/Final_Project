<template>
    <div class="grid-container">
        <Header class="grid-item home-header" />
        <div class="welcome-mostliked-wrapper">
            <WelcomeBanner class="grid-item welcome-banner" />
            <MostLiked class="grid-item most-liked" />
        </div>
        <div class="grid-item awards">
            <ScrollableRow :images="images" />
        </div>
        <Ourcommitment class="grid-item our-commitment" />
        <DiscoverArt class="grid-item discover-art" />
        <MyFooter class="grid-item home-footer" />
    </div>
</template>



<script setup>
    import MostLiked from '../components/Titleforliked.vue';
    import MyFooter from '../components/MyFooter.vue';
    import Header from '../components/Header.vue';
    import { ref, onMounted } from 'vue'
    import ScrollableRow from '../components/ScrollableRow.vue';
    import { getImages } from '../firebase/imageService'
    import artdiscription from '../components/ArtDisplayrightside.vue';
    import DiscoverArt from '../components/DiscoverArt.vue';
    import Ourcommitment from '../components/Ourcommitments.vue';
    import WelcomeBanner from '../components/WelcomeBanner.vue';


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




<style scoped>
    .grid-container {
        display: grid;
        width: 100vw;
        grid-template-rows: auto auto auto auto auto auto; /* Adjust for more rows if needed */
        grid-template-columns: 1fr;
        background-color: #000000f3;
    }

    .welcome-mostliked-wrapper {
        position: relative;
        z-index: 1;
    }

.welcome-mostliked-wrapper::before,
.welcome-mostliked-wrapper::after {
  content: "";
  position: absolute;
  width: 50%; /* Adjust this to control the size of the image */
  height: 100%;
  background-size: cover; /* Or adjust to get the desired size of your logos */
  background-repeat: no-repeat;
  top: 0;
  z-index: -1;
}

.welcome-mostliked-wrapper::before {
  left: 0;
  background-image: url('../assets/BackgroundLogo.png');
  background-position: left center;
}

.welcome-mostliked-wrapper::after {
  right: 0;
  background-image: url('../assets/BackgroundLogo.png');
  background-position: right center;
}



    /* Specific styles for DiscoverArt to move it down */
    .DiscoverArt {
        position: relative; /* Ensuring it can be positioned accurately */
        margin-top: 40px; /* Adjust this value to move DiscoverArt down as needed */
        z-index: 1; /* Keep or adjust z-index based on stacking needs */
    }

    /* Ensure other elements are properly aligned and visible */
    .ScrollableRow {
        position: relative; /* Necessary for stacking context */
        z-index: 2; /* Adjust if necessary for visibility */
    }
    .our-commitment {
        /* Styles for Ourcommitment component, adjust margin as needed */
        margin-top: 20px; /* This adds space between Ourcommitment and elements above */
    }

    /* Adjust other component styles as necessary */
    .home-main {
        grid-row: 5;
        width: 100%;
        justify-self: center;
    }

    .home-footer {
        margin-top: auto; /* Pushes the footer to the bottom */
        width: 100%;
    }
</style>
