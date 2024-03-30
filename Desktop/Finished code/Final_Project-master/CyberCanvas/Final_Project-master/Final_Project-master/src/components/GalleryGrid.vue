<template>
    <div class="the-gallery">
        <div class="gradient-border-wrapper">
            <div class="gallery-grid">
                <div v-for="(image, index) in images" :key="index" class="image-container" @click="showImagePopup(image)">
                    <div class="image-overlay">
                        <span>{{ image.imageArtist }}</span>
                        <span>{{ image.imageName }}</span>
                        <LikeButton :imageName="image.imageName" />
                    </div>
                    <img :src="image.imageUrl" :alt="image.imageName" class="gallery-image" />
                </div>
            </div>
        </div>
        <ImagePopup :image="selectedImage" v-if="selectedImage" @close="closeImagePopup" />
    </div>
</template>

<script>
    import { ref, watch } from 'vue';
    import { getImagesByGenre } from '@/firebase/imageService';
    import ImagePopup from "@/components/ImagePopup.vue";
    import LikeButton from '../components/likeButton.vue';

    export default {
        name: 'GalleryGrid',
        components: {
            ImagePopup,
            LikeButton
        },
        props: {
            genre: String,
        },
        setup(props) {
            const images = ref([]);
            const selectedImage = ref(null);

            watch(() => props.genre, async (newGenre, oldGenre) => {
                if (newGenre && newGenre !== oldGenre) {
                    try {
                        const fetchedImages = await getImagesByGenre(newGenre);
                        images.value = fetchedImages.map(image => ({
                            imageUrl: image.ImageURL,
                            imageName: image.ImageName,
                            imageArtist: image.Artist,
                            imageDescription: image.Description,
                        }));
                    } catch (error) {
                        console.error('Failed to fetch images:', error);
                        images.value = [];
                    }
                }
            }, { immediate: true });

            const showImagePopup = (image) => {
                selectedImage.value = {
                    imageUrl: image.imageUrl,
                    imageName: image.imageName,
                    imageArtist: image.imageArtist,
                    imageDescription: image.imageDescription
                };
            };

            const closeImagePopup = () => {
                selectedImage.value = null;
            };

            return {
                images,
                selectedImage,
                showImagePopup,
                closeImagePopup
            };
        },
    };
</script>

<style scoped>
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* Define 4 columns */
        grid-auto-rows: minmax(200px, auto);
        gap: 5px;
        padding: 1rem 0;
        padding: 50px; /* Increase bottom margin to create a bigger gap */
        background: linear-gradient(45deg, #000108, #000439);
        overflow: hidden;
        border-radius: 7px;
    }

    .the-gallery {
        display: flex;
        justify-content: center;
    }

    .gradient-border-wrapper {
        display: grid;
        padding: 10px; /* This acts as the border width */
        background: linear-gradient(45deg, #000439, #000970); /* Gradient color */
        border-radius: 10px; /* Rounded corners */
        box-shadow: 0 4px 8px rgba(2, 2, 1, 0.2); /* Drop shadow: horizontal offset, vertical offset, blur radius, color */
        margin-bottom: 50px;
        width: 80%;
    }

    .image-container img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }

    .image-container {
        display: flex;
        position: relative;
        overflow: hidden;
        aspect-ratio: 1/1;
        min-height: 200px;
        align-items: stretch;
    }

        .image-container:hover .image-overlay {
            opacity: 1;
        }

        /* After the transition ends, restore the previous scale (to prevent continuous growth) */
        .image-container img.transitioned {
            transform: scale(1);
        }

        .image-container:hover .gallery-image.transitioned {
            transition: none;
        }

        .image-container:hover .gallery-image:not(.transitioned) {
            transition: transform 0.25s;
            transition-delay: 0.25s;
        }

    .image-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px;
        background: linear-gradient(0deg, transparent 80%, rgba(0, 0, 0, 0.9) 100%);
        color: #FFF;
        text-align: left;
        opacity: 0;
        transition: 0.3s ease;
    }

        .image-overlay span {
            display: block;
            margin: 5px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .image-overlay button {
            color: #FFF;
            background-color: rgba(0, 0, 0, 0.7);
            border: 1px solid #FFF;
            padding: 5px 10px;
            cursor: pointer;
            margin: 5px 0;
            text-transform: uppercase;
        }

    .gallery-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        cursor: pointer;
        transition: 0.3s ease;
    }

        .gallery-image:hover {
            transform: scale(1.05);
        }
</style>
