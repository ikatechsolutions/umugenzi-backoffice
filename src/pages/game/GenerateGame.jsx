// import React, { useState } from "react";
// import { QRCode } from "qrcode.react";
// import fetchApi from "../../helpers/fetchApi";
// import { useAuth } from "../../hooks/useAuth";

// const GenerateGame = () => {
//     const [game, setGame] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const { user } = useAuth();

//     const handleCreateGame = async () => {
//         try {
//             setLoading(true);
//             // Appel API pour créer un groupe/jeu
//             const response = await fetchApi("/groupes", {
//                 method: "POST",
//                 body: {
//                     user_id: 1,  // id de l'agent connecté
//                 }
//             });

//             setGame(response); // sauvegarder les infos du jeu
//         } catch (error) {
//             console.error("Erreur lors de la création du groupe:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md text-center">
//             <h2 className="text-xl font-bold mb-4">Générer un QR Code</h2>

//                 <button
//                     onClick={handleCreateGame}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//                     disabled={loading}
//                 >
//                     {loading ? "Création..." : "Créer un jeu"}
//                 </button>

//                 {game && (
//                     <div className="mt-6">
//                         <p className="mb-2 font-semibold">Nom du jeu : {game.name}</p>
//                         <QRCode value={game.name} size={200} />
//                     </div>
//                 )}
//         </div>
//     );
// };

// export default GenerateGame;


// import React, { useMemo, useState } from "react";
// import QRCode from "react-qr-code";
// import fetchApi from "../../helpers/fetchApi";          
// import { useAuth } from "../../hooks/useAuth";          

// const GenerateGame = () => {
//   const { user } = useAuth(); 
//   const agentId = user?.data?.user?.id;

//   const [game, setGame] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [copyOk, setCopyOk] = useState(false);

//   const handleCreateGame = async () => {
//     if (!agentId) {
//       alert("Impossible de trouver l'ID de l'agent connecté.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetchApi("/groupes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_id: agentId }),
//       });
      
//       // response doit être l'objet groupe: { id, name, user_id, ... }
//       setGame(response.data);
//     } catch (err) {
//       console.error("Erreur lors de la création du groupe:", err);
//       alert(err?.message || "Erreur lors de la création du groupe");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // URL que contiendra le QR Code (page où les joueurs rempliront nom/prénom)
//   const joinUrl = useMemo(() => {
//     if (!game?.name) return "";
//     return `${window.location.origin}/join?group=${encodeURIComponent(game.id)}`;
//   }, [game]);

//   const handleCopy = async () => {
//     if (!joinUrl) return;
//     try {
//       await navigator.clipboard.writeText(joinUrl);
//       setCopyOk(true);
//       setTimeout(() => setCopyOk(false), 1500);
//     } catch {
//       setCopyOk(false);
//     }
//   };

//   // Télécharger le QR au format SVG
//   const handleDownloadSvg = () => {
//     const svg = document.getElementById("qr-svg");
//     if (!svg) return;

//     const serializer = new XMLSerializer();
//     const source = serializer.serializeToString(svg);
//     const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `qr-${game?.name || "groupe"}.svg`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="p-4 mx-auto bg-white rounded shadow" style={{ maxWidth: 560 }}>
//       <h3 className="mb-3 text-center">Jeu UMUGENZI</h3>

//       <div className="d-flex gap-2 justify-content-center mb-3">
//         <button
//           onClick={handleCreateGame}
//           className="btn btn-primary"
//           disabled={loading}
//         >
//           {loading ? "Création..." : "Créer un jeu"}
//         </button>

//         {game && (
//           <>
//             <button className="btn btn-outline-secondary" onClick={handleCopy}>
//               {copyOk ? "Lien copié ✅" : "Copier le lien"}
//             </button>
//             <button className="btn btn-outline-secondary" onClick={handleDownloadSvg}>
//               Télécharger le QR (SVG)
//             </button>
//           </>
//         )}
//       </div>

