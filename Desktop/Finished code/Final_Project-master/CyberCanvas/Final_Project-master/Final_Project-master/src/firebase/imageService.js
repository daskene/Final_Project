import { db } from './index'; // Adjust the import path as needed
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';

export async function getImages() {
    const images = [];
    // Create a query against the collection, ordering by likes descending and limiting to 6
    const querySnapshot = await getDocs(query(collection(db, "ImageLinks"), orderBy("Likes", "desc"), limit(6)));
    querySnapshot.forEach((doc) => {
        images.push(doc.data());
    });
    console.log("Fetched top 6 liked images:", images); // Log fetched images
    return images;
}

export async function getStaticGenreImages() {
    const referenceImagesCollectionRef = collection(db, 'StaticRefrenceImages'); // Adjust to your new collection name
    const querySnapshot = await getDocs(referenceImagesCollectionRef);
    const genres = [];
    querySnapshot.forEach((doc) => {
        // Push each genre and its imageUrl into the genres array
        genres.push({
            name: doc.data().name,
            imageUrl: doc.data().imageUrl,
        });
    });
    console.log("Fetched static genre images:", genres); // Log fetched genre images
    return genres;
}

export async function getImagesByGenre(genreName) {
    const images = [];
    const imagesCollectionRef = collection(db, "ImageLinks");
    const querySnapshot = await getDocs(imagesCollectionRef);
    querySnapshot.forEach((doc) => {
        if (doc.data().Genre === genreName) { // Assuming each image document has a "genre" field
            images.push(doc.data());
        }
    });
    console.log(`Fetched images for genre ${genreName}:`, images);
    return images;
}