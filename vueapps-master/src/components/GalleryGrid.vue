<template>
    <div class="collection-results">
        <h1>Collection Results</h1>
        <div class="gallery-grid">
            <div v-for="art in artworks" :key="art.id" class="artwork-card" @click="selectArtwork(art)">
                <img :src="art.imageUrl" :alt="art.title" class="artwork-image" />
                <div class="artwork-info">
                    <h2 class="artwork-title">{{ art.title }}</h2>
                    <!-- Additional info can be added here -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const artworks = ref([
        // Populate with artwork data
    ]);

    const selectArtwork = (art) => {
        // Handle artwork selection, possibly opening a modal or another view
    };
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
