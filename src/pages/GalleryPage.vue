<template>
    <div class="grid-container">
        <Header />
        <GenreSelector :genres="genres" @genre-selected="selectGenre" />
        <GalleryGrid :artworks="filteredArtworks" />
        <Footer />
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import Header from '@/components/Header.vue';
    import GenreSelector from '@/components/GenreSelector.vue';
    import GalleryGrid from '@/components/GalleryGrid.vue';
    import Footer from '@/components/MyFooter.vue';

    const genres = ref([]);
    const artworks = ref([]);
    const selectedGenre = ref('all');

    async function fetchGenres() {
        try {
            const response = await fetch('/api/genres');
            genres.value = await response.json();
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    }

    async function fetchArtworks() {
        try {
            const response = await fetch('/api/artworks');
            artworks.value = await response.json();
        } catch (error) {
            console.error('Error fetching artworks:', error);
        }
    }

    onMounted(async () => {
        await fetchGenres();
        await fetchArtworks();
    });

    const filteredArtworks = computed(() => {
        return selectedGenre.value === 'all'
            ? artworks.value
            : artworks.value.filter(art => art.genre === selectedGenre.value);
    });

    function selectGenre(genre) {
        selectedGenre.value = genre;
    }
</script>


<style scoped>
    .grid-container {
        display: flex;
        flex-direction: column;
        width: 100%; /* Ensures it takes the full width of the viewport */
        max-width: 1200px; /* Maximum width but allows smaller on narrower screens */
        margin: 0 auto; /* Centers the content horizontally */
    }
</style>
