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
         className="w-full border rounded p-2 outline-none focus:shadow-outline"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" type="submit">Ajouter un commentaire</button>
    </form>
  );
};

export default AddComment;
