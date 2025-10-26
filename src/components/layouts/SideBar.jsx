import { useApp } from "../../hooks/useApp";
import "../../styles/sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FormattedMessage } from "react-intl";
import Logo from "../../assets/images/Umugenzi-Logo.png";

export default function SideBar() {
  const { setToastAction } = useApp();
  const { handleLogout, user } = useAuth();

  const toggleSubMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.toggle("collapse-show");
  };

  const onLogout = (e) => {
    e.stopPropagation();
    e.preventDefault();

    handleLogout();

    setToastAction({
      severity: "success",
      summary: "Success",
      detail: "Utilisateur déconnecté avec succés",
      life: 3000,
    })
  }

  return (
    <aside className="sidebar d-flex flex-column justify-content-between shadow z-1">
      <Link
        to={"/dashboard"}
        className="d-flex flex-column align-items-center px-3 py-2 text-decoration-none link-dark"
      >
        <img
          src={Logo}
          alt=""
          className="logo"

        />
        {/* <img src={'/vite.svg?url'} alt="" className="logo" /> */}
        {/* <h6 className="mx-2 mb-0">UMUGENZI - EVENTS</h6> */}
      </Link>

      <nav className={`px-2 flex-fill pt-3`} id="side_color">
        {/* Menu Administration */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#administration"
            role="button"
            aria-expanded="false"
            aria-controls="administration"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                  </svg>
                </div>
                <span className="menu-title">Administration du système</span>
              </div>

              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>
        {/* Fin Menu Administration */}

        {/* Sous-menu Administration */}
        <div className="sub-menus collapse" id="administration">

          {!user.hasPermission('profils') && <div className="nav-item">
            <NavLink
              to={"profils"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block text-white"
                  : "text-decoration-none rounded d-block text-white"
              }
              href="/profils"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Profils</span>
                </div>
              </div>
            </NavLink>
          </div>}

        </div>
        {/* Fin Sous-menu Administrations */}

        {/* Menu Evenement */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#evenement"
            role="button"
            aria-expanded="false"
            aria-controls="game"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">
              <div className="d-flex align-items-center justify-content-between">
                {/* <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-8 h-8">
                    <path strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M6.75 3h10.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5H6.75A1.5 1.5 0 0 1 5.25 19.5v-15A1.5 1.5 0 0 1 6.75 3Zm0 0h10.5m-7.5 4.5h.008v.008H9.75V7.5Zm4.5 0h.008v.008H14.25V7.5Zm-4.5 4.5h.008v.008H9.75V12Zm4.5 0h.008v.008H14.25V12Zm-4.5 4.5h.008v.008H9.75V16.5Zm4.5 0h.008v.008H14.25V16.5Z" />
                  </svg>
                </div> */}

                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-8 h-8">
                    <path strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M6.75 3v1.5m10.5-1.5V4.5M3.75 8.25h16.5M4.5 6.75h15a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5z" />
                  </svg>
                </div>

                <span className="menu-title">Gestion des événements</span>
              </div>

              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>
        {/* Fin Menu Evenement */}

        {/* Sous-menu Evenement */}
        <div className="sub-menus collapse" id="evenement">

          {!user.hasPermission('categories') && <div className="nav-item">
            <NavLink
              to={"categorie-list"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block text-white"
                  : "text-decoration-none rounded d-block text-white"
              }
              href="/categorie-list"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Catégories</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('evenements') && <div className="nav-item">
            <NavLink
              to={"evenements"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block text-white"
                  : "text-decoration-none rounded d-block text-white"
              }
              href="/evenements"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Evénements</span>
                </div>
              </div>
            </NavLink>
          </div>}

        </div>
        {/* Fin Sous-menu Evenement */}

        {/* Menu Evenement */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#ticket"
            role="button"
            aria-expanded="false"
            aria-controls="game"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">
              <div className="d-flex align-items-center justify-content-between">
                {/* <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-8 h-8">
                    <path strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M6.75 3h10.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5H6.75A1.5 1.5 0 0 1 5.25 19.5v-15A1.5 1.5 0 0 1 6.75 3Zm0 0h10.5m-7.5 4.5h.008v.008H9.75V7.5Zm4.5 0h.008v.008H14.25V7.5Zm-4.5 4.5h.008v.008H9.75V12Zm4.5 0h.008v.008H14.25V12Zm-4.5 4.5h.008v.008H9.75V16.5Zm4.5 0h.008v.008H14.25V16.5Z" />
                  </svg>
                </div> */}

                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-8 h-8">
                    <path strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M6.75 3v1.5m10.5-1.5V4.5M3.75 8.25h16.5M4.5 6.75h15a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5z" />
                  </svg>
                </div>

                <span className="menu-title">Gestion des tickets</span>
              </div>

              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>
        {/* Fin Menu Evenement */}

        {/* Sous-menu Evenement */}
        <div className="sub-menus collapse" id="ticket">

          {!user.hasPermission('tickets') && <div className="nav-item">
            <NavLink
              to={"tickets"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block text-white"
                  : "text-decoration-none rounded d-block text-white"
              }
              href="/tickets"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Liste des tickets</span>
                </div>
              </div>
            </NavLink>
          </div>}
          
        </div>
        {/* Fin Sous-menu Evenement */}

        {/* Menu Game */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#game"
            role="button"
            aria-expanded="false"
            aria-controls="game"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-8 h-8">
                    <path strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M6.75 3h10.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5H6.75A1.5 1.5 0 0 1 5.25 19.5v-15A1.5 1.5 0 0 1 6.75 3Zm0 0h10.5m-7.5 4.5h.008v.008H9.75V7.5Zm4.5 0h.008v.008H14.25V7.5Zm-4.5 4.5h.008v.008H9.75V12Zm4.5 0h.008v.008H14.25V12Zm-4.5 4.5h.008v.008H9.75V16.5Zm4.5 0h.008v.008H14.25V16.5Z" />
                  </svg>
                </div>
                <span className="menu-title">Gestion des jeux</span>
              </div>

              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>
        {/* Fin Menu Game */}

        {/* Sous-menu Game */}
        <div className="sub-menus collapse" id="game">

          {!user.hasPermission('games') && <div className="nav-item">
            <NavLink
              to={"games"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block text-white"
                  : "text-decoration-none rounded d-block text-white"
              }
              href="/games"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Créer un jeu</span>
                </div>
              </div>
            </NavLink>
          </div>}

          {!user.hasPermission('games') && <div className="nav-item">
            <NavLink
              to={"game-list"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block text-white"
                  : "text-decoration-none rounded d-block text-white"
              }
              href="/game-list"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Liste des jeux</span>
                </div>
              </div>
            </NavLink>
          </div>}

        </div>
        {/* Fin Sous-menu Games */}

        {/* Dashboard */}
        <div className="nav-item">
          <a
            onClick={toggleSubMenu}
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#Dashboard"
            role="button"
            aria-expanded="false"
            aria-controls="Dashboard"
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">

              <div className="d-flex align-items-center justify-content-between">
                <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>

                </div>
                <span className="menu-title">Dashboard</span>
              </div>
              <div className="down_caret">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                //   color="white"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>
        {/* sous menu Dashboard */}
        <div className="sub-menus collapse" id="Dashboard">

          {!user.hasPermission('Dashboard') && <div className="nav-item">
            <NavLink
              to={"Dashboard"}
              className={({ isActive }) =>
                isActive
                  ? "admin text-decoration-none rounded d-block"
                  : "text-decoration-none rounded d-block"
              }
              href="/Dashboard"
            >
              <div className="d-flex align-items-center justify-content-between py-2 px-3">
                <div className="d-flex align-items-center justify-content-between text-white">
                  <div className="menu-icon"></div>
                  <span className="menu-title">Dashboard</span>
                </div>
              </div>
            </NavLink>
          </div>}
          
        </div>
        {/* fin sous menu */}
        {/* fin */}
      </nav>

      {/* <div className="aside-footer px-2 py-3" id="side_color">
        <hr />

        <div className="nav-item">
          <a
            className="text-decoration-none rounded d-block"
            data-bs-toggle="collapse"
            href="#rapport"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
            onClick={onLogout}
          >
            <div className="d-flex align-items-center justify-content-between py-2 px-3">
              <div className="d-flex align-items-center justify-content-between text-white">
                <div className="menu-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                    />
                  </svg>
                </div>
                <span className="menu-title">Déconnexion</span>
              </div>
            </div>
          </a>
        </div>
      </div> */}
    </aside>
  );
}