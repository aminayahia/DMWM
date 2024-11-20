import { addDoc, collection } from "firebase/firestore"; // Pour ajouter un document à Firestore
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { db } from "../firebase"; // Assure-toi que db est importé depuis firebase.js
const PostsForm = () => {
  const [title, setTitle] = useState("");  // Titre de la publication
  const [content, setContent] = useState("");  // Contenu de la publication
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ajout de la publication dans Firestore
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: new Date(),
      });
      toast.success("Publication ajoutée !"); 
      navigate("/posts");
      setTitle("");  // Réinitialisation du titre
      setContent("");  // Réinitialisation du contenu
    } catch (error) {
      alert("Erreur lors de l'ajout de la publication : " + error.message);
      toast.error("Erreur lors de l'ajout de la publication "); 
    }
  };

  return (
    <div>

         <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold mb-4 mt-4">Publier un article</h1>
      
      {/* Menu de navigation */}
      <nav className="mb-6">
        <ul className="flex space-x-4">
          <li>
            <Link to="/profile" className="text-blue-500 hover:underline">
              Mon Profile
            </Link>
          </li>
          <li>
            <Link to="/posts" className="text-blue-500 hover:underline">
             Liste des publications
            </Link>
          </li>
        </ul>
      </nav>
     
   
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre de la publication"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded p-2 outline-none focus:shadow-outline mb-2"
        />
        <textarea
          placeholder="Contenu de la publication"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full border rounded p-2 outline-none focus:shadow-outline mb-2"
        />
        <button className="bg-blue-400 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" type="submit">Publier</button>
      </form>
    </div>
    </div>

  );
};

export default PostsForm;
