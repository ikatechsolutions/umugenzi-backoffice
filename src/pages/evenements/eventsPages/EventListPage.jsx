import { Link, Outlet } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useApp } from "../../../hooks/useApp";
import fetchApi from "../../../helpers/fetchApi";
import { Menu } from "primereact/menu";
import { evenements_routes_items } from "../../../routes/evenements/evenements_route";
import { Badge } from "primereact/badge";

export default function EventListPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(1);
  const [events, setEvents] = useState([]);
  const [selectedItems, setSelectedItems] = useState(null);
  const [inViewMenuItem, setInViewMenuItem] = useState(null);
  const [addVisible, setAddVisible] = useState(false);

  const { setToastAction } = useApp();

  const menu = useRef(null);

  const { setBreadCrumbAction } = useApp()

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
    search: "",
  });

  const onPage = (event) => {
    setlazyState(event);
  };

  const onSort = (event) => {
    setlazyState(event);
  };

  const onFilter = (event) => {
    event["first"] = 0;
    setlazyState(event);
  };

  const onSelectionChange = (event) => {
    const value = event.value;
    setSelectedItems(value);
    setSelectAll(value.length === totalRecords);
  };

  const onSelectAllChange = (event) => {
    const selectAll = event.checked;

    if (selectAll) {
      setSelectAll(true);
      setSelectedItems(profils);
    } else {
      setSelectAll(false);
      setSelectedItems([]);
    }
  };

  const fetchEvenements = useCallback(async () => {
    try {
      setLoading(true)
      const baseurl = `/evenements?`
      var url = baseurl
      for (let key in lazyState) {
        const value = lazyState[key]
        if (value) {
          if (typeof (value) == 'object') {
            url += `${key}=${JSON.stringify(value)}&`
          } else {
            url += `${key}=${value}&`
          }
        }
      }

      const data = await fetchApi(url);
      setEvents(data);
      setTotalRecords(data.length);
    } catch (response) {
      // console.log(response)

    } finally {
      setLoading(false);
    }
  }, [lazyState]);

  useEffect(() => {

    setBreadCrumbAction([evenements_routes_items.evenements])
    document.title = evenements_routes_items.evenements.name;

    return () => {
      setBreadCrumbAction([]);
    };
  }, []);

  useEffect(() => {
    fetchEvenements();
  }, [lazyState]);
  
// console.log(inViewMenuItem);

  return (
    <>
      <ConfirmDialog closable dismissableMask={true} />

      <div className="px-4 py-3 main_content">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="mb-3">Liste des événements</h1>
        </div>
        <div className="shadow my-2 bg-white p-3 rounded d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="p-input-icon-left">

              <i className="pi pi-search ml-2" />

              <InputText
                type="search"
                placeholder="Recherche"
                className="p-inputtext-sm"
                style={{ minWidth: 250, textIndent: '20px' }}
                onInput={(e) =>
                  setlazyState((s) => ({ ...s, search: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <div className="content">
          <div className="shadow rounded mt-3 pr-1 bg-white">
            <DataTable
              lazy
              value={events}
              tableStyle={{ minWidth: "50rem" }}
              className=""
              paginator
              rowsPerPageOptions={[5, 10, 25, 50]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate={`Affichage de {first} à {last} dans ${totalRecords} éléments`}
              emptyMessage="Aucun événement trouvé"
              first={lazyState.first}
              rows={lazyState.rows}
              totalRecords={totalRecords}
              onPage={onPage}
              onSort={onSort}
              sortField={lazyState.sortField}
              sortOrder={lazyState.sortOrder}
              onFilter={onFilter}
              filters={lazyState.filters}
              loading={loading}
              selection={selectedItems}
              onSelectionChange={onSelectionChange}
              selectAll={selectAll}
              onSelectAllChange={onSelectAllChange}
              reorderableColumns
              resizableColumns
              columnResizeMode="expand"
              paginatorClassName="rounded"
              scrollable
            >
              <Column
                // selectionMode="multiple"
                frozen
                headerStyle={{ width: "3rem" }}
              />
              <Column
                field="titre"
                header="Titre"
                sortable
              />
              <Column
                field="categorie_id"
                header="Catégorie"
                sortable
                body={(item) => {
                    return (
                        <span>
                            {item?.categorie?.nom}
                        </span>
                    );
                }}
              />
              <Column
                field="date_event"
                header="Date d'événement'"
                sortable
                body={(item) => {
                    return (
                        <span>
                        {item?.date_event ? (
                            new Intl.DateTimeFormat("fr-FR", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit"
                            }).format(new Date(item.date_event))
                        ) : (
                            "Date non disponible"  // Afficher un message alternatif si la date est invalide
                        )}
                        </span>
                    );
                }}
              />
              <Column
                frozen
                header="Statut validation"
                body={(item) => {
                    return (
                        <span>
                        {item.statut_validation=='0'?(<Badge value="En attente" severity="warning"></Badge>):null}
                        {item.statut_validation=='1'?(<Badge value="Validé" severity="success"></Badge>):null}
                        {item.statut_validation=='2'?(<Badge value="Refusé" severity="danger"></Badge>):null} 
                        </span>
                    );
                }}
              />
              <Column
                frozen
                header="Statut paiement"
                body={(item) => {
                    return (
                        <span>
                        {item.statut_payment=='0'?(<Badge value="Non payé" severity="danger"></Badge>):null}
                        {item.statut_payment=='1'?(<Badge value="Payé" severity="success"></Badge>):null}
                        </span>
                    );
                }}
              />
              <Column
                frozen
                header="Statut événement"
                body={(item) => {
                    return (
                        <span>
                        {item.statut_event=='0'?(<Badge value="En cours" severity="success"></Badge>):null}
                        {item.statut_event=='1'?(<Badge value="Terminé" severity="danger"></Badge>):null}
                        </span>
                    );
                }}
              />
              <Column
                field=""
                header="Actions"
                alignFrozen="right"
                frozen
                body={(item) => {
                  let items = [
                        {
                        label: 'Plus de details',
                        items: [
                        {
                            label: 'Détail',
                            icon: 'pi pi-eye',
                            template: item => (
                            <div className='p-menuitem-content px-3'>
                                <Link to={`/view-details/${inViewMenuItem?.id}`} className="flex align-items-center p-2" style={{ textDecoration: "none", color: '#3d3d3d' }}>
                                <span className={item.icon} />
                                <span className="mx-2">{item.label}</span>
                                </Link>
                            </div>
                            )
                        },
                        ]
                        },
                    ];
                  return (
                    <>
                      <Menu model={items} onHide={() => setInViewMenuItem(null)} popup ref={menu} id="popup_menu_right" popupAlignment="right" />

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
      <Outlet />
    </>
  );
}
