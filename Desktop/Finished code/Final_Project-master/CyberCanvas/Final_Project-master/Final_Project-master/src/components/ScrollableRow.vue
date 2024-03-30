<template>
    <div class="carousel-container">
        <div class="carousel-wrapper" ref="wrapper">
            <div class="carousel-item" v-for="(image, index) in visibleImages" :key="`item-${currentIndex}-${index}`">
                <div class="image-info artist-name">{{ image.Artist }}</div>
                <ImageTest :image="image" class="carousel-image" />
                <div class="image-info image-title">{{ image.ImageName }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import ImageTest from './ImageTest.vue';

    export default {
        components: {
            ImageTest
        },
        props: {
            images: Array
        },
        data() {
            return {
                currentIndex: 0,
                interval: null, // Store the interval ID
            };
        },
        computed: {
            visibleImages() {
                if (!this.images || this.images.length === 0) {
                    return [];
                }
                // Show only the current image plus the next two
                let end = this.currentIndex + 4;
                if (end > this.images.length) {
                    let visibleImages = this.images.slice(this.currentIndex, this.images.length).concat(this.images.slice(0, end - this.images.length));
                    return visibleImages;
                }
                return this.images.slice(this.currentIndex, end);
            },
        },
        mounted() {
            this.interval = setInterval(this.advanceCarousel, 3000); 
        },
        methods: {
            advanceCarousel() {
                if (!this.images || this.images.length === 0) {
            
                    clearInterval(this.interval);
                    return;
                }
                // Decrement currentIndex to move the carousel one image to the left
                this.currentIndex -= 1

                if (this.currentIndex < 0) {
                    this.currentIndex = this.images.length - 1;
                }
            }
        },
        beforeDestroy() {
            clearInterval(this.interval); // Clear the interval when the component is destroyed
        },
    }
</script>


<style scoped>
    .carousel-container {
        overflow: hidden;
        width: 100%;
        height: 400px;
        background-image: radial-gradient(#2d258d, #1e0830, #080707);
        margin-bottom: 50px;
    }

    .carousel-wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        will-change: transform;
        transition: transform 1s ease; /* Transition for smooth scrolling */
    }


    .carousel-item {
        flex: 0 0 auto;
        width: calc(60% / 3); /* Example fixed width */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 10px; /* Space between artist name, image, and title */
        animation: slideInRight 1s forwards; /* Apply the slide-in animation */
        padding: 10px;
        flex: 0 0 33.3333%;
    }

    .image-info {
        text-align: center;
        margin: 5px 0; /* Margin above and below text */
    }

    .artist-name {
        font-size: 14px;
        font-weight: bold;
        color: white;
    }

    .image-title {
        font-size: 12px;
        color: white;
    }

    .carousel-item img {
        max-width: 100%; /* Ensure image width does not exceed item width */
        max-height: 90%; /* Control image height */
        object-fit: contain; /* Adjust object-fit as needed */
        align-self: center;
        transition: opacity 0.5s ease;
    }

    .carousel-image {
        height: 250px;
        border: 2px solid white; 
        border-radius: 10px;
    }

    @media (max-width: 768px) {
        .carousel-item {
            width: calc(100% / 3); /* Adjust the width to show 3 items at a time */
        }

            .carousel-item img {
                max-height: 200px; /* Adjust the max-height for smaller viewports */
            }
    }

    @keyframes slideInRight {
        0% {
            transform: translateX(-100%); /* Start off-screen to the left */
        }

        100% {
            transform: translateX(0); /* Move into the visible area */
        }
    }
</style>
