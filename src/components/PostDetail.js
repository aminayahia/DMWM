import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import de useParams pour récupérer l'ID
import { getComments } from "../services/commentService"; // Récupérer les commentaires
import AddComment from "./AddComment"; // Formulaire pour ajouter un commentaire

const PostDetail = () => {
  const { id } = useParams(); // Utilisation de useParams pour récupérer l'ID de la publication
  const [comments, setComments] = useState([]); // État pour stocker les commentaires

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComments(id); // Récupérer les commentaires de la publication
      setComments(fetchedComments);
    };
    fetchComments();
  }, [id]); // Recharger les commentaires chaque fois que l'ID de la publication change

  return (
    <div>
      <h2>Détails de la publication {id}</h2>
      <p>Contenu de la publication...</p>  {/* Afficher ici le contenu de la publication */}
      
      <hr />
      <h3>Commentaires</h3>

      {/* Formulaire pour ajouter un commentaire */}
      <AddComment postId={id} />

      {/* Liste des commentaires */}
      <div>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index}>
              <p>{comment.text}</p>
              <small>Posté par {comment.userId} le {comment.createdAt.toDate().toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour cette publication.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
