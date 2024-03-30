<template>
    <div class="image-viewer">
        <div class="image-container">
            <button @click="$emit('close')">Close</button>
            <img :src="selectedImage.imageUrl" :alt="selectedImage.imageName" />
            <div class="description">
                <p><span class="bold-label">Name::</span>  {{ selectedImage.imageName }}</p>
                <p><span class="bold-label">Artist:</span>  {{ selectedImage.imageArtist }}</p>
                <p><span class="bold-label">Description:</span>  {{ selectedImage.imageDescription }}</p>
            </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: "ImageViewer",
    props: {
      selectedImage: Object
    }
  };
  </script>
  
  <style scoped>
.image-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8); /* Dark overlay */
  padding: 20px;
  box-sizing: border-box;
}

.image-container {
  display: flex;
  max-height: 90%; /* Adjusted for screen size */
  max-width: 90%; /* Adjusted for screen size */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.image-viewer img {
  max-height: 100%;
  max-width: 60%; /* Bigger image size */
  object-fit: cover; /* Adjust as needed */
}

.image-viewer .description {
  color: white; /* For better visibility against the dark background */
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.2em; /* Larger text */
  font-family: 'Arial', sans-serif; /* Nice, readable font */
}

.image-viewer button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #f00; /* Adjust as needed */
  color: white;
  padding: 10px 15px;
  border-radius: 5px; /* A bit of styling */
  cursor: pointer;
}

.image-viewer button:hover {
  background-color: #d00; /* Slightly darker on hover */
}

.bold-label {
  font-weight: bold;
  margin-bottom: 0.5em; /* Added space between lines */
}

  </style>