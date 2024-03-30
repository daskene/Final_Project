
<template>
    <div class="gallery">
        <h1>Art Gallery</h1>
        <div v-for="image in images" :key="image.id" class="image">
            <img :src="image.url" :alt="image.title" />
            <p>{{ image.title }}</p>
        </div>
        <input type="file" @change="uploadImage">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                images: []
            };
        },
        methods: {
            uploadImage(event) {
                const file = event.target.files[0];
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.images.push({
                        id: this.images.length + 1,
                        url: e.target.result,
                        title: file.name
                    });
                };

                reader.readAsDataURL(file);
            }
        }
    }
</script>

<style>
    .gallery {
        text-align: center;
    }

    .image {
        margin: 20px;
    }
</style>