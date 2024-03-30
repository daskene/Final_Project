<template>
  <div class="grid-container">
    <Header />
    <GenreSelector :genres="genres" @genre-selected="genreSelected" />
    <GalleryGrid :genre="selectedGenre" />
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Header from "@/components/Header.vue";
import GenreSelector from "@/components/GenreSelector.vue";
import GalleryGrid from "@/components/GalleryGrid.vue";
import Footer from "@/components/MyFooter.vue";
import { getStaticGenreImages } from "@/firebase/imageService";

export default {
  name: "GalleryPage",
  components: {
    Header,
    GenreSelector,
    GalleryGrid,
    Footer,
  },
  setup() {
    const genres = ref([]);
    const selectedGenre = ref(null);

    onMounted(async () => {
      genres.value = await getStaticGenreImages();
    });

    const genreSelected = (genreName) => {
      selectedGenre.value = genreName;
    };

    return {
      genres,
      selectedGenre,
      genreSelected,
    };
  },
};
</script>

<style scoped>
    .grid-container {
        display: flex;
        flex-direction: column;
        width: 100vw;
        margin: 0 auto;
        background-color: #000000f8;
        min-height: 100vh; /* Make sure it covers the full height of the viewport */
        color: #fff; /* Adjust text color for readability against the dark background */
    }
</style>