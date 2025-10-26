import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Badge } from "primereact/badge";
import { Menu } from "primereact/menu";
import fetchApi from "../../../helpers/fetchApi";
import { useApp } from "../../../hooks/useApp";
import { Dialog } from "primereact/dialog";
import { tickets_routes_items } from "../../../routes/tickets/tickets_routes";
import TicketModal from "./modal/TicketModal";
import QRCodeModal from "./modal/QrCodeModal";

export default function TicketListPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [inViewMenuItem, setInViewMenuItem] = useState(null);
  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
    search: "",
  });

  const [selectedTicketModal, setSelectedTicketModal] = useState(null);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);

  const [selectedQrCodeModal, setSelectedQrCodeModal] = useState(null);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);

  const { setBreadCrumbAction } = useApp();
  const menu = useRef(null);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const url = `/ticket-all`;
      const data = await fetchApi(url);
      setTickets(data);
      setTotalRecords(Array.isArray(data) ? data.length : 0);
    } catch (error) {
      console.error("Erreur de chargement des tickets", error);
    } finally {
      setLoading(false);
    }
  }, [lazyState]);

  useEffect(() => {
    setBreadCrumbAction([tickets_routes_items.tickets]);
    document.title = tickets_routes_items.tickets.name;
    return () => setBreadCrumbAction([]);
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const onPage = (event) => setLazyState(event);

  // Ouvrir modal d'un ticket
  const openTicketModal = (ticket) => {
    setSelectedTicketModal(ticket);
    setTicketModalVisible(true);
  };

  // Ouvrir modal d'un qr code
  const openQrCodeModal = (ticket) => {
    setSelectedQrCodeModal(ticket);
    setQrCodeModalVisible(true);
  };

  const downloadQrCode = (ticket) => {
    // Si backend fournit URL directe pour génération PDF, on pourrait la télécharger.
    // Ici on ouvre le modal visuel puis déclenche impression via dispatch event
    openQrCodeModal(ticket);
    // Le composant TicketModal propose le bouton print; on pourrait automatiser l'impression
    // après ouverture si tu veux (avec un signal), mais mieux laisser l'utilisateur cliquer.
  };

  // Télécharger / imprimer directement (on ouvre le modal caché et lance print via fenêtre)
  const downloadTicket = (ticket) => {
    // Si backend fournit URL directe pour génération PDF, on pourrait la télécharger.
    // Ici on ouvre le modal visuel puis déclenche impression via dispatch event
    openTicketModal(ticket);
    // Le composant TicketModal propose le bouton print; on pourrait automatiser l'impression
    // après ouverture si tu veux (avec un signal), mais mieux laisser l'utilisateur cliquer.
  };

  return (
    <>
      <ConfirmDialog closable dismissableMask={true} />

      <div className="px-4 py-3 main_content">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="mb-3">Liste des tickets réservés</h1>
        </div>

        <div className="shadow my-2 bg-white p-3 rounded d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="p-input-icon-left">
              <i className="pi pi-search ml-2" />
              <InputText
                type="search"
                placeholder="Recherche"
                className="p-inputtext-sm"
                style={{ minWidth: 250, textIndent: "20px" }}
                onInput={(e) =>
                  setLazyState((s) => ({ ...s, search: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <div className="content">
          <div className="shadow rounded mt-3 pr-1 bg-white">
            <DataTable
              value={tickets}
              loading={loading}
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rowsPerPageOptions={[5, 10, 25, 50]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate={`Affichage de {first} à {last} dans ${totalRecords} éléments`}
              emptyMessage="Aucun ticket trouvé"
              first={lazyState.first}
              rows={lazyState.rows}
              totalRecords={totalRecords}
              onPage={onPage}
              scrollable
            >
              <Column field="code_unique" header="Code Ticket" sortable />
              <Column
                header="Client"
                body={(item) => item?.reservation?.email || "—"}
                sortable
              />
              <Column
                header="Type Ticket"
                body={(item) => item?.reservation?.ticket?.typeticket?.nom || "-"}
                sortable
              />
              <Column
                header="Événement"
                body={(item) => item?.reservation?.ticket?.typeticket?.evenement?.titre || "—"}
                sortable
              />
              <Column
                header="QR Code"
                body={(item) => (
                  <img
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(item?.qr_code)}`}
                    alt="QR Code"
                    width={70}
                    height={70}
                    style={{ objectFit: "contain" }}
                  />
                )}
              />
              <Column
                header="Statut Paiement"
                body={(item) => (
                  <Badge
                    value={
                      item?.statut_payment === 1
                        ? "Payé"
                        : item?.statut_payment === 0
                        ? "En attente"
                        : "Annulé"
                    }
                    severity={
                      item?.statut_payment === "payé"
                        ? "success"
                        : item?.statut_payment === "en_attente"
                        ? "warning"
                        : "danger"
                    }
                  />
                )}
              />
              <Column
                header="Statut Validation"
                body={(item) => (
                  <Badge
                    value={
                      item?.statut_validation === 0
                        ? "En attente"
                        : item?.statut_validation === 1
                        ? "Expiré"
                        : "Fraude!!"
                    }
                    severity={
                      item?.statut_validation === 0
                        ? "warning"
                        : item?.statut_validation === 1
                        ? "success"
                        : "danger"
                    }
                  />
                )}
              />

              <Column
                header="Actions"
                body={(item) => {
                  const items = [
                    {
                      label: "Voir le ticket",
                      icon: "pi pi-eye",
                      command: () => openTicketModal(item),
                    },
                    {
                      label: "Télécharger",
                      icon: "pi pi-download",
                      command: () => downloadTicket(item),
                    },
                    {
                      label: "Voir le qr code",
                      icon: "pi pi-eye",
                      command: () => openQrCodeModal(item),
                    },
                  ];

                  return (
                    <>
                      <Menu
                        model={items}
                        popup
                        ref={menu}
                        id="popup_menu_right"
                        popupAlignment="right"
                        onHide={() => setInViewMenuItem(null)}
                      />
                      <Button
                        aria-label="Menu"
                        size="small"
                        label="Options"
                        icon="pi pi-angle-down"
                        iconPos="right"
                        className="mx-1 p-1"
                        onClick={(event) => {
                          setInViewMenuItem(item);
                          menu.current.toggle(event);
                        }}
                      />
                    </>
                  );
                }}
              />
            </DataTable>
          </div>
        </div>
      </div>

      {/* Dialog ticket */}
      <Dialog
        header="Ticket"
        visible={ticketModalVisible}
        style={{ width: "560px" }}
        onHide={() => {
          setTicketModalVisible(false);
          setSelectedTicketModal(null);
        }}
      >
        {selectedTicketModal && (
          <TicketModal
            ticket={selectedTicketModal}
            onClose={() => {
              setTicketModalVisible(false);
              setSelectedTicketModal(null);
            }}
          />
        )}
      </Dialog>

      {/* Dialog qr code */}
      <Dialog
        header="Ticket"
        visible={qrCodeModalVisible}
        style={{ width: "560px" }}
        onHide={() => {
          setQrCodeModalVisible(false);
          setSelectedQrCodeModal(null);
        }}
      >
        {selectedQrCodeModal && (
          <QRCodeModal
            ticket={selectedQrCodeModal}
            onClose={() => {
              setQrCodeModalVisible(false);
              setSelectedQrCodeModal(null);
            }}
          />
        )}
      </Dialog>
    </>
  );
}
