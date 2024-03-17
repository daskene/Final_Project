<template>
  <div>
    <label>Image Name</label>
    <input type="text" v-model="imageName">
    <label>{{ imageExtension }}</label> <br><br>

    <img :src="imageSrc" alt="Uploaded Image">
    <label>{{ uploadProgress }}</label> <br> <br>

    <button @click="selectImage">Select Image</button>
    <button @click="uploadImage">Upload Image</button>
    <button @click="retrieveImage">Retrieve Image</button>
    <!-- Hidden input element for selecting files -->
    <input ref="fileInput" type="file" style="display: none;" @change="handleFileInputChange">
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db } from '@/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const imageName = ref('');
const imageExtension = ref('');
const imageSrc = ref('');
const uploadProgress = ref('');

const files = ref([]);
const reader = new FileReader();

const fileInput = ref(null); // Define a ref for the file input element

function getFileExt(file) {
  const temp = file.name.split('.');
  const ext = temp.slice((temp.length - 1), (temp.length));
  return '.' + ext[0];
}

function getFileName(file) {
  const temp = file.name.split('.');
  const fname = temp.slice(0, -1).join('.');
  return fname;
}

async function uploadImage() {
  const ImgToUpload = files.value[0];

  const ImgName = imageName.value + imageExtension.value;

  const metaData = {
    contentType: ImgToUpload.type
  };

  const storage = getStorage();
  const storageRef = sRef(storage, 'Image/' + ImgName);

  const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

  UploadTask.on('state-changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    uploadProgress.value = `Upload ${progress.toFixed(2)}%`;
  }, (error) => {
    alert('error: image not uploaded!');
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
    ImageName: (name + ext),
    ImageURL: url
  });
}

async function retrieveImage() {
  console.log('Retrieve Image button clicked');
  const name = imageName.value;

  const firestoreRef = doc(db, 'ImageLinks/' + name);

  const docSnap = await getDoc(firestoreRef);

  if (docSnap.exists()) {
    imageSrc.value = docSnap.data().ImageURL;
    console.log('Image URL:', docSnap.data().ImageURL);
  } else {
    console.log('Image not found');
  }
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

reader.onload = function () {
  imageSrc.value = reader.result;
}
</script>

<style scoped>
img {
  height: 200px;
  width: 200px;
  border: 7px black;
}
</style>
