<template>
    <div class="profile-page">
        <div class="profile-container">
            <h2 class="profile-title">Profile</h2>
            <div class="image-upload-container">
                <!-- Display profile picture -->
                <div class="image-preview-container">
                    <img :src="user.profilePicture" class="profile-image" alt="Profile Preview">
                </div>
                <!-- Input for selecting a file -->
                <input type="file" id="profile-image" @change="onImageChange" accept="image/*">
            </div>



            <!-- Rest of the form -->
            <form @submit.prevent="submitProfile" class="profile-form">
                <div class="input-group">
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" v-model="user.firstName" placeholder="Enter your first name" class="input-field">
                </div>

                <div class="input-group">
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" v-model="user.lastName" placeholder="Enter your last name" class="input-field">
                </div>

                <div class="input-group">
                    <label for="dob">Date of Birth:</label>
                    <input type="date" id="dob" v-model="user.dob" class="input-field">
                </div>

                <div class="input-group">
                    <label for="gender">Gender:</label>
                    <select id="gender" v-model="user.gender" class="input-field">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div class="input-group">
                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" v-model="user.phoneNo" placeholder="Enter your phone number" class="input-field">
                </div>

                <button type="submit" class="save-button">Save Changes</button>
            </form>
        </div>
    </div>
</template>


<script>
    import { ref } from 'vue';
    import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { db } from '@/firebase';
    import { doc, updateDoc, getDoc } from "firebase/firestore";
    import { getAuth } from "firebase/auth";

    export default {
        data() {
            return {
                user: {
                    firstName: '',
                    lastName: '',
                    dob: '',
                    gender: '',
                    phoneNo: '',
                    profilePicture: ''
                },
                imagePreview: '' // Store image preview URL
            };
        },
        async mounted() {
            await this.fetchUserData(); // Fetch user data including profile picture
        },
        watch: {
            user: {
                handler(newValue) {
                    // If user data is changed, set the form fields to new values
                    this.user = newValue;
                },
                deep: true // Watch for nested changes in the user object
            }
        },
        methods: {
            async fetchUserData() {
                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        // Populate the user object with the retrieved data
                        this.user = { ...this.user, ...userData };
                        if (this.user.profilePicture) {
                            // If profile picture exists, get its download URL
                            const storage = getStorage();
                            const fileRef = storageRef(storage, this.user.profilePicture);
                            getDownloadURL(fileRef).then((url) => {
                                this.user.profilePicture = url;
                            }).catch((error) => {
                                console.error("Error getting profile picture download URL:", error);
                            });
                        }
                    }
                }
            },

            onImageChange(event) {
                const files = event.target.files;
                if (files && files[0]) {
                    const fileReader = new FileReader();
                    fileReader.onload = (e) => {
                        this.imagePreview = e.target.result; // Set image preview
                    };
                    fileReader.readAsDataURL(files[0]);

                    const storage = getStorage();
                    const fileRef = storageRef(storage, `profile_pictures/${files[0].name}`);
                    uploadBytes(fileRef, files[0]).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((url) => {
                            this.user.profilePicture = url; // Update user profile picture
                        });
                    }).catch((error) => {
                        console.error("Error uploading profile picture:", error);
                    });
                }
            },
            submitProfile() {
                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);
                    updateDoc(userDocRef, {
                        firstName: this.user.firstName,
                        lastName: this.user.lastName,
                        dob: this.user.dob,
                        gender: this.user.gender,
                        phoneNo: this.user.phoneNo,
                        profilePicture: this.user.profilePicture
                    }).then(() => {
                        console.log("Profile successfully updated!");
                    }).catch((error) => {
                        console.error("Error updating profile: ", error);
                    });
                } else {
                    console.error("No user is currently logged in.");
                }
            }
        }
    };
</script>




<style scoped>
    .profile-page {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        background-color: #000; /* Black background */
    }

    .profile-container {
        background-color: #333; /* Dark grey background */
        color: #fff; /* White text */
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* Darker shadow for contrast */
        width: 80%;
        max-width: 600px;
        border: 1px solid #000; /* Black border for the container */
    }

    .profile-title {
        font-size: 32px;
        color: #fff; /* White text */
        margin-bottom: 20px;
    }

    .image-upload-container {
        text-align: center;
        margin-bottom: 20px;
    }

    .image-preview-container {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        margin-bottom: 20px;
        border: 5px solid #000; /* Black border for the image container */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Darker shadow for contrast */
    }

    .profile-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .input-group {
        margin-bottom: 20px;
    }

        .input-group label {
            font-size: 18px;
            color: #fff; /* White text */
            margin-bottom: 10px;
        }

    .input-field {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #555; /* Adjusting to a darker theme, keep or change to #000 if needed */
        background-color: #222; /* Dark background for the input field */
        color: #fff; /* White text for the input field */
        font-size: 16px;
    }

        .input-field:focus {
            outline: none;
            border-color: #3273dc; /* Blue focus border */
        }

    .save-button {
        background-color: #3273dc;
        color: #fff;
        padding: 12px 24px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-size: 18px;
    }

        .save-button:hover {
            background-color: #2257b8;
        }
</style>

