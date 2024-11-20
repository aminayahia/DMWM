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
         <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold mb-4 mt-4">Liste des publications</h1>
      
      {/* Menu de navigation */}
      <nav className="mb-6">
        <ul className="flex space-x-4">
          <li>
            <Link to="/profile" className="text-blue-500 hover:underline">
              Mon Profile
            </Link>
          </li>
          <li>
            <Link to="/publish" className="text-blue-500 hover:underline">
              Ajouter une publication
            </Link>
          </li>
        </ul>
      </nav>
      </div>

      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <h3 className="font-semibold text-lg mb-3">{post.title}</h3>
          <p className="text-xs mb-2">{post.content}</p>
          <p><span className="text-blue-500 mb-4">Publié le :</span> {new Date(post.createdAt).toLocaleString()}</p>

          {/* Bouton pour ajouter un commentaire */}
          <Link to={`/post/${post.id}`}>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Ajouter un commentaire</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
