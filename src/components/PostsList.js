import { collection, getDocs } from "firebase/firestore"; // Pour récupérer les documents de Firestore
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Assure-toi que db est importé depuis firebase.js

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des publications :", error);
      }
    };

    fetchPosts();
  }, []);  // Ce hook ne s'exécute qu'une seule fois au chargement de la page

  return (
    <div>
      <h2>Liste des Publications</h2>
      {posts.length === 0 ? (
        <p>Aucune publication disponible.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p><strong>Date :</strong> {new Date(post.createdAt.seconds * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostsList;
