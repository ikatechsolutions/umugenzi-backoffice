import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchApi from "../../helpers/fetchApi";
import { useApp } from "../../hooks/useApp";
import { Dropdown } from "primereact/dropdown";
import { FaCheckCircle } from "react-icons/fa";
import Logo from "../../assets/images/Umugenzi-Logo.png";

export default function JoinGame() {
  const { groupeId } = useParams();            // /join/:groupeId
  const { setToastAction } = useApp();         // si ton hook expose setToastAction
  const [name, setName] = useState("");
  const [numero, setNumero] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [gifts, setGifts] = useState([]);
  const [selectedGift, setSelectedGift] = useState(null);
  const [success, setSuccess] = useState(false);
  // console.log(groupeId);


  const fetchGifts = async () => {
      try {
          const res = await fetchApi('/gifts');
          // console.log(res);
          
          const giftList = res.map((gift) => ({
              code: gift?.id,
              name: gift?.nom
          }));

          setGifts(giftList);

      } catch (error) {
          console.log(error)
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const candidat = name.trim();
    const phone = numero.trim();

    if (!candidat || !phone || !selectedGift) return;

    try {
      setSubmitting(true);

      const res = await fetchApi("/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupe_id: Number(groupeId), // important si ton backend attend un entier
          candidat,
          phone,
          gift_id: selectedGift.code
        }),
      });

      // res attendu côté Laravel:
      // { status: 'success', message: 'Joueur ajouté au groupe', data: { ... } }
      setToastAction?.({
        severity: "success",
        summary: "Succès",
        detail: res?.message || "L'entrée dans le jeu effectué avec succès",
        life: 3000,
      });

      // Reset du formulaire
      setName("");
      setNumero("");
      setSelectedGift(null);
      setSuccess(true);

    } catch (err) {
      setToastAction?.({
        severity: "error",
        summary: "Erreur",
        detail: err?.message || "Impossible d'enregistrer le joueur",
        life: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
      fetchGifts();
  }, []);

  if (!groupeId) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          L’identifiant du groupe est manquant dans l’URL.
        </div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow-lg">
        <h1 className="text-center">
          {/* Umugenzi App */}
          <img
            src={Logo}
            alt="Umugenzi Logo"
            className="h-6 w-auto object-contain"
            style={{ width: "150px", height: "180px" }}
          />
        </h1>
        
        {!success ? (
          <>
            <div className="container d-flex justify-content-center">
                <div className="card shadow-sm p-4" style={{ maxWidth: 420, width: "100%" }}>
                    <h3 className="mb-2 text-center">Rejoindre le jeu</h3>
                    <p className="text-muted text-center mb-4">
                    Groupe #{groupeId}
                    </p>

                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nom complet: </label>
                        <input
                        className="form-control"
                        type="text"
                        placeholder="Ex: John Leon"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={submitting}
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Numéro whatsapp: </label>
                        <input
                        className="form-control"
                        type="text"
                        placeholder="Ex: +25760258963"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        disabled={submitting}
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ce que j'aime: </label>
                        <Dropdown
                            value={selectedGift}
                            options={gifts}
                            onChange={e => setSelectedGift(e.value)}
                            optionLabel="name"
                            filter
                            placeholder="Sélectionnez un cadeau"
                            emptyFilterMessage="Aucun élément trouvé"
                            emptyMessage="Aucun élément trouvé"
                            className="w-100"
                            showClear
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={submitting || !name.trim() || !numero.trim() || !selectedGift}
                    >
                        {submitting ? "Envoi..." : "Entrer dans le jeu"}
                    </button>
                    </form>
                </div>
            </div>
          </>
        ) : (
          <div className="container d-flex justify-content-center">
            <FaCheckCircle className="text-4xl mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Merci d’avoir rejoint le jeu. 🎉
            </h2>
            {/* <p className="text-gray-600">
              Merci d’avoir rejoint le jeu. 🎉
            </p> */}
          </div>
        )}
      </div>
    </div>
    
  );
}
