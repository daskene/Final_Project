<template>
    <div class="posting-container">
        <div>
            <label for="delete-title">Enter the name of the image to delete:</label>
            <input id="delete-title" v-model="imageNameToDelete" type="text">
            <button @click="showDeleteConfirmation">Delete Art</button>
        </div>

        <!-- Deletion Confirmation Modal -->
        <div v-if="showDeleteModal" class="modal is-active">
            <div class="modal-background" @click="closeDeleteModal"></div>
            <div class="modal-card">
                <section class="modal-card-body">
                    Are you sure you want to delete this image?
                    <div v-if="imageToDeleteUrl" class="image-preview">
                        <img :src="imageToDeleteUrl" alt="Art to delete" />
                    </div>
                    {{ deletionMessage }}
                </section>
                <footer class="modal-card-foot">
                    <button v-if="!deletionConfirmed" class="button is-danger" @click="deleteArt">Confirm Delete</button>
                    <button class="button" @click="closeDeleteModal">{{ deletionConfirmed ? 'Close' : 'Cancel' }}</button>
                </footer>
            </div>
        </div>
    </div>
</template>



<script setup>
    import { ref } from 'vue';
    import { db } from '@/firebase';
    import { doc, deleteDoc, getDoc } from 'firebase/firestore';

    const imageNameToDelete = ref('');
    const showDeleteModal = ref(false);
    const imageToDeleteUrl = ref(null);
    const deletionMessage = ref('');
    const deletionConfirmed = ref(false);

    async function showDeleteConfirmation() {
        const name = imageNameToDelete.value.trim();

        if (name) {
            const artDocRef = doc(db, 'ImageLinks/' + name);
            const docSnap = await getDoc(artDocRef);

            if (docSnap.exists()) {
                imageToDeleteUrl.value = docSnap.data().ImageURL;
               
                showDeleteModal.value = true;
            } else {
                imageToDeleteUrl.value = null;
                deletionMessage.value = 'Image not found. Please check the name and try again.';
                showDeleteModal.value = true; // Even if not found, show modal to give feedback
            }
        } else {
            deletionMessage.value = 'Please enter the name of the image to delete.';
            showDeleteModal.value = true; // Show modal to give feedback
        }
    }

    async function deleteArt() {
        const name = imageNameToDelete.value.trim();

        if (name) {
            const artDocRef = doc(db, 'ImageLinks/' + name);

            // Check if the document actually exists before deleting
            const docSnap = await getDoc(artDocRef);
            if (docSnap.exists()) {
                await deleteDoc(artDocRef);
                deletionMessage.value = 'Art deleted successfully!';
                deletionConfirmed.value = true;
            } else {
                deletionMessage.value = 'Error: Art not found or already deleted.';
            }
        }

        // Reset only after confirming modal closure
        // Consider refreshing data or redirecting the user after deletion
    }

    function closeDeleteModal() {
        showDeleteModal.value = false;
        if (deletionConfirmed.value) {
            imageNameToDelete.value = ''; // Reset after confirming deletion
            imageToDeleteUrl.value = null; // Clear the image preview
            deletionConfirmed.value = false; // Reset the deletion confirmation
        }
        // Otherwise, consider keeping the data until the user manually closes or confirms deletion
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

    .button.is-danger {
        background-color: #ff3860; /* Red color for the delete button */
    }

        .button.is-danger:hover {
            background-color: #e82c4d; /* A darker red on hover */
        }

    /* Style for the cancel button if you wish to differentiate it */
    .button:not(.is-danger) {
        background-color: #555; /* A neutral color for cancel */
        color: #fff;
    }

        .button:not(.is-danger):hover {
            background-color: #6c757d; /* A slightly lighter grey on hover */
        }

    .image-preview img {
        max-width: 100%;
        max-height: 200px; /* Adjust based on your preference */
        margin-top: 20px;
        border-radius: 5px; /* Optional for rounded corners */
    }
</style>
