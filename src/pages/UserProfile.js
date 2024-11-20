import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        console.log("Aucun profil trouvé.");
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
    alert("Profil mis à jour !");
  };

  return (
    <div>
      <h1>Profil utilisateur</h1>
      <div>
        <img
          src={user.photoURL || "https://via.placeholder.com/150"}
          alt="Avatar"
          width={150}
        />
        <h2>{auth.currentUser?.email}</h2>
        {editMode ? (
          <>
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <input
              type="text"
              placeholder="Compétences (séparées par des virgules)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <textarea
              placeholder="Projets"
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
            />
            <input
              type="url"
              placeholder="GitHub"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
            <input
              type="url"
              placeholder="LinkedIn"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
            <button onClick={handleSave}>Enregistrer</button>
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
            <button onClick={() => setEditMode(true)}>Modifier</button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
