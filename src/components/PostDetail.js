import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getComments } from "../services/commentService"; // Récupérer les commentaires
import { getPost } from "../services/postService";
import AddComment from "./AddComment"; // Formulaire pour ajouter un commentaire

const PostDetail = () => {
  const { id } = useParams(); // Utilisation de useParams pour récupérer l'ID de la publication
  const [post, setPost] = useState(null); // État pour stocker la publication
  const [comments, setComments] = useState([]); // État pour stocker les commentaires
  const [loadingPost, setLoadingPost] = useState(true); // État de chargement de la publication
  const [loadingComments, setLoadingComments] = useState(true); // État de chargement des commentaires
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    // Fonction pour récupérer les détails de la publication
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(id); // Récupérer la publication par ID
        setPost(fetchedPost); // Mettre à jour l'état avec la publication récupérée
      } catch (err) {
        setError("Erreur lors du chargement de la publication.");
      } finally {
        setLoadingPost(false); // Fin du chargement de la publication
      }
    };

    // Fonction pour récupérer les commentaires associés à la publication
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(id); // Récupérer les commentaires
        setComments(fetchedComments);
      } catch (err) {
        setError("Erreur lors du chargement des commentaires.");
      } finally {
        setLoadingComments(false); // Fin du chargement des commentaires
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
        <nav className="mb-6">
            <ul className="flex space-x-4">
              <li>
                <Link to="/profile" className="text-blue-500 hover:underline">
                  Mon Profil
                </Link>
              </li>
              <li>
                <Link to="/posts" className="text-blue-500 hover:underline">
                  Liste des publications
                </Link>
              </li>
            </ul>
          </nav>

          <hr />
      {/* Vérification de l'état de chargement et des erreurs */}
      {loadingPost ? (
        <p>Chargement de la publication...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 mt-4">Détails de la publication</h1>
          <div className="post-title mb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </div>
          <div className="post-content mb-4">
            <p>{post.content}</p>
          </div>

     

          <hr />

          <h3 className="font-semibold mt-4">Commentaires</h3>

          {/* Vérification de l'état de chargement des commentaires */}
          {loadingComments ? (
            <p>Chargement des commentaires...</p>
          ) : comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment mb-4">
                <p>{comment.text}</p>
                <small>
                  Posté par {comment.userId} le {comment.createdAt.toDate().toLocaleString()}
                </small>
                <hr className="my-2" />
              </div>
            ))
          ) : (
            <p>Aucun commentaire pour cette publication.</p>
          )}

          {/* Formulaire pour ajouter un commentaire */}
          <AddComment postId={id} />
        </>
      )}
    </div>
  );
};

export default PostDetail;
