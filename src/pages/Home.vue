<template>
    <div class="grid-container">
        <Header class="home-header" />

        <WelcomeBanner class="welcome-banner" />

        <div class="Awards">
            <ScrollableRow :images="images" />
        </div>

        <DiscoverArt />

        <ArtDisplayrightside />

        <div class="home-main">
            <!-- Content of home-main if there's any -->
        </div>

        <div class="home-footer">
            <MyFooter ref="footer" />
        </div>
    </div>
</template>


<script setup>
    import Header from '../components/Header.vue';
    import WelcomeBanner from '../components/WelcomeBanner.vue';
    import ScrollableRow from '../components/ScrollableRow.vue';
    import ArtDisplay from '../components/ArtDisplay.vue';
    import MyFooter from '../components/MyFooter.vue';
    import DiscoverArt from '../components/DiscoverArt.vue';
    import { ref, onMounted } from 'vue';
    import { getImages } from '../firebase/imageService';
    import ArtDisplayrightside from '../components/ArtDisplayrightside.vue';


    const images = ref([]);

    onMounted(async () => {
        images.value = await getImages();
    });

</script>

<style scoped>
    .grid-container {
        display: grid;
        grid-template-rows: auto auto auto auto 1fr auto; /* Each auto represents the height of one section */
        width: 100%;
        min-height: 100vh; /* Ensure it covers the viewport height */
        gap: 20px;
    }

    /* Correct the placement of each component within the grid layout */
    .home-header {
        grid-row: 1 / 2;
    }

    .welcome-banner {
        grid-row: 2 / 3;
    }

    .Awards {
        grid-row: 3 / 4;
    }

    .DiscoverArt {
        grid-row: 4 / 5;
    }

    .ArtDisplayrightside {
        grid-row: 5 / 6; /* Make sure this is in the correct position */
        width: 100%;
        justify-self: center;
    }

  
    .home-footer {
        grid-row: 6 / 7; /* Ensure the footer is always at the last row */
    }
</style>

