import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Assure-toi que 'db' est importé depuis firebase.js

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Hook pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Connexion de l'utilisateur
        await signInWithEmailAndPassword(auth, email, password);
        alert("Connexion réussie !");
        navigate("/profile"); // Redirige vers la page de profil après la connexion
      } else {
        // Inscription de l'utilisateur
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Création du profil utilisateur dans Firestore
        await setDoc(doc(db, "users", user.uid), {
          bio: "",
          skills: "",
          projects: "",
          github: "",
          linkedin: "",
          photoURL: "",
        });

        alert("Inscription réussie !");
        navigate("/profile"); // Redirige vers la page de profil après l'inscription
      }
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Connexion" : "Inscription"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Se connecter" : "S'inscrire"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Créer un compte" : "Déjà inscrit ? Connectez-vous"}
      </button>
    </div>
  );
};

export default AuthForm;
