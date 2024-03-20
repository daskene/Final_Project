<template>
    <div class="collection-results">
        <h1>Collection Results</h1>
        <div class="gallery-grid" ref="galleryGrid">
            <div v-for="art in displayedArtworks" :key="art.id" class="artwork-card">
                <img :src="art.ImageURL" :alt="art.ImageName" class="artwork-image" />
                <div class="artwork-info">
                    <h2 class="artwork-title">{{ art.ImageName }}</h2>
                    <!-- Additional info can be added here -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { getImages } from '@/firebase/imageService';

    const batchSize = 50; // Load 50 artworks at a time
    const artworks = ref([]);
    const displayedArtworks = ref([]);

    const fetchArtworks = async () => {
        artworks.value = await getImages();
        loadMore();
    };

    const loadMore = () => {
        const nextIndex = displayedArtworks.value.length;
        const moreArtworks = artworks.value.slice(nextIndex, nextIndex + batchSize);
        displayedArtworks.value = displayedArtworks.value.concat(moreArtworks);
    };

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 10) { // Adjust threshold as needed
            loadMore();
        }
    };

    onMounted(() => {
        fetchArtworks();
        window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>




<style scoped>
    .collection-results > h1 {
        text-align: center;
        margin-bottom: 2rem;
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
    }

    .artwork-card {
        cursor: pointer;
        transition: box-shadow 0.3s ease;
    }

        .artwork-card:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

    .artwork-image {
        width: 100%;
        height: auto;
        display: block;
    }

    .artwork-info {
        padding: 1rem;
        text-align: center;
    }

    .artwork-title {
        font-size: 1.1rem;
        margin-top: 1rem;
    }

    .artwork-artist,
    .artwork-period {
        font-size: 0.9rem;
        color: #666;
    }
</style>
