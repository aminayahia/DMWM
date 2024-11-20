import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import PostDetail from "./components/PostDetail"; // Afficher les détails d'une publication et les commentaires
import PostForm from "./components/PostsForm"; // Formulaire pour publier une publication
import PostsList from "./components/PostsList"; // Liste des publications
import UserProfile from "./pages/UserProfile"; // Page de profil utilisateur

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />  {/* Page de connexion/inscription */}
        <Route path="/profile" element={<UserProfile />} />  {/* Page de profil utilisateur */}
        <Route path="/publish" element={<PostForm />} />  {/* Page pour publier un article */}
        <Route path="/posts" element={<PostsList />} />  {/* Page pour afficher la liste des publications */}
        <Route path="/post/:id" element={<PostDetail />} />  {/* Afficher les détails d'une publication spécifique */}
      </Routes>
    </Router>
  );
}

export default App;
