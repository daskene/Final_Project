<template>
  <div>
    <div class="field is-grouped">
      <p class="control is-expanded">
        <div class="field has-addons">
          <p class="control">
            <button @click="selectImage" type="button" class="button">Select Image</button>
            <!-- Hidden input element for selecting files -->
            <input ref="fileInput" type="file" style="display: none;" @change="handleFileInputChange">
          </p>
          <p class="control">
            <input v-model="artist" class="input" type="text" placeholder="Artist Name">
          </p>
          <p class="control">
            <input v-model="descript" class="input" type="text" placeholder="Description">
          </p>
          <p class="control">
            <div class="dropdown" :class="{ 'is-active': dropdownOpen }">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="toggleDropdown">
                  <span>{{ selectedGenre || 'Genre' }}</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a @click.prevent.stop="setGenre('Abstract')" class="dropdown-item">Abstract</a>
                  <a @click.prevent.stop="setGenre('Landscape')" class="dropdown-item">Landscape</a>
                  <a @click.prevent.stop="setGenre('Portrait')" class="dropdown-item">Portrait</a>
                  <a @click.prevent.stop="setGenre('Contemporary')" class="dropdown-item">Contemporary</a>
                  <a @click.prevent.stop="setGenre('Photography')" class="dropdown-item">Photography</a>
                  <a @click.prevent.stop="setGenre('Still Life')" class="dropdown-item">Still Life</a>
                  <a @click.prevent.stop="setGenre('Impressionism')" class="dropdown-item">Impressionism</a>
                </div>
              </div>
            </div>
          </p>
        </div>
      </p>
      <p class="control">
        <button @click.prevent="uploadImage" class="button is-info">Upload Image!</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

const imageName = ref('');
const imageExtension = ref('');
const artist = ref('');
const genre = ref('');
const descript = ref('');
const files = ref([]);
const reader = new FileReader();

const fileInput = ref(null); // Define a ref for the file input element
const dropdownOpen = ref(false); // Track whether the dropdown is open

function getFileExt(file) {
  const temp = file.name.split('.');
  const ext = temp[temp.length - 1];
  return '.' + ext;
}

function getFileName(file) {
  const temp = file.name.split('.');
  const fname = temp.slice(0, -1).join('.');
  return fname;
}

async function uploadImage() {
  const ImgToUpload = files.value[0];
  const ImgName = imageName.value + imageExtension.value;

  const storage = getStorage();
  const storageRef = sRef(storage, 'Image/' + ImgName);

  const UploadTask = uploadBytesResumable(storageRef, ImgToUpload);

  UploadTask.on('state-changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`Upload ${progress.toFixed(2)}%`);
  }, (error) => {
    alert('Error: image not uploaded!');
  }, () => {
    getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
      saveURLtoFirestore(downloadURL);
    });
  });
}

async function saveURLtoFirestore(url) {
  const name = imageName.value;
  const ext = imageExtension.value;

  const firestoreRef = doc(db, 'ImageLinks/' + name);

  await setDoc(firestoreRef, {
    ImageName: name + ext,
    ImageURL: url,
    Artist: artist.value,
    Genre: genre.value,
    Likes: 0,
    Description: descript.value
  });

  console.log('Image data uploaded to Firestore!');
}

function selectImage() {
  // Trigger file input click event
  fileInput.value.click(); // Accessing click method from fileInput
}

function handleFileInputChange(event) {
  const selectedFile = event.target.files[0];
  files.value = [selectedFile];

  const extension = getFileExt(selectedFile);
  const name = getFileName(selectedFile);

  imageName.value = name;
  imageExtension.value = extension;

  reader.readAsDataURL(selectedFile);
}

function setGenre(selectedGenre) {
  genre.value = selectedGenre;
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

const selectedGenre = ref('');

watch(genre, (newValue) => {
  selectedGenre.value = newValue;
});

</script>

<style scoped>
@import 'bulma/css/bulma.css';
</style>
