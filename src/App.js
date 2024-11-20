import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import PostForm from "./components/PostsForm"; // Importer le formulaire de publication
import PostsList from "./components/PostsList"; // Importer la liste des publications
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />  {/* Page de connexion/inscription */}
        <Route path="/profile" element={<UserProfile />} />  {/* Page de profil utilisateur */}
        <Route path="/publish" element={<PostForm />} />  {/* Page pour publier un article */}
        <Route path="/posts" element={<PostsList />} />  {/* Page pour afficher les publications */}
      </Routes>
    </Router>
  );
}

export default App;
