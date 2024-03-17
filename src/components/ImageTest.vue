<template>
    <div>
    <!-- Safely display image if the URL is available -->
    <img v-if="image && image.ImageURL" :src="image.ImageURL" :alt="image.ImageName" />
    <p v-else>Image not available</p>
    </div>
  </template>
  
  <script>
    export default {
        props: {
            image: {
                type: Object,
                default: () => ({ ImageURL: '', ImageName: '' })
            }
        }
    };
  </script>
  
  <style>
    img {
      max-width: 100%; /* or any other size */
      max-height: 100%; /* maintain aspect ratio */
      object-fit: cover;
      border-radius: 8px;
    }
  /* Add your styling here */
  </style>
  