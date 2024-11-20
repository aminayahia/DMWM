import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Assurez-vous d'importer votre configuration Firebase

// Fonction pour récupérer toutes les publications
export const getPosts = async () => {
  const postsCollection = collection(db, "posts"); // "posts" est le nom de la collection Firestore
  const postSnapshot = await getDocs(postsCollection);
  const postList = postSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return postList;
};
