import { Link, Outlet } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Menu } from "primereact/menu";
// import NewFaculteModal from "./components/NewFaculteModal";
import { Badge } from "primereact/badge";
import { Dialog } from "primereact/dialog";
// import ExigenceFaculteListModal from "./components/ExigenceFaculteListModal";
// import NewExigenceFaculteModal from "./components/NewExigenceFaculteModal";
import { useApp } from "../../hooks/useApp";
import fetchApi from "../../helpers/fetchApi";
import { games_routes_items } from "../../routes/games/generategame_router";
import JoueursListModal from "./modales/JoueursListModal";

export default function GameListPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(1);
  const [games, setGames] = useState([]);
  const [selectedItems, setSelectedItems] = useState(null);
  const [inViewMenuItem, setInViewMenuItem] = useState(null);
  const [addVisible, setAddVisible] = useState(false);
  const [exigenceIsVisible, setExigenceIsVisible] = useState(false)
  const [idGame, setIdGame] = useState()
  const [isVisible, setIsVisible] = useState(false)
  const [id, setId] = useState()


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

  //-- Pour les exigences de facultés --//
  const showExigencesModal = (id) => {
    setExigenceIsVisible(true)
    setIdGame(id)
  }

  const hideExigenceModal = () => {
    setExigenceIsVisible(false)
  }
  //------------------------------------//

  //-- Pour ajout des exigences de facultés --//
  const showModal = (id) => {
    setIsVisible(true)
    setId(id)
  }

  const hideModal = () => {
    setIsVisible(false)
  }
  //------------------------------------//

  const handleDeletePress = (e, itemsids) => {
    e.preventDefault();
    e.stopPropagation();
    confirmDialog({
      header: "Supprimer ?",
      message: (
        <div className="d-flex flex-column align-items-center">
          {inViewMenuItem ? (
            <>
              <div className="font-bold text-center my-2">
                {inViewMenuItem?.DESCRIPTION}
              </div>
              <div className="text-center">
                Voulez-vous vraiment supprimer ?
              </div>
            </>
          ) : (
            <>
              <div className="text-muted">
                {selectedItems ? selectedItems.length : "0"} selectionné
                {selectedItems?.length > 1 && "s"}
              </div>
              <div className="text-center">
                Voulez-vous vraiment supprimer les éléments selectionnés ?
              </div>
            </>
          )}
        </div>
      ),
      acceptClassName: "p-button-danger",
      accept: () => {
        deleteItems(itemsids);
      },
    });
  };

  const fetchGames = useCallback(async () => {
    try {
      setLoading(true)
      const baseurl = `/groupes?`
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

      const { data } = await fetchApi(url);
      console.log(data);
      
      setGames(data);
      setTotalRecords(data.total);
    } catch (response) {
      // console.log(response)

    } finally {
      setLoading(false);
    }
  }, [lazyState]);

  useEffect(() => {

    setBreadCrumbAction([games_routes_items.games_list])
    document.title = games_routes_items.games_list.name;

    return () => {
      setBreadCrumbAction([]);
    };
  }, []);

  useEffect(() => {
    fetchGames();
  }, [lazyState]);

  return (
    <>
      <ConfirmDialog closable dismissableMask={true} />

      {/* {addVisible && <NewFaculteModal visible={addVisible} setVisible={setAddVisible} data={inViewMenuItem} fetchFacultes={fetchFacultes} />} */}
      {exigenceIsVisible && (
        <Dialog
          header={`Joueurs`}
          visible={exigenceIsVisible}
          onHide={hideExigenceModal}
          style={{width: "30vw"}}
          headerStyle={{backgroundColor:"#49a0ebff"}}
          headerClassName="text-white text-center"
        >
          <JoueursListModal
              setExigenceIsVisible={setExigenceIsVisible}
              idGame={idGame} 
          />
        </Dialog>
      )}
      {/*{isVisible && (
          <Dialog
              header="Ajout une éxigence"
              visible={isVisible}
              onHide={hideModal}
              style={{ width: "50vw" }}
              headerStyle={{ backgroundColor: "#facc15" }}
              headerClassName="text-white text-center"
          >
              <NewExigenceFaculteModal
                  setIsVisible={setIsVisible}
                  id={id}
                  fetchFacultes={fetchFacultes}
              />
          </Dialog>
      )} */}

      <div className="px-2 py-3" style={{ maxHeight: "90vh", overflow: "auto" }}>
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="mb-3">Liste des jeux</h1>
          {/* <Button
            label="Nouveau"
            className="bg-yellow-400 rounded-button"
            icon="pi pi-plus"
            size="small"
            onClick={() => setAddVisible(true)}
          /> */}
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
              value={games}
              tableStyle={{ minWidth: "50rem" }}
              className=""
              paginator
              rowsPerPageOptions={[5, 10, 25, 50]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate={`Affichage de {first} à {last} dans ${totalRecords} éléments`}
              emptyMessage="Aucun jeu trouvé"
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
                selectionMode="multiple"
                frozen
                headerStyle={{ width: "3rem" }}
              />
              <Column
                field="name"
                header="name"
                sortable
              />
              <Column
                header="Joueurs"
                body={(item) => {
                  return (
                    <a href="#" onClick={e => showExigencesModal(item.id)}>
                      <Badge value="Voir" style={{ color: "whiteblue" }}/>
                    </a>
                  )
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