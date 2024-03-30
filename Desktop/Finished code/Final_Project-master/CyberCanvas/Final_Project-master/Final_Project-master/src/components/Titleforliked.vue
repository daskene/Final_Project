<template>
    <div class="carousel-title">
        <div class="dashes">--------------------------------</div>
        <div class="title-text">The 6 Most-Liked Masterpieces</div>
    </div>
</template>

<script>
    export default {
        name: 'CarouselTitle',
    };
</script>

<style scoped>
    .carousel-title {
        color: #fff;
        font-family: 'Times New Roman', serif;
        text-align: center;
        padding: 20px;
        margin: 0 auto;
        width: fit-content;
        border-radius: 10px;
    }

    .dashes {
        font-size: 3em; 
    }

    .title-text {
        font-size: 3em; /* Large text for the title */
    }
</style>
