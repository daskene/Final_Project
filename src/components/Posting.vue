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
                    <option value="Still Life">Still Life</option>
                    <option value="Impressionism">Impressionism</option>
                </select>
            </div>
            <div class="form-group">
                <label for="image">Add Art:</label>
                <input type="file" id="image" @change="handleFileInputChange" required>
            </div>
            <button type="submit">Submit Artwork</button>
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

    const imageName = ref('');
    const artist = ref('');
    const genre = ref('');
    const descript = ref('');
    const files = ref([]);
    const uploadStatus = ref('');
    const uploadSuccess = ref(false);

    async function uploadImage() {
        if (!files.value[0]) {
            uploadStatus.value = 'No file selected.';
            return;
        }

        const imageExtension = files.value[0].name.split('.').pop();
        const ImgToUpload = files.value[0];
        const ImgName = imageName.value + '.' + imageExtension;

        const storage = getStorage();
        const storageRef = sRef(storage, 'Image/' + ImgName);

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
            uploadStatus.value = 'Artwork submitted successfully!';
            resetForm();
        });
    }

    async function saveURLtoFirestore(url) {
        const firestoreRef = doc(db, 'ImageLinks/' + imageName.value);

        await setDoc(firestoreRef, {
            ImageName: imageName.value,
            ImageURL: url,
            Artist: artist.value,
            Genre: genre.value,
            Description: descript.value,
            Likes: 0,
            Dislikes: 0
        });

        console.log('Image data uploaded!');
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
        console.log('closeModal called'); // Add this to check if the function is being called
        uploadStatus.value = '';  // Clear the status message
        uploadSuccess.value = false;  // Reset the success status
        
    }

</script>



<style scoped>
    .posting-container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
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
        z-index: 1000; /* This should be high enough to be on top of other elements */
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
        background: #000; /* Black background for the modal card */
        color: #FFF; /* White text for contrast */
        border-radius: 5px;
        max-width: 500px; /* Adjust the width as needed */
        margin: auto; /* Center the modal vertically and horizontally */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 1001; /* Above the modal background */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: adds a shadow for depth */
    }

    .modal-card-body {
        padding: 20px;
        text-align: center; /* Center the text */
    }

    .modal-card-foot {
        padding: 10px 20px;
        text-align: center; /* Center the OK button */
        border-top: 1px solid #ddd; /* Light border for visual separation, can change if needed */
    }

    .button.is-success {
        background-color: #48c774; /* The OK button color */
        color: #FFF; /* The OK button text color */
        border: none; /* Remove border */
        cursor: pointer; /* Pointer cursor on hover */
        margin: 0 auto; /* Center button in the footer */
    }

        .button.is-success:hover {
            background-color: #36ab68; /* Darken button on hover */
        }
</style>
