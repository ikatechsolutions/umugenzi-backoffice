import { Link, Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import fetchApi from "../../../helpers/fetchApi";
import Loading from "../../../components/layouts/Loading";

export default function JoueursListModal({ idGame }) {
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(1);
    const [joueursGames, setJoueursGames] = useState([])
    const [globalLoading, setGloabalLoading] = useState(false)


    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
    });

    const fetchJoueursGames = useCallback(async () => {
        try {
            setLoading(true)
            const baseurl = `/groupes/${idGame}/games`;
            const params = new URLSearchParams({ faculte: idGame })
            
            for (let key in lazyState) {
                const value = lazyState[key];
                if (value !== undefined && value !== null) {
                    params.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
                }
            }

            const url = `${baseurl}?${params.toString()}`;
            const res = await fetchApi(url)
           
            setJoueursGames(res)
            setTotalRecords(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [lazyState])

    useEffect(() => {
        fetchJoueursGames()
    }, [lazyState]);
    return (
        <>
            <ConfirmDialog closable dismissableMask={true} />
            {globalLoading && <Loading />}
            <div className="">
                
                {/* <div className="content">
                    <div className="shadow rounded mt-3 pr-1 bg-white"> */}
                        <DataTable
                           lazy
                           value={joueursGames}
                        //    tableStyle={{ minWidth: "25rem" }}
                        //    paginator
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate={`Affichage de {first} à {last} dans ${totalRecords} éléments`}
                           emptyMessage="Aucun joueur trouvé"
                           first={lazyState.first}
                           rows={lazyState.rows}
                           totalRecords={totalRecords}
                           onPage={(e) => {
                             console.log(e);
                             setLazyState(e);
                           }}
                           onSort={setLazyState}
                           sortField={lazyState.sortField}
                           sortOrder={lazyState.sortOrder}
                        //    onFilter={onFilter}
                           loading={loading}
                           reorderableColumns
                           resizableColumns
                           columnResizeMode="expand"
                           paginatorClassName="rounded"
                           scrollable
                        // size="normal"
                        >

                            <Column field="candidat" frozen header="nom complet" body={item => {
                                return (
                                    <span>{item?.candidat}</span>
                                )
                            }} /> 
                            
                            
                        </DataTable>
                    {/* </div>
                </div> */}
            </div>
            <Outlet />
        </>
    )
}