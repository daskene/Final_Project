<template>
  <div>
    <label>Enter the name of the image to delete:</label>
    <input v-model="imageNameToDelete" type="text">
    <!-- Button to delete art -->
    <button @click="deleteArt">Delete Art</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { db } from '@/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const imageNameToDelete = ref('');

async function deleteArt() {
  const name = imageNameToDelete.value.trim();

  try {
    if (name === '') {
      alert('Please enter the name of the image to delete.');
      return;
    }

    // Constructing the document reference
    const artDocRef = doc(db, 'ImageLinks/' + name);

    // Deleting the document
    await deleteDoc(artDocRef);

    // Informing the user
    alert('Art deleted successfully!');
  } catch (error) {
    console.error('Error deleting art:', error);
    alert('Failed to delete art. Please try again.');
  }
}
</script>
