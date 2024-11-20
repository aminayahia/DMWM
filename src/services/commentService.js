import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { db } from "../firebase"; // Import de la configuration Firebase

// Ajouter un commentaire à une publication
export const addComment = async (commentText, userId, postId) => {
  try {
    const commentRef = collection(db, "comments"); // Référence à la collection "comments"
    await addDoc(commentRef, {
      text: commentText,
      userId: userId,
      createdAt: Timestamp.now(),
      postId: postId,
    });
    console.log("Commentaire ajouté avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire :", error);
  }
};

// Récupérer les commentaires d'une publication spécifique
export const getComments = async (postId) => {
  try {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("postId", "==", postId)); // Récupérer les commentaires d'un post spécifique
    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return comments;
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    return [];
  }
};
