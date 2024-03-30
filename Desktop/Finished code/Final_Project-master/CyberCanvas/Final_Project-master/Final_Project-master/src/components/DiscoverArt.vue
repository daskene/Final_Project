<template>
    <div class="explore-art">
        <div v-for="(art, index) in featuredArtworks" :key="index" class="art-section" :class="{ 'reverse-layout': index % 2 !== 0 }">
            <div class="art-description">
                <h2>{{ art.title }}</h2>
                <p>{{ art.description }}</p>
            </div>
            <div class="art-image-container">
                <img :src="art.ImageURL" alt="Featured Art" class="art-image" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { getImages } from '@/firebase/imageService';

    const artworks = ref([]);
    const featuredArtworks = ref([]);

    const titles = [
        "Unveil the Artistic Journey",
        "Explore Global Art"
    ];
    const descriptions = [
        "Embark on an explorative journey through the diverse landscapes of creativity and craftsmanship. Our platform offers a panoramic view of artistic expressions, from the timeless classics to the contemporary avant-garde.",
        "Discover breathtaking images by artists all over the globe, categorized for ease of finding your own style."
    ];

    async function fetchArtworks() {
        const result = await getImages();
        artworks.value = result;

        featuredArtworks.value = titles.map((title, index) => {
            const artIndex = index < artworks.value.length ? index : 0; // Fallback to the first artwork if not enough
            return {
                title: title,
                description: descriptions[index],
                ImageURL: artworks.value[artIndex].ImageURL
            };
        });
    }

    onMounted(fetchArtworks);
</script>

<style scoped>
    .explore-art {
        display: flex;
        flex-direction: column;
        color: white;
        margin: 20px 0;
    }

    .art-section {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .reverse-layout {
        flex-direction: row-reverse;
    }

    .art-description {
        flex: 1;
        padding: 20px;
        font-size: 1.2em;
    }

        .art-description h2 {
            margin-bottom: 10px;
            font-size: 2em;
        }

        .art-description p {
            line-height: 1.5;
            font-size: 1.1em;
        }

    .art-image-container {
        flex: 1;
        max-width: 50%;
        min-width: 300px;
        height: auto;
    }

    .art-image {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 10px;
        border: 2px solid white; 
    }
</style>