//       {game && (
//         <div className="text-center">
//           <p className="mb-2">
//             <strong>Nom du jeu :</strong> {game.name}
//           </p>

//           {/* react-qr-code rend un SVG */}
//           <div
//             className="d-inline-block p-3 bg-white rounded"
//             style={{ border: "1px solid #eee" }}
//           >
//             <QRCode
//               id="qr-svg"
//               value={joinUrl}     // le QR contient l’URL de join
//               size={220}
//               style={{ height: "auto", maxWidth: "100%", width: "220px" }}
//               level="M"
//               includeMargin
//             />
//           </div>

//           <p className="mt-3">
//             Lien d’inscription :<br />
//             <a href={joinUrl} target="_blank" rel="noreferrer">
//               {joinUrl}
//             </a>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GenerateGame;


import React, { useMemo, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import fetchApi from "../../helpers/fetchApi";
import { useAuth } from "../../hooks/useAuth";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import TriageResultModal from "./modales/TriageResultModal";
import { games_routes_items } from "../../routes/games/generategame_router";
import { useApp } from "../../hooks/useApp";

const GenerateGame = () => {
  const { user } = useAuth();
  const agentId = user?.data?.user?.id;

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copyOk, setCopyOk] = useState(false);

  // joueurs du jeu
  const [players, setPlayers] = useState([]);
  const [showPlayers, setShowPlayers] = useState(false);
  const [drawLoading, setDrawLoading] = useState(false);

  // Affichage des tirages
  const [couples, setCouples] = useState([]); 
  const [visible, setVisible] = useState(false);

  const { setBreadCrumbAction } = useApp()

  const showCoupleModal = (data) => {
    setVisible(true)
    setCouples(data)
  }

  const hideCoupleModal = (data) => {
    setVisible(false)
  }

  const handleCreateGame = async () => {
    if (!agentId) {
      alert("Impossible de trouver l'ID de l'agent connecté.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetchApi("/groupes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: agentId }),
      });

      setGame(response.data);
    } catch (err) {
      console.error("Erreur lors de la création du groupe:", err);
      alert(err?.message || "Erreur lors de la création du groupe");
    } finally {
      setLoading(false);
    }
  };

  // URL que contiendra le QR Code (page où les joueurs rempliront nom/prénom)
  const joinUrl = useMemo(() => {
    if (!game?.id) return "";
    return `${window.location.origin}/join/game/${encodeURIComponent(game.id)}`;
  }, [game]);

  const handleCopy = async () => {
    if (!joinUrl) return;
    try {
      await navigator.clipboard.writeText(joinUrl);
      setCopyOk(true);
      setTimeout(() => setCopyOk(false), 1500);
    } catch {
      setCopyOk(false);
    }
  };

  const handleDownloadSvg = () => {
    const svg = document.getElementById("qr-svg");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-${game?.name || "groupe"}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Charger les joueurs (polling toutes les 3 sec)
  useEffect(() => {
    if (!game) return;
    const interval = setInterval(() => {
      loadPlayers();
    }, 3000);

    loadPlayers();
    return () => clearInterval(interval);
  }, [game]);

  const loadPlayers = async () => {
    try {
      const data = await fetchApi(`/groupes/${game.id}`, "GET");
      setPlayers(data.games);
    } catch (error) {
      console.error("Erreur récupération joueurs:", error);
    }
  };

  // Fonction utilitaire pour l'affichage des joueurs
  const getInitials = (fullName) => {
    if (!fullName) return "?"; // Si pas de nom
    
    const parts = fullName.trim().split(" ").filter(Boolean);

    if (parts.length === 1) {
      // Seulement prénom ou seulement nom
      return parts[0][0].toUpperCase();
    } else {
      // On prend la 1ère lettre du 1er mot et du dernier mot
      return (
        parts[0][0].toUpperCase() +
        parts[parts.length - 1][0].toUpperCase()
      );
    }
  };

  const handleDraw = async () => {
    try {
      setDrawLoading(true);
      const response = await fetchApi(`/groupe/${game.id}/tirage`, "POST");
      alert("🎉 Tirage effectué avec succès !");

      const tirages = response?.tirages || {};

      // Transformer en tableau de couples [ [A, B], [C, D] ]
      const couplesArray = Object.entries(tirages).map(([from, to]) => [from, to]);
      setCouples(couplesArray);

      // Ouvrir le modal une fois les couples prêts
      setVisible(true);

      console.log("Couples formés:", response);
    } catch (error) {
      console.error("Erreur tirage:", error);
    } finally {
      setDrawLoading(false);
    }
  };

  useEffect(() => {
    setBreadCrumbAction([games_routes_items.games])
    document.title = games_routes_items.games.name;

    return () => {
      setBreadCrumbAction([]);
    };
  }, []);

  return (
    <>

      {visible && (
        <Dialog
          header={`Amis inconnues`}
          visible={visible}
          onHide={hideCoupleModal}
          maximizable
        >
          <TriageResultModal
              setVisible={setVisible}
              couples={couples}
          />
        </Dialog>
      )}

      <div className="p-4 mx-auto bg-white rounded shadow" style={{ maxHeight: "90vh", overflow: "auto" }}>
        <h3 className="mb-3 text-center">JOUEZ UMUGENZI</h3>

        <div className="d-flex gap-2 justify-content-center mb-3">
          <button
            onClick={handleCreateGame}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Création..." : "Créer un jeu"}
          </button>

          {game && (
            <>
              <button className="btn btn-outline-secondary" onClick={handleCopy}>
                {copyOk ? "Lien copié ✅" : "Copier le lien"}
              </button>
              <button className="btn btn-outline-secondary" onClick={handleDownloadSvg}>
                Télécharger le QR (SVG)
              </button>

              {/* Compteur joueurs */}
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowPlayers(!showPlayers)}
              >
                {players.length} joueur(s)
              </button>
            </>
          )}
        </div>

        {game && (
          <div className="text-center">
            <p className="mb-2">
              <strong>Nom du jeu :</strong> {game.name}
            </p>

            <div
              className="d-inline-block p-3 bg-white rounded"
              style={{ border: "1px solid #eee" }}
            >
              <QRCode
                id="qr-svg"
                value={joinUrl}
                size={220}
                style={{ height: "auto", maxWidth: "100%", width: "220px" }}
                level="M"
                includeMargin
              />
            </div>

            <p className="mt-3">
              Lien d’inscription :<br />
              <a href={joinUrl} target="_blank" rel="noreferrer">
                {joinUrl}
              </a>
            </p>
          </div>
        )}

        {/* Liste joueurs */}
        {showPlayers && (
          <div className="mt-4 card p-3">
            <h5>👥 Joueurs inscrits</h5>
            {/* <ul>
              {players.map((p) => (
                <li key={p.id}>{p.candidat}</li>
              ))}
            </ul> */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {players.map((p) => (
                <div
                  key={p.id}
                  className="p-4"
                >
                  {/* Avatar circulaire */}
                  <Avatar 
                    label={getInitials(p.candidat)}
                    shape="circle"
                    size="large"
                    className="mx-1 text-white text-xl font-bold"
                    style={{ backgroundColor: "blue" }}
                  />
                  {/* Nom en bas */}
                  <span className="font-medium">{p.candidat}</span>
                </div>
              ))}
            </div>

            <button
              className="btn btn-success mt-3"
              onClick={handleDraw}
              disabled={drawLoading || players.length < 2}
            >
              {drawLoading ? "Tirage en cours..." : "🎲 Lancer le tirage"}
            </button>
          </div>
        )}
      </div>
    </>
    
  );
};

export default GenerateGame;


