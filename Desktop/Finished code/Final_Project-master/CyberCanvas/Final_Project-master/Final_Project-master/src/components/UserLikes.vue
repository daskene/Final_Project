<template>
    <div class="user-liked-disliked-images">
        <h2>User {{ viewType === 'liked' ? 'Liked' : 'Disliked' }} Images</h2>
        <div class="selector">
            <label for="viewTypeSelector">View:</label>
            <select id="viewTypeSelector" v-model="viewType" @change="fetchUserImages">
                <option value="liked">Liked Images</option>
                <option value="disliked">Disliked Images</option>
            </select>
        </div>
        <div v-if="images.length > 0" class="image-container">
            <div v-for="image in images" :key="image.imageName" class="image-item">
                <img :src="image.ImageURL" :alt="viewType === 'liked' ? 'Liked Image' : 'Disliked Image'" class="image">
                <div class="image-overlay">{{ image.imageName }}</div>
            </div>
        </div>
        <div v-else>
            <p>No {{ viewType === 'liked' ? 'liked' : 'disliked' }} images found.</p>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { getDocs, collection, where, query, doc, getDoc } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';
    import { db } from '@/firebase';

    const auth = getAuth();

    const currentUser = ref(null);
    const images = ref([]);
    const viewType = ref('liked'); // Default view type is 'liked'

    async function fetchUserImages() {
        if (!currentUser.value) {
            console.log('No user is currently logged in.');
            return;
        }

        const userId = currentUser.value.uid;
        const queryField = viewType.value === 'liked' ? 'liked' : 'disliked';

        try {
            const imagesQuery = query(collection(db, 'Likes'), where(queryField, '==', true));
            const imagesSnapshot = await getDocs(imagesQuery);

            const imagesData = [];

            for (const docSnapshot of imagesSnapshot.docs) {
                const [imageName, ownerId] = docSnapshot.id.split('_');

                if (ownerId === userId) {
                    const imageDocRef = doc(db, 'ImageLinks', imageName);
                    const imageDocSnapshot = await getDoc(imageDocRef);

                    if (imageDocSnapshot.exists()) {
                        const imageData = imageDocSnapshot.data();
                        imagesData.push({
                            imageName: imageName,
                            ImageURL: imageData.ImageURL
                        });
                    } else {
                        console.log(`Image with name '${imageName}' not found in ImageLinks collection.`);
                    }
                }
            }

            images.value = imagesData;
            console.log(`${viewType.value} images:`, imagesData);
        } catch (error) {
            console.error(`Error fetching user ${viewType.value} images:`, error);
        }
    }

    onMounted(() => {
        currentUser.value = auth.currentUser;
        if (currentUser.value) {
            fetchUserImages();
        }
    });
</script>

<style scoped>
    .user-liked-disliked-images {
        background-color: #000; /* Black background */
        color: #fff; /* White text */
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); /* White shadow for contrast */
        padding: 20px;
    }

        .user-liked-disliked-images h2 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #fff; /* Ensure headings are also white */
        }

    .selector {
        margin-bottom: 20px;
    }

        .selector label {
            font-weight: bold;
            margin-right: 10px;
            color: #fff; /* White text for labels */
        }

        .selector select {
            padding: 8px;
            border-radius: 5px;
            border: 1px solid #444; /* Dark gray border for dark theme */
            background-color: #222; /* Dark background for the dropdown */
            color: #fff; /* White text for the dropdown */
        }

    .image-container {
        max-height: 400px; /* Set a fixed height */
        overflow-y: auto; /* Enable vertical scrolling */
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        padding: 10px 0; /* Add padding to prevent images from sticking to the container edges */
    }

    .image-item {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative; /* Ensure the position is relative for overlays */
        border: 1px solid #000; /* Black border for image items */
    }

    .image {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); /* White shadow for contrast */
    }

    .image-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.7); /* Dark overlay for readability */
        color: #fff; /* White text for the overlay */
        padding: 8px;
        font-size: 12px;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .image-item:hover .image-overlay {
        opacity: 1;
    }
</style>

