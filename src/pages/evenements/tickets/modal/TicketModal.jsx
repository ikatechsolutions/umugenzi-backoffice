import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import Affiche from "../../../../assets/images/affiche event UMUGENZI CONNECT.jpg";

/**
 * TicketModal
 * props:
 *  - ticket: objet ticket (doit contenir code_unique, qr_code (url), reservation/email_client, reservation.type_ticket, etc.)
 *  - onClose: fonction pour fermer le modal
 */
export default function TicketModal({ ticket, onClose }) {
  const [flipped, setFlipped] = useState(false);
  const printableRef = useRef(null);

  // Ouvre une nouvelle fenêtre avec le contenu du ticket et lance window.print()
  const handlePrint = () => {
    if (!printableRef.current) return;

    const content = printableRef.current.innerHTML;
    const win = window.open("", "_blank", "width=900,height=700");
    win.document.open();
    win.document.write(`
      <html>
        <head>
          <title>Ticket - ${ticket?.code_unique}</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; padding: 20px; }
            .ticket { width: 700px; margin: 0 auto; }
            .recto, .verso { border: 1px solid #ddd; border-radius: 8px; padding: 18px; }
            .header { display:flex; justify-content:space-between; align-items:center; }
            .qr { width:120px; height:120px; object-fit:contain; border-radius:6px; }
            .title { font-size:18px; font-weight:700; color:#4C1D95; }
            .meta { color:#555; font-size:14px; }
            .footer { font-size:12px; color:#777; margin-top:12px; }
          </style>
        </head>
        <body>
          <div class="ticket">
            ${content}
          </div>
        </body>
      </html>
    `);
    win.document.close();
    // Wait a bit then print
    setTimeout(() => {
      win.print();
      // optionally close window after print
      // win.close();
    }, 300);
  };

//   const recto = (
//     <div className="recto" style={{ background: "#fff" }}>
//       <div className="header" style={{ marginBottom: 12 }}>
//         <div>
//           <div className="title">{ticket?.reservation?.ticket?.typeticket?.evenement?.titre}</div>
//           <div className="meta">{ticket?.reservation?.ticket?.typeticket?.nom}</div>
//         </div>
//         <img src={`data:image/svg+xml;utf8,${encodeURIComponent(ticket?.qr_code)}`} alt="QR" className="qr" />
//       </div>

//       <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
//         <div>
//           <p style={{ margin: 0, fontWeight: 600 }}>Code</p>
//           <p style={{ margin: 0, color: "#333" }}>{ticket?.code_unique}</p>
//         </div>

//         <div>
//           <p style={{ margin: 0, fontWeight: 600 }}>Prix</p>
//           <p style={{ margin: 0, color: "#333" }}>
//             {(ticket?.reservation?.ticket?.typeticket?.prix) ?? 0} BIF
//           </p>
//         </div>

//         {/* <div>
//           <p style={{ margin: 0, fontWeight: 600 }}>Client</p>
//           <p style={{ margin: 0, color: "#333" }}>{ticket?.reservation?.email ?? "—"}</p>
//         </div> */}
//       </div>

//       <div className="footer">
//         <small>Présentez ce ticket (QR code) à l'entrée. Ce ticket est personnel et non remboursable.</small>
//       </div>
//     </div>
//   );

  const recto = (
    <div
        className="recto"
        style={{
        background: `url(${Affiche}) center/cover no-repeat`,
        borderRadius: 12,
        color: "#fff",
        padding: 18,
        position: "relative",
        minHeight: 240,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
    >
        <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
            <div className="title" style={{ fontSize: 20, fontWeight: 700, textShadow: "1px 1px 2px rgba(0,0,0,0.6)" }}>
            {ticket?.reservation?.ticket?.typeticket?.evenement?.titre}
            </div>
            <div className="meta" style={{ fontSize: 14, textShadow: "1px 1px 2px rgba(0,0,0,0.6)" }}>
            {ticket?.reservation?.ticket?.typeticket?.nom}
            </div>
        </div>
        <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(ticket?.qr_code)}`}
            alt="QR"
            className="qr"
            style={{ width: 120, height: 120, borderRadius: 8, border: "2px solid #fff" }}
        />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 20 }}>
        <div>
            <p style={{ margin: 0, fontWeight: 600 }}>Code</p>
            <p style={{ margin: 0 }}>{ticket?.code_unique}</p>
        </div>
        <div>
            <p style={{ margin: 0, fontWeight: 600 }}>Prix</p>
            <p style={{ margin: 0 }}>{ticket?.reservation?.ticket?.typeticket?.prix ?? 0} BIF</p>
        </div>
        </div>

        <div className="footer" style={{ position: "absolute", bottom: 12, width: "100%", textAlign: "center", fontSize: 12 }}>
        <small>Présentez ce ticket à l'entrée. Personnel et non remboursable.</small>
        </div>
    </div>
    );

//   const verso = (
//     <div className="verso" style={{ background: "#f9fafb" }}>
//       <h4 style={{ marginTop: 0 }}>Informations & Conditions</h4>
//       <ul style={{ paddingLeft: 18, marginTop: 8 }}>
//         <li>Ticket non transférable.</li>
//         <li>Validité : entrée unique.</li>
//         <li>Les organisateurs se réservent le droit d’admission.</li>
//       </ul>
//       {/* <div style={{ marginTop: 12 }}>
//         <p style={{ margin: 0, fontWeight: 600 }}>Détails réservation</p>
//         <p style={{ margin: 0 }}>{ticket?.reservation?.email ?? "—"}</p>
//       </div> */}
//       <div className="footer">
//         <small>Présentez ce ticket (QR code) à l'entrée. Ce ticket est personnel et non remboursable.</small>
//       </div>
//     </div>
//   );

const verso = (
  <div
    className="verso"
    style={{
      background: "rgba(0,0,0,0.05)",
      borderRadius: 12,
      padding: 18,
      minHeight: 240,
      position: "relative",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <h4 style={{ marginTop: 0, color: "#333" }}>Informations & Conditions</h4>
    <ul style={{ paddingLeft: 18, marginTop: 8, color: "#555" }}>
      <li>Ticket non transférable.</li>
      <li>Validité : entrée unique.</li>
      <li>Les organisateurs se réservent le droit d’admission.</li>
    </ul>

    <div className="footer" style={{ position: "absolute", bottom: 12, width: "100%", textAlign: "center", fontSize: 12, color: "#555" }}>
      Présentez ce ticket à l'entrée. Personnel et non remboursable.
    </div>
  </div>
);


  return (
    <div className="p-3">
      {/* Zone printable — on copie cette div vers la popup d'impression */}
      <div ref={printableRef} style={{ display: "none" }}>
        <div style={{ padding: 10 }}>
          {recto}
          <div style={{ height: 14 }} />
          {verso}
        </div>
      </div>

      {/* Visuel dans le modal (flip) */}
      <div style={{ perspective: 1000 }}>
        <div
          style={{
            width: 520,
            margin: "0 auto",
            height: 240,
            position: "relative",
            transition: "transform 0.7s",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "none",
          }}
        >
          <div
            style={{
              backfaceVisibility: "hidden",
              position: "absolute",
              inset: 0,
            }}
          >
            {recto}
          </div>

          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              position: "absolute",
              inset: 0,
            }}
          >
            {verso}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2" style={{ display: "flex", justifyContent: "center" }}>
        <Button
          label={flipped ? "Voir recto" : "Voir verso"}
          icon="pi pi-refresh"
          className="p-button-secondary"
          onClick={() => setFlipped((f) => !f)}
        />
        <Button label="Télécharger / Imprimer" icon="pi pi-download" className="p-button-success" onClick={handlePrint} />
        <Button label="Fermer" icon="pi pi-times" className="p-button-text" onClick={onClose} />
      </div>
    </div>
  );
}
