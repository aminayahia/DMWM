import { collection, doc, getDoc, getDocs } from "firebase/firestore"; // Importation des fonctions nécessaires
import { db } from "../firebase"; // Assurez-vous d'importer correctement votre instance Firestore

// Fonction pour récupérer toutes les publications
export const getPosts = async () => {
  try {
    const postsCollection = collection(db, "posts"); // Accéder à la collection "posts"
    const postsSnapshot = await getDocs(postsCollection); // Obtenir tous les documents de cette collection
    const postsList = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(), // Retourner les données de chaque publication
    }));
    return postsList; // Retourner la liste des publications
  } catch (error) {
    console.error("Erreur lors de la récupération des publications: ", error);
  }
};

// Fonction pour récupérer une publication par ID
export const getPost = async (postId) => {
  try {
    const docRef = doc(db, "posts", postId); // Référence à une publication par son ID
    const docSnap = await getDoc(docRef); // Récupérer le document
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }; // Retourner les données de la publication
    } else {
      console.log("Aucune publication trouvée !");
      return null; // Aucun résultat
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la publication: ", error);
  }
};
