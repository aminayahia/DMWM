import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
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
        toast.success("Connexion réussie !"); 
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

        toast.success("Inscription réussie !");
        navigate("/profile"); // Redirige vers la page de profil après l'inscription
      }
    } catch (error) {
      toast.error("Erreur");
    }
  };

  return (
    <div className="form-auth">


      <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
      <span className="block w-full text-xl uppercase font-bold mb-4"> {isLogin ? "Connexion" : "Inscription"}</span>      
      <form onSubmit={handleSubmit}>
          <div className="mb-4 md:w-full">
            <label for="email" className="block text-xs mb-1">Email</label>
       
            <input
          type="email"
          placeholder="E-mail"
          value={email}
          className="w-full border rounded p-2 outline-none focus:shadow-outline"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
          </div>
          <div className="mb-6 md:w-full">
            <label for="password" className="block text-xs mb-1">Password</label>
           
            <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          className="w-full border rounded p-2 outline-none focus:shadow-outline"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
          {isLogin ? "Login" : "Enregistrer"}
          </button>
        </form>
        <button  className="text-blue-700 text-center text-sm" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Créer un compte" : "Déjà inscrit ? Connectez-vous"}
      </button>
    </div>
  </div>

      
    </div>
  );
};

export default AuthForm;
