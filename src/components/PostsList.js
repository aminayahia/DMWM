import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/postService"; // Service pour récupérer les publications

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts(); // Récupérer toutes les publications
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Liste des publications</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p><strong>Publié le :</strong> {new Date(post.createdAt).toLocaleString()}</p>

          {/* Bouton pour ajouter un commentaire */}
          <Link to={`/post/${post.id}`}>
            <button>Ajouter un commentaire</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
