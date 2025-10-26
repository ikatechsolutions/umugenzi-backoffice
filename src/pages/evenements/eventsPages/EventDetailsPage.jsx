import fetchApi from "../../../helpers/fetchApi";
import { useEffect, useState } from "react";
import { useApp } from "../../../hooks/useApp";
import {  useLocation, useParams } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { TabPanel, TabView } from "primereact/tabview";
import { Skeleton } from "primereact/skeleton";
import { useAuth } from "../../../hooks/useAuth";
import { Tag } from "primereact/tag";
import { Badge } from "primereact/badge";
// import DocumentsExigesDetails from "./details/DocumentsExigesDetails";
// import PersonnesContactDetails from "./details/PersonnesContactDetails";
import { Button } from "primereact/button";
// import MotifRejetDialog from "./reponses_candidature/MotifRejetDialog";
import { Dialog } from "primereact/dialog";
import { Message } from "primereact/message";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { evenements_routes_items } from "../../../routes/evenements/evenements_route";
import InformationsGeneralesModal from "./dialog/InformationsGeneralesModal";
import TicketsModal from "./dialog/TicketsModal";

export default function EventDetailsPage() {
    const [loading, setLoading] = useState(true);
    const { setBreadCrumbAction, setToastAction } = useApp()
    const { state } = useLocation()
    const params = state?.id ? state : useParams();
    const [visible, setVisible] = useState(false)
    const [candidatId, setCandidatId] = useState()
    const [showMotif, setShowMotif] = useState(false)
    const { user } = useAuth()
    const [loadingApprouver, setLoadingApprouver] = useState(false)
    const [traitementCommence, setTraitementCommence] = useState(false)

    const showModal = (id) => {
        setVisible(true)
        setCandidatId(id)
    }

    const hideModal = () => {
        setVisible(false)
    }

    const initialValues = {
        titre: "",
        description: "",
        place: "",
        date_event: "",
        heure: "",
        image: "",
        user_id: "",
        categorie_id: "",
        statut_payment: "",
        statut_event: "",
        statut_validation: "",
    }

    const [data, setData] = useState(initialValues)

    const fetchEvenementDetails = async () => {
        try {
            setLoading(true)
            const res = await fetchApi(`/evenements/${params?.id}`);
            console.log(res);
            
            setData({ ...res })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    const handleApprouverClick = () => {
        confirmDialog({
            message: 'Voulez-vous vraiment approuver cette demande ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => handleApprouver(),
        })
    }

    const handleApprouver = async () => {

        setLoadingApprouver(true);

        try {
            const body = {
                SECRETAIRE_ID: user.data.ID_UTILISATEUR
            };

            /* Il faut aussi enregistrer l'admin qui valide l'evenement pour qu'il y est la 
               traçabilité (à continuer demain apres modification du backend pour ces ajouts) 
            */

            const res = await fetchApi(`/evenements/${data?.id}/validate`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            });

            setToastAction({
                severity: 'success',
                summary: 'Succès',
                detail: res.message,
                life: 3000
            });

            fetchMesDemandes(); // Recharger les données pour voir les nouveaux statuts

        } catch (error) {
            console.log(error);
            setToastAction({
                severity: 'error',
                summary: 'Erreur',
                detail: error.message,
                life: 3000
            });
        } finally {
            setLoadingApprouver(false)
        }
    };

    const handleCommencerTraitement = async () => {
        try {
            const res = await fetchApi(`/change-statut/${data.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            setToastAction({
                severity: 'success',
                summary: 'Succès',
                detail: res.message,
                life: 3000
            });

            fetchEvenementDetails(); // Recharger pour mettre à jour le badge de statut

        } catch (error) {
            console.log(error);
            setToastAction({
                severity: 'error',
                summary: 'Erreur',
                detail: error.message || "Erreur lors du changement de statut",
                life: 3000
            });
        }
    }



    useEffect(() => {
        document.title = evenements_routes_items.voir_evenement_details.name;

        setBreadCrumbAction(state ? [{
            path: "view-details",
            name: "Voir l'événement",
            component: EventDetailsPage,
        }] : [evenements_routes_items.evenements, evenements_routes_items.voir_evenement_details])

        fetchEvenementDetails();

        return () => {
            setBreadCrumbAction([]);
        };

    }, [state])
    
console.log('ama donnees', data);
    return (
        <>

            {visible && (
                <Dialog
                    header={`Refus de la demande`}
                    visible={visible}
                    style={{ width: "35vw" }}
                    onHide={hideModal}
                    headerStyle={{ backgroundColor: "#eb7d07" }}
                    headerClassName="text-white text-center"
                >
                    {/* <MotifRejetDialog 
                        onSuccess={() => {
                            setVisible(false);
                            fetchMesDemandes();
                        }}
                        // setVisible={setVisible}
                        candidatureId={candidatId}
                    /> */}
                </Dialog>
            )}

            <Dialog
                header="Motifs du rejet"
                visible={showMotif}
                style={{ width: '40vw' }}
                onHide={() => setShowMotif(false)}
            >
                <p>
                    {data?.motif_rejets?.length > 0 ? (
                        <ul>
                            {data.motif_rejets.map((item, index) => (
                                <li key={index}>
                                    {item.motif?.DESCRIPTION || "Motif non trouvé."}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun motif enregistré.</p>
                    )}
                </p>
            </Dialog>

            <div className="px-4 py-3 main_content">
                {loading ? <div
                    className="shadows p-4 "
                    style={{ border: "solid 1px white" }}
                >
                    <div className="flex mb-3">
                        <Skeleton
                            shape="circle"
                            size="4rem"
                            className="mr-2"
                        ></Skeleton>
                        <div>
                            <Skeleton width="10rem" className="mb-2"></Skeleton>
                            <Skeleton width="5rem" className="mb-2"></Skeleton>
                            <Skeleton height=".5rem"></Skeleton>
                        </div>
                    </div>
                    <Skeleton width="100%" height="100px"></Skeleton>
                </div> : <>
                    <center>
                        <h4>
                            {/* <span className="mx-2 mb-2">
                                {data.statut_validation=='0'?(<Badge value="En attente de validation" severity="warning"></Badge>):null}
                                {data.statut_validation=='1'?(<Badge value="Validé" severity="success"></Badge>):null}
                                {data.statut_validation=='2'?(<Badge value="Refusé" severity="danger"></Badge>):null} 
                            </span> */}
                            {[0, 1, 2].includes(data.statut_validation) && (
                                <>
                                    {data.statut_validation === 0 && (
                                        <Message severity="info" text="Cette événement est en attente de validation." />
                                    )}

                                    {data.statut_validation === 1 && (
                                        <Message severity="success" text="L'événement a été payé validé." />
                                    )}

                                    {data.statut_validation === 2 && (
                                    <>
                                        <Message severity="error" text="Cet événement a été refusée pour etre publié." />
                                    </>
                                    )}
                                </>
                            )}
                        </h4>
                        
                    </center>
                    
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card" style={{ borderRadius: "0px" }}>
                                <TabView>
                        
                                    <TabPanel
                                        header={`Informations generales`}
                                        rightIcon="pi pi-align-left ml-2 mr-2"
                                    >
                                        <InformationsGeneralesModal data={data} />

                                    </TabPanel>
                                    <TabPanel
                                        header={`Tickets`}
                                        rightIcon="pi pi-align-left ml-2 mr-2"
                                    >
                                        <TicketsModal data={data} />

                                    </TabPanel>
                                    <TabPanel
                                        header={`Documents`}
                                        rightIcon="pi pi-file ml-2"
                                    >
                                        {/* <DocumentsExigesDetails documents={data?.documents || []} /> */}

                                    </TabPanel>
                                    <TabPanel
                                        header={`Personnes de contact`}
                                        rightIcon="pi pi-align-left ml-2 mr-2"
                                    >
                                        {/* <PersonnesContactDetails personnes={data?.personnes_contact || []} /> */}

                                    </TabPanel>
                                </TabView>
                                
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button 
                                    label="Refuser la publication" 
                                    onClick={e => showModal(data?.ID_CANDIDATURE)} 
                                    className="p-button-secondary mx-2 mb-2 rounded" 
                                />
                                <Button
                                    label="Valider la publication"
                                    icon={loadingApprouver ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
                                    iconPos="right"
                                    className="p-button-success mx-2 mb-2 rounded"
                                    onClick={handleApprouverClick}
                                    disabled={loadingApprouver}
                                />
                                    

                                {/* {[0, 1, 2].includes(data.statut_validation) && (
                                <>
                                    {data.statut_validation === 0 && (
                                        <Message severity="info" text="Cette événement est en attente de validation." />
                                    )}

                                    {data.statut_validation === 1 && (
                                        <Message severity="success" text="L'événement a été payé validé." />
                                    )}

                                    {data.statut_validation === 2 && (
                                    <>
                                        <Message severity="error" text="Cet événement a été refusée pour etre publié." />
                                    </>
                                    )}
                                </>
                                )} */}
                                
                            </div>
                        </div>
                    </div>
                </>
                }
            </div>
            <ConfirmDialog/>
        </>
    )
}