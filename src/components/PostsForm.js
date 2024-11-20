import { addDoc, collection } from "firebase/firestore"; // Pour ajouter un document à Firestore
import React, { useState } from "react";
import { db } from "../firebase"; // Assure-toi que db est importé depuis firebase.js

const PostsForm = () => {
  const [title, setTitle] = useState("");  // Titre de la publication
  const [content, setContent] = useState("");  // Contenu de la publication

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ajout de la publication dans Firestore
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: new Date(),
      });
      alert("Publication ajoutée !");
      setTitle("");  // Réinitialisation du titre
      setContent("");  // Réinitialisation du contenu
    } catch (error) {
      alert("Erreur lors de l'ajout de la publication : " + error.message);
    }
  };

  return (
    <div>
      <h2>Publier un article</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre de la publication"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Contenu de la publication"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Publier</button>
      </form>
    </div>
  );
};

export default PostsForm;
