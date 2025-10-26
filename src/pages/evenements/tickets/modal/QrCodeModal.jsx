import React, { useRef } from "react";
import { Button } from "primereact/button";

/**
 * QRCodeModal
 * props:
 *  - ticket: objet ticket (doit contenir code_unique, qr_code (SVG), reservation.ticket.typeticket.nom)
 *  - onClose: fonction pour fermer le modal
 */
export default function QRCodeModal({ ticket, onClose }) {
  const printableRef = useRef(null);

  // Impression du QR code
  const handlePrint = () => {
    if (!printableRef.current) return;

    const content = printableRef.current.innerHTML;
    const win = window.open("", "_blank", "width=400,height=450");
    win.document.open();
    win.document.write(`
      <html>
        <head>
          <title>QR Code - ${ticket?.code_unique}</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; text-align: center; padding: 20px; }
            .qr-container { display: flex; flex-direction: column; align-items: center; justify-content: center; }
            .qr-container img { width: 250px; height: 250px; margin-bottom: 15px; }
            .info { font-size: 14px; margin: 2px 0; }
          </style>
        </head>
        <body>
          <div class="qr-container">
            ${content}
          </div>
        </body>
      </html>
    `);
    win.document.close();
    setTimeout(() => {
      win.print();
    }, 300);
  };

  return (
    <div className="p-3">
      {/* Zone printable */}
      <div ref={printableRef} style={{ display: "none" }}>
        <div className="qr-container">
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(ticket?.qr_code)}`}
            alt="QR Code"
          />
          <div className="info">
            <strong>Type :</strong> {ticket?.reservation?.ticket?.typeticket?.nom || "-"}
          </div>
          <div className="info">
            <strong>Code :</strong> {ticket?.code_unique}
          </div>
        </div>
      </div>

      {/* Affichage dans le modal */}
      <div style={{ textAlign: "center" }}>
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(ticket?.qr_code)}`}
          alt="QR Code"
          style={{ width: 250, height: 250, marginBottom: 10 }}
        />
        <div style={{ fontSize: 14, marginBottom: 2 }}>
          <strong>Type :</strong> {ticket?.reservation?.ticket?.typeticket?.nom || "-"}
        </div>
        <div style={{ fontSize: 14, marginBottom: 10 }}>
          <strong>Code :</strong> {ticket?.code_unique}
        </div>

        <div className="flex gap-2" style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          <Button
            label="Imprimer"
            icon="pi pi-print"
            className="p-button-success"
            onClick={handlePrint}
          />
          <Button
            label="Fermer"
            icon="pi pi-times"
            className="p-button-text"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}
