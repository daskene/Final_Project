<template>
    <div class="profile-page">
        <div class="profile-container">
            <div class="image-upload-container">
                <input type="file" @change="onImageChange" accept="image/*">
                <div v-if="imageSrc" class="image-preview-container">
                    <img :src="imageSrc" class="profile-image" alt="Profile Preview">
                </div>
            </div>

            <form @submit.prevent="submitProfile" class="profile-form">
                <div class="input-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="user.name" placeholder="Enter your name">
                </div>
                <div class="input-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="user.email" placeholder="Enter your email">
                </div>
                <button type="submit" class="save-button">Save Profile</button>
            </form>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                user: {
                    name: '',
                    email: ''
                },
                imageSrc: '', // Initialize without a default image
            };
        },
        methods: {
            onImageChange(event) {
                const files = event.target.files;
                if (files && files[0]) {
                    const fileReader = new FileReader();
                    fileReader.onload = (e) => {
                        this.imageSrc = e.target.result; // Update image source to the uploaded file
                    };
                    fileReader.readAsDataURL(files[0]);
                }
            },
            submitProfile() {
                console.log('Profile submitted', this.user);
                // Add logic to handle profile data submission, including the image
            },
        },
    };
</script>

<style scoped>
    .profile-page {
        display: flex;
        justify-content: center;
        padding: 20px;
    }

    .profile-container {
        background-color: #f3f3f3;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        max-width: 500px;
        width: 100%;
        display: flex; /* Make it a flex container */
        flex-direction: column; /* Stack children vertically */
        align-items: center; /* Center children horizontally */
    }

    .image-upload-container {
        width: 100%; /* Full width to center the content */
        text-align: center;
    }

    .image-preview-container {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 20px; /* Add some space below the image */
    }

    .profile-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    .input-group {
        width: 100%; /* Full width to align with the container */
        margin: 15px 0;
    }

    .profile-form {
        width: 100%; /* Full width to align with the container */
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .save-button {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 20px;
    }

        .save-button:hover {
            background-color: #45a049;
        }
</style>
