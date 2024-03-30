<template>
  <div>
    <div class="admin-page" v-if="isAdmin">
      <h2>Unverified Artwork</h2>
      <div v-for="artwork in unverifiedArtwork" :key="artwork.id" class="artwork-box">
        <!-- Display image -->
        <div class="image-container">
          <img :src="artwork.ImageURL" :alt="artwork.ImageName" class="artwork-image">
        </div>

        <!-- Display artwork information -->
        <div class="artwork-info">
          <h3>{{ artwork.ImageName }}</h3>
          <p>Artist: {{ artwork.Artist }}</p>
          <p>Description: {{ artwork.Description }}</p>
        </div>

        <!-- Buttons for verification and deletion -->
        <div class="button-container">
          <button @click="verifyArtwork(artwork.id)" class="verify-button">Verify</button>
          <button @click="deleteArtwork(artwork.id)" class="delete-button">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { ref, onMounted } from 'vue';
import { onSnapshot, collection, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from "firebase/auth";

const auth = getAuth();

export default {
  data() {
    return {
      unverifiedArtwork: [],
      isAdmin: false
    };
  },
  created() {
    this.fetchUnverifiedArtwork();
  },
  methods: {
    fetchUnverifiedArtwork() {
      const unverifiedArtworkRef = collection(db, 'Unverified');
      onSnapshot(unverifiedArtworkRef, (snapshot) => {
        this.unverifiedArtwork = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
      }, (error) => {
        console.error('Error fetching unverified artwork:', error);
      });
    },

    async verifyArtwork(artworkId) {
      try {
        console.log('Verifying artwork with ID:', artworkId);
        const artworkRef = doc(db, 'Unverified', artworkId);
        console.log('Artwork reference:', artworkRef);

        onSnapshot(artworkRef, (snapshot) => {
          const artworkData = snapshot.data();
          if (artworkData) {
            setDoc(doc(db, 'ImageLinks', artworkId), artworkData)
                .then(() => {
                  deleteDoc(artworkRef)
                      .then(() => {
                        console.log('Artwork verified and deleted successfully!');
                      })
                      .catch((error) => {
                        console.error('Error deleting artwork:', error);
                      });
                })
                .catch((error) => {
                  console.error('Error setting artwork data:', error);
                });
          } else {
            console.error('Artwork data not found');
          }
        });
      } catch (error) {
        console.error('Error verifying artwork:', error);
      }
    },


    async deleteArtwork(artworkId) {
      try {
        const artworkRef = doc(db, 'Unverified', artworkId);
        await deleteDoc(artworkRef);
        console.log('Artwork deleted successfully!');
      } catch (error) {
        console.error('Error deleting artwork:', error);
      }
    },
  },
  setup() {
    const isAdmin = ref(false);

    onMounted(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();
            isAdmin.value = userData && userData.role === 'admin';
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        }
      });
    });

    return { isAdmin };
  }
};
</script>

<style scoped>
/* Your styles here */
.artwork-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.image-container {
  flex: 1;
  margin-right: 10px;
}

.artwork-image {
  max-width: 100%;
  height: auto;
}

.artwork-info {
  flex: 2;
}

.button-container {
  flex: 1;
  display: flex;
  align-items: center;
}

.verify-button, .delete-button {
  margin-right: 5px;
}
</style>
