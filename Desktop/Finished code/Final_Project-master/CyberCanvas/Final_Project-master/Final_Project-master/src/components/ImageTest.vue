<template>
    <div>
   
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
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }

  </style>
  
