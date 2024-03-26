<template>
    <div class="discover-art">
        <div class="art-image-container">
            <img :src="randomArtwork.ImageURL" alt="Featured Art" class="art-image" />
        </div>
        <div class="art-description">
            <h2>Explore Global Art</h2>
            <p>Discover breathtaking images by artists all over the globe, categorized for ease of finding your own style.</p>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { getImages } from '@/firebase/imageService';

    const artworks = ref([]);
    const randomArtwork = ref({ ImageURL: '' });

    async function fetchArtworks() {
        const result = await getImages();
        artworks.value = result;
        if (artworks.value.length > 0) {
            const randomIndex = Math.floor(Math.random() * artworks.value.length);
            randomArtwork.value = artworks.value[randomIndex];
        }
    }

    onMounted(fetchArtworks);
</script>

<style scoped>
    .discover-art {
        display: flex;
        align-items: center;
        margin: 20px 0;
        overflow: hidden; /* Add this to prevent overflow */
    }

    .art-image-container {
        flex: 1;
        max-width: 50%;
        min-width: 300px; /* Set a minimum width */
        height: auto; /* Adjust height automatically */
        aspect-ratio: 16 / 9; /* Adjust based on your preferred aspect ratio */
    }

    .art-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px; /* Optional, for styled corners */
    }

    .art-description {
        flex: 1;
        padding-left: 20px;
        max-width: 50%;
        min-width: 300px; /* Ensure text area doesn't get too narrow */
    }

        .art-description h2 {
            margin-bottom: 10px;
        }

        .art-description p {
            line-height: 1.5;
        }
</style>
