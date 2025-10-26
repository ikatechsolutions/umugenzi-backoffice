import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function TriageResultModal({ couples }) {

    const navigate = useNavigate();

    const handleEndGame = () => {
        // redirection vers la page de création de jeu
        navigate("/games");
        window.location.reload();
    };

    return (
        <div className="mt-4 card p-3" style={{ maxHeight: "90vh", overflow: "auto" }}>
            <h5>🎲 Couples formés</h5>
            <div className="space-y-4">
            {couples.map(([from, to], index) => (
                <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow"
                >
                    {/* Avatar du premier joueur */}
                    <div className="mx-1 text-xl font-bold">
                        <Avatar 
                        label={getInitials(from)}
                        shape="circle"
                        size="large"
                        className="mx-1 text-white text-xl font-bold"
                        style={{ backgroundColor: "blue", color: "white" }}
                        />
                        <span className="mt-1 text-sm">{from}</span>
                    </div>

                    <span className="mt-2 text-xl">🤝</span>

                    {/* Avatar du partenaire */}
                    <div className="mx-1 text-xl font-bold">
                        <Avatar 
                        label={getInitials(to)}
                        shape="circle"
                        size="large"
                        className="mx-1 text-white text-xl font-bold"
                        style={{ backgroundColor: "green", color: "white" }}
                        />
                        <span className="mt-1 text-sm">{to}</span>
                    </div>
                </div>
            ))}
            </div>
            {/* Bouton Jeu terminé */}
            
            <div className="mt-3 mx-8 flex justify-center">
                <Button 
                    label="Jeu terminé" 
                    icon="pi pi-check-circle" 
                    className="p-button-success px-7 py-2 rounded shadow-lg" 
                    onClick={handleEndGame} 
                />
            </div>
        </div>
    )
}
  

