<template>
    <div class="posting-container">
        <h2>Submit Your Artwork</h2>
        <form @submit.prevent="submitArtwork">
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="artwork.title" required>
            </div>
            <div class="form-group">
                <label for="artist">Artist:</label>
                <input type="text" id="artist" v-model="artwork.artist" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="artwork.description" required></textarea>
            </div>
            <div class="form-group">
                <label for="genre">Genre:</label>
                <select id="genre" v-model="artwork.genre" required>
                    <option value="abstract">Abstract</option>
                    <option value="landscape">Landscape</option>
                    <option value="portrait">Portrait</option>
                    <option value="Contemporary">Contemporary</option>
                    <option value="Photography">Photography</option>
                    <option value="Still Life">Still Life</option>
                    <option value="Impressionism">Impressionism</option>
                </select>
            </div>
            <div class="form-group">
                <label for="image">Add Art:</label>
                <input type="file" id="image" @change="handleFileUpload" required>
            </div>
            <button type="submit">Submit Artwork</button>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      artwork: {
        title: '',
        artist: '',
        description: '',
        genre: '',
        image: null
      }
    };
  },
  methods: {
    submitArtwork() {
      // Submit artwork logic
    },
    handleFileUpload(event) {
      // Handle file upload logic
    }
  }
};
</script>

<style scoped>
    .posting-container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        font-weight: bold;
    }

    input, textarea, select {
        width: 100%;
        padding: 10px;
        font-size: 16px;
    }

    button {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

        button:hover {
            background-color: #0056b3;
        }
</style>
