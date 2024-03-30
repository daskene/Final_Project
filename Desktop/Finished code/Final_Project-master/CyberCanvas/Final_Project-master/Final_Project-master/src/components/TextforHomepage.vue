<template>
    <div class="explore-more">
        <div class="text-description">
            <h2>Unveil the Artistic Journey</h2>
            <p>Embark on an explorative journey through the diverse landscapes of creativity and craftsmanship. Our platform offers a panoramic view of artistic expressions, from the timeless classics to the contemporary avant-garde.</p>
        </div>
        <div class="art-image-container">
            <img :src="featuredArtwork.ImageURL" alt="Art Piece" class="art-image" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getImages } from '@/firebase/imageService';

const artworks = ref([]);
const featuredArtwork = ref({ ImageURL: 'path/to/default/image.jpg' }); // Provide a default image path

async function fetchArtworks() {
    const result = await getImages();
    artworks.value = result;
    if (artworks.value.length > 0) {
        const randomIndex = Math.floor(Math.random() * artworks.value.length);
        featuredArtwork.value = artworks.value[randomIndex];
    }
}

onMounted(fetchArtworks);
</script>

<style scoped>
    .explore-more {
        display: flex;
        align-items: center;
        margin: 20px 0;
    }

    .text-description {
        flex: 1;
        padding-right: 20px; /* Space between text and image */
    }

    .art-image-container {
        flex: 1;
        max-width: 50%;
    }

    .art-image {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 10px;
    }
</style>