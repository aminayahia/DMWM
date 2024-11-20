import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import PostDetail from "./components/PostDetail"; // Afficher les détails d'une publication et les commentaires
import PostForm from "./components/PostsForm"; // Formulaire pour publier une publication
import PostsList from "./components/PostsList"; // Liste des publications
import UserProfile from "./pages/UserProfile"; // Page de profil utilisateur
import { toggleTheme } from './redux/themeSlice';
function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  // Appliquer la classe CSS en fonction du thème actuel
  document.body.className = theme;
  return (
    <>
        <h1>Mode {theme === 'light' ? 'clair' : 'sombre'}</h1>
      <button onClick={() => dispatch(toggleTheme())}>
        Passer au mode {theme === 'light' ? 'sombre' : 'clair'}
      </button>
      <div className={theme === 'light' ? 'clair' : 'sombre'}>
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />  {/* Page de connexion/inscription */}
        <Route path="/profile" element={<UserProfile />} />  {/* Page de profil utilisateur */}
        <Route path="/publish" element={<PostForm />} />  {/* Page pour publier un article */}
        <Route path="/posts" element={<PostsList />} />  {/* Page pour afficher la liste des publications */}
        <Route path="/post/:id" element={<PostDetail />} />  {/* Afficher les détails d'une publication spécifique */}
      </Routes>
    </Router>
    </div>
    </>
  );
}

export default App;
