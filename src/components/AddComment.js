import React, { useState } from "react";
import { addComment } from "../services/commentService"; // Import du service d'ajout de commentaire

const AddComment = ({ postId }) => {
  const [commentText, setCommentText] = useState(""); // État pour le texte du commentaire

  // Fonction pour gérer la soumission du formulaire
  const handleAddComment = async (e) => {
    e.preventDefault();
    const userId = "user123"; // Remplace par l'ID réel de l'utilisateur connecté

    if (commentText.trim()) {
      // Appel du service pour ajouter le commentaire
      await addComment(commentText, userId, postId);
      setCommentText(""); // Réinitialiser le champ de texte
    }
  };

  return (
    <form onSubmit={handleAddComment}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Ajoutez un commentaire"
        required
      />
      <button type="submit">Ajouter un commentaire</button>
    </form>
  );
};

export default AddComment;
