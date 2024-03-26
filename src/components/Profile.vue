<template>
    <div class="profile-page">
        <div class="profile-container">
            <h2 class="profile-title">Profile</h2>
            <div class="image-upload-container">
                <div v-if="imageSrc" class="image-preview-container">
                    <img :src="imageSrc" class="profile-image" alt="Profile Preview">
                </div>
                <label v-if="imageSrc" for="profile-image" class="image-upload-label">Change Image</label>
                <input type="file" id="profile-image" @change="onImageChange" accept="image/*">
            </div>


            <form @submit.prevent="submitProfile" class="profile-form">
                <div class="input-group">
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" v-model="user.firstName" placeholder="Enter your first name">
                </div>

                <div class="input-group">
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" v-model="user.lastName" placeholder="Enter your last name">
                </div>

                <div class="input-group">
                    <label for="dob">Date of Birth:</label>
                    <input type="date" id="dob" v-model="user.dob">
                </div>

                <div class="input-group">
                    <label for="gender">Gender:</label>
                    <select id="gender" v-model="user.gender">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div class="input-group">
                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" v-model="user.phone" placeholder="Enter your phone number">
                </div>

                <button type="submit" class="save-button">Save Changes</button>
            </form>
        </div>
    </div>
</template>



<>

    <script>
        import {ref} from 'vue';
        import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';

        export default {
            data() {
        return {
            user: {
            firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        phone: '',
        profilePicture: ''
            },
        imageSrc: null,
        };
    },
        async mounted() {
            this.fetchDefaultProfileImage();
    },
        methods: {
            async fetchDefaultProfileImage() {
            const storage = getStorage();
        const defaultImageRef = storageRef(storage, 'Image/Profile-Icon.png'); // Path to your default image
        const defaultImageUrl = await getDownloadURL(defaultImageRef);
        this.imageSrc = defaultImageUrl;
        },
        onImageChange(event) {
            const files = event.target.files;
        if (files && files[0]) {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
            this.imageSrc = e.target.result;
                };
        fileReader.readAsDataURL(files[0]);

        // Upload the new image to Firebase Storage
        const storage = getStorage();
        const fileRef = storageRef(storage, `profile_pictures/${files[0].name}`);
                uploadBytes(fileRef, files[0]).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                this.user.profilePicture = url;
                // Optionally, save the URL in your user's database record
            });
                });
            }
        },
        submitProfile() {
                console.log('Profile changes saved', this.user);


                const userProfile = {
                    ...this.user,
                    // Filter out empty values if you want them to remain unchanged in the database
                };

                // connect to user id
                db.collection('users').doc(this.userId).set(userProfile, { merge: true })
                    .then(() => {
                        console.log("Profile successfully updated!");
                    })
                    .catch((error) => {
                        console.error("Error updating profile: ", error);
                    });
            },

        },
    };
</script>

<style scoped>
    .profile-page {
        display: flex;
        justify-content: center; /* Centers horizontally */
        align-items: center; /* Centers vertically */
        min-height: 100vh; /* At least the height of the viewport */
        padding: 20px;
        box-sizing: border-box;
    }

    .profile-container {
        background-color: #000; /* Set the background color to black */
        color: #fff; /* Change the text color to white for better contrast */
        border-radius: 15px;
        padding: 40px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* Adjusted for a more subtle effect on black */
        max-width: 600px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }


    .image-preview-container {
        width: 200px; /* Equal width and height for a circle */
        height: 200px;
        border-radius: 50%; /* Circular border-radius */
        overflow: hidden;
        margin: auto;
        margin-bottom: 20px; /* Space above the add image label */
    }

    .profile-image {
        width: 100%;
        height: 100%;
        object-fit: cover; /* This will cover the area without stretching the image */
    }

    .input-group label {
        display: block;
        text-align: center; /* Center align the labels */
        margin-bottom: 10px;
    }

    .input-group input,
    .input-group select,
    .save-button {
        width: 100%; /* Full width */
        padding: 12px; /* Increased padding for better touch */
        margin-bottom: 20px; /* Increased margin for more space between inputs */
        border-radius: 5px;
        text-align: center; /* Center the text in inputs and button */
    }

    .save-button {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px; /* Adjust font size as needed */
        margin-top: 20px; /* Space above the button */
        transition: background-color 0.3s ease; /* Smooth transition for hover effect */
    }

        .save-button:hover {
            background-color: #45a049;
        }

    .image-upload-label {
        display: block; /* Change to block for better spacing */
        background-color: #4CAF50; /* Stylish green background */
        color: #fff; /* White text */
        text-align: center;
        padding: 10px 20px;
        border-radius: 5px;
        margin: 20px auto; /* Center label and add space around */
        cursor: pointer;
        width: fit-content; /* Adjust the width to fit the content */
    }

    @media (max-width: 640px) {
        .profile-container {
            padding: 20px;
            max-width: 90%;
        }
    }
</style>
