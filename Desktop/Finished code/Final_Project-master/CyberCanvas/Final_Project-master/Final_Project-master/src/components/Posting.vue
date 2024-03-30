<template>
    <div class="posting-container">
        <h2>Submit Your Artwork</h2>
        <form @submit.prevent="uploadImage">
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="imageName" required>
            </div>
            <div class="form-group">
                <label for="artist">Artist:</label>
                <input type="text" id="artist" v-model="artist" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="descript" required></textarea>
            </div>
            <div class="form-group">
                <label for="genre">Genre:</label>
                <select id="genre" v-model="genre" required>
                    <option value="Abstract">Abstract</option>
                    <option value="Landscape">Landscape</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Contemporary">Contemporary</option>
                    <option value="Photography">Photography</option>
                    <option value="StillLife">Still Life</option>
                    <option value="Impressionism">Impressionism</option>
                </select>
            </div>
            <div class="form-group">
                <label for="image">Add Art:</label>
                <input type="file" id="image" @change="handleFileInputChange" required>
            </div>
            <button v-if="isEmailVerified" type="submit">Submit Artwork</button>
            <p v-else>Verify Email to upload artwork</p>
        </form>

        <div v-if="uploadStatus" class="modal is-active">
            <div class="modal-background" @click="closeModal"></div>
            <div class="modal-card">
                <section class="modal-card-body">
                    {{ uploadStatus }}
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="closeModal">OK</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
    import { db } from '@/firebase';
    import { doc, setDoc } from 'firebase/firestore';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';

    const imageName = ref('');
    const artist = ref('');
    const genre = ref('');
    const descript = ref('');
    const files = ref([]);
    const uploadStatus = ref('');
    const uploadSuccess = ref(false);
    const isEmailVerified = ref(false);
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            isEmailVerified.value = user.emailVerified;
        }
    });

    async function uploadImage() {
        if (!files.value[0]) {
            uploadStatus.value = 'No file selected.';
            return;
        }

        const imageExtension = files.value[0].name.split('.').pop();
        const ImgToUpload = files.value[0];
        const ImgName = imageName.value + '.' + imageExtension;

        const storage = getStorage();
        const storageRef = sRef(storage, 'Unverified/' + ImgName); // Upload to the "Unverified" folder

        const UploadTask = uploadBytesResumable(storageRef, ImgToUpload);

        UploadTask.on('state-changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploadStatus.value = `Upload ${progress.toFixed(2)}% complete.`;
        }, (error) => {
            uploadStatus.value = 'Error: image not uploaded!';
            console.error('Upload error:', error);
        }, async () => {
            const downloadURL = await getDownloadURL(UploadTask.snapshot.ref);
            saveURLtoFirestore(downloadURL);
            uploadSuccess.value = true;
            uploadStatus.value = 'Artwork submitted successfully! An Admin will verify your upload soon!';
            resetForm();
        });
    }

    async function saveURLtoFirestore(url) {
        const firestoreRef = doc(db, 'Unverified', imageName.value); // Save to the "Unverified" collection

        await setDoc(firestoreRef, {
            ImageName: imageName.value,
            ImageURL: url,
            Artist: artist.value,
            Genre: genre.value,
            Description: descript.value,
            Likes: 0,
            Dislikes: 0
        });

        console.log('Image data uploaded to the "Unverified" collection!');
    }

    function resetForm() {
        imageName.value = '';
        artist.value = '';
        genre.value = '';
        descript.value = '';
        files.value = [];
    }

    function handleFileInputChange(event) {
        uploadSuccess.value = false; // Reset success status on new file input
        const selectedFile = event.target.files[0];
        files.value = [selectedFile];
    }

    function closeModal() {
        uploadStatus.value = '';  // Clear the status message
        uploadSuccess.value = false;  // Reset the success status
    }
</script>

<style scoped>
    .posting-container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        background-color: #000; /* Black background */
        color: #fff; /* White text */
        border-radius: 10px; /* Rounded edges */
        box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.2); 
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        font-weight: bold;
    }

    input, textarea, select {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        background-color: #333; /* Darker background for inputs */
        color: #fff; /* White text for inputs */
        border-radius: 4px; /* Slightly rounded edges for inputs */
        border: 1px solid #555; /* Subtle border for inputs */
    }

    button {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

        button:hover {
            background-color: #0056b3;
        }

    .modal {
        position: fixed;
        z-index: 1000; 
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8); /* Dimmed background */
        z-index: 1000; /* Ensure this is below the modal card */
    }

    .modal-card {
        background: #222; /* Dark background for the modal card */
        color: #FFF; /* White text for contrast */
        border-radius: 5px;
        max-width: 500px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 1001; /* Above the modal background */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .modal-card-body {
        padding: 20px;
        text-align: center;
    }

    .modal-card-foot {
        padding: 10px 20px;
        text-align: center;
        border-top: 1px solid #ddd;
    }

    .button.is-success {
        background-color: #48c774;
        color: #FFF;
        border: none;
        cursor: pointer;
        margin: 0 auto;
    }

        .button.is-success:hover {
            background-color: #36ab68;
        }
</style>
