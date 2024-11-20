import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { auth, db } from "../firebase";
const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    if (!auth.currentUser) {
      navigate("/"); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      return;
    }

    const fetchUserProfile = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUser(data);
        setBio(data.bio || "");
        setSkills(data.skills || "");
        setProjects(data.projects || "");
        setGithub(data.github || "");
        setLinkedin(data.linkedin || "");
      } else {
        toast.error("ucun profil trouvé."); 
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Si l'utilisateur n'est pas encore chargé, afficher un message de chargement
  if (!user) return <div>Chargement...</div>;

  const handleSave = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      bio,
      skills,
      projects,
      github,
      linkedin,
    });

    setEditMode(false);
    toast.error("Profil mis à jour !"); 
  };

  return (
 <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profil de l'utilisateur</h1>
      
      {/* Menu de navigation */}
      <nav className="mb-6">
        <ul className="flex space-x-4">
          <li>
            <Link to="/posts" className="text-blue-500 hover:underline">
              Voir les publications
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
    <div className="flex items-center w-full">
    <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
      <h1 className="mb-2">Mon Espace</h1>
        <img
          src={user.photoURL || "https://via.placeholder.com/150"}
          alt="Avatar"
          width={150}
        />
        <h2 className="mb-2">{auth.currentUser?.email}</h2>
        {editMode ? (
          <>
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline mb-2"
            />
            <input
              type="text"
              placeholder="Compétences (séparées par des virgules)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline mb-2"
            />
            <textarea
              placeholder="Projets"
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline mb-2"
            />
            <input
              type="url"
              placeholder="GitHub"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline mb-2"
            />
            <input
              type="url"
              placeholder="LinkedIn"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline mb-2"
            />
            <button  className="bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" onClick={handleSave}>Enregistrer</button>
          </>
        ) : (
          <>
            <p><strong>Bio:</strong> {user.bio}</p>
            <p><strong>Compétences:</strong> {user.skills}</p>
            <p><strong>Projets:</strong> {user.projects}</p>
            <p>
              <strong>Liens:</strong>{" "}
              <a href={user.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>{" "}
              |{" "}
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" onClick={() => setEditMode(true)}>Modifier</button>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default UserProfile;
