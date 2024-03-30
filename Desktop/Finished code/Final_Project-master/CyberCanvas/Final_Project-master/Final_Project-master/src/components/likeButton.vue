<template>
  <div class="like-buttons-container">
    <div v-if="currentUser">
      <!-- Like button with conditional class -->
      <button @click="toggleLike" :class="{ liked: isLiked }">Like {{ likeCount }}</button>
      <!-- Dislike button with conditional class -->
      <button @click="toggleDislike" :class="{ disliked: isDisliked }">Dislike {{ dislikeCount }}</button>
    </div>
    <div v-else>
      <p>Login to like or dislike images</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase';

const props = defineProps({
  imageName: String,
});

const auth = getAuth();

const currentUser = ref(null);
const likeCount = ref(0);
const dislikeCount = ref(0);
const isLiked = ref(false);
const isDisliked = ref(false);

async function fetchLikeStatus() {
  try {
    const docSnap = await getDoc(doc(db, 'ImageLinks/' + props.imageName));
    if (docSnap.exists()) {
      likeCount.value = docSnap.data().Likes || 0;
      dislikeCount.value = docSnap.data().Dislikes || 0;
      if (currentUser.value) {
        const likeDocSnap = await getDoc(doc(db, 'Likes', `${props.imageName}_${currentUser.value.uid}`));
        if (likeDocSnap.exists()) {
          isLiked.value = likeDocSnap.data().liked === true;
          isDisliked.value = likeDocSnap.data().disliked === true;
        } else {
          isLiked.value = false;
          isDisliked.value = false;
        }
      }
    }
  } catch (error) {
    console.error('Error fetching like status:', error);
  }
}

onMounted(() => {
  fetchLikeStatus();

  onAuthStateChanged(auth, (user) => {
    currentUser.value = user;
  });
});
async function toggleLike() {
  if (currentUser.value) {
    const likeDocRef = doc(db, 'Likes', `${props.imageName}_${currentUser.value.uid}`);

    try {
      const likeDocSnap = await getDoc(likeDocRef);
      if (!likeDocSnap.exists() || !likeDocSnap.data().liked) {
        if (isDisliked.value) {
          await updateLikeStatus(likeDocRef, true, 1, false);
          isDisliked.value = false;
          dislikeCount.value -= 1;
        }
        await updateLikeStatus(likeDocRef, true, isLiked.value ? -1 : 1, true);
        isLiked.value = !isLiked.value;
        likeCount.value += isLiked.value ? 1 : -1;
      } else {
        // Toggle off the like button
        await updateLikeStatus(likeDocRef, false, -1, true);
        isLiked.value = false;
        likeCount.value -= 1;

        // Update liked and disliked to false in the database
        await setDoc(likeDocRef, { liked: false, disliked: false });

        // Update the like count in the database
        const imageDocRef = doc(db, 'ImageLinks', props.imageName);
        await updateDoc(imageDocRef, { Likes: likeCount.value, Dislikes: dislikeCount.value });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  } else {
    console.log('Please log in to interact with images');
  }
}


async function toggleDislike() {
  if (currentUser.value) {
    const likeDocRef = doc(db, 'Likes', `${props.imageName}_${currentUser.value.uid}`);

    try {
      const likeDocSnap = await getDoc(likeDocRef);
      if (!likeDocSnap.exists() || !likeDocSnap.data().disliked) {
        if (isLiked.value) {
          await updateLikeStatus(likeDocRef, false, -1, true);
          isLiked.value = false;
          likeCount.value -= 1;
        }
        await updateLikeStatus(likeDocRef, false, isDisliked.value ? -1 : 1, true);
        isDisliked.value = !isDisliked.value;
        dislikeCount.value += isDisliked.value ? 1 : -1;
      } else {
        // Toggle off the dislike button
        await updateLikeStatus(likeDocRef, false, -1, false);
        isDisliked.value = false;
        dislikeCount.value -= 1;

        // Update liked and disliked to false in the database
        await setDoc(likeDocRef, { liked: false, disliked: false });

        // Update the like count in the database
        const imageDocRef = doc(db, 'ImageLinks', props.imageName);
        await updateDoc(imageDocRef, { Likes: likeCount.value, Dislikes: dislikeCount.value });
      }
    } catch (error) {
      console.error('Error toggling dislike:', error);
    }
  } else {
    console.log('Please log in to interact with images');
  }
}




async function updateLikeStatus(likeDocRef, liked, increment, isLike) {
  const imageDocRef = doc(db, 'ImageLinks', props.imageName);
  const imageSnapshot = await getDoc(imageDocRef);
  const currentLikes = imageSnapshot.data().Likes || 0;
  const currentDislikes = imageSnapshot.data().Dislikes || 0;

  try {
    if (isLike) {
      await setDoc(likeDocRef, { liked: liked, disliked: !liked });
      await updateDoc(imageDocRef, { Likes: currentLikes + (liked ? increment : 0), Dislikes: currentDislikes + (liked ? 0 : increment) });
    } else {
      await setDoc(likeDocRef, { liked: false, disliked: false });
      await updateDoc(imageDocRef, { Likes: currentLikes + (liked ? increment : 0), Dislikes: currentDislikes + (liked ? 0 : increment) });
    }
  } catch (error) {
    console.error('Error updating like status:', error);
  }
}
</script>

<style scoped>
/* Your component styles here */

.like-buttons-container {
  display: flex;
  align-items: center;
}

button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  opacity: 0.8;
}

button.liked {
  background-color: #4CAF50; /* Green */
  color: white;
}

button.disliked {
  background-color: #FF5733; /* Red */
  color: white;
}
</style>
