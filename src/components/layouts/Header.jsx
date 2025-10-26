import "../../styles/header.css";
import { Button } from "primereact/button";
import BreadCrumb from "./BreadCrumb";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import { useApp } from "../../hooks/useApp";
import { Avatar } from "primereact/avatar";
// import FR from '@/assets/FR.png'
// import EN from '@/assets/EN.png'
import { FormattedDate } from "react-intl";

export default function Header() {
  const profilRef = useRef();
  const localeRef = useRef();
  const location = useLocation()
  const navigate = useNavigate();

  const [time, setTime] = useState(Date.now());

  const { user, handleLogout } = useAuth()
  const { setToastAction, locale, setLocale } = useApp();


  const onLogout = e => {

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

  const handleLocaleChange = (e, locale) => {
    setLocale(locale);
    localeRef.current.toggle(e);
  }

//   const localeItems = [
//     {
//       template: () => {
//         return (
//           <div
//             className="flex align-items-center p-menuitem-content px-3"
//             onClick={(e) => handleLocaleChange(e, "fr")}
//             style={{
//               height: "50px",
//               padding: 5,
//               cursor: "pointer",
//             }}
//           >
//             <img
//               alt="Français"
//               src={FR}
//               className={`flag flag-FR`}
//               style={{ width: "30px", height: "30px" }}
//             />
//             <div className="ml-2">Français</div>
//           </div>
//         );
//       },
//     },
//     {
//       template: () => {
//         return (
//           <div
//             className="flex align-items-center p-menuitem-content px-3"
//             onClick={(e) => handleLocaleChange(e, "en")}
//             style={{ height: "50px", padding: 5, cursor: "pointer" }}
//           >
//             <img
//               alt="English"
//               src={EN}
//               className={`flag flag-EN`}
//               style={{ width: "30px", height: "30px" }}
//             />
//             <div className="ml-2">English</div>
//           </div>
//         );
//       },
//     },
//   ];

  const profilItems = [
    // {
    //   label: 'Voir mon profil',
    //   icon: 'pi pi-eye',
    //   shortcut: '⌘+Q',
    //   template: item => (
    //     <div className='p-menuitem-content px-3'>
    //       <Link to={`utilisateurs/profil/${user.data?.ID_UTILISATEUR}`} className="flex align-items-center p-2" style={{ textDecoration: "none", color: '#3d3d3d' }}>
    //         <span className={item.icon} />
    //         <span className="mx-2">{item.label}</span>
    //       </Link>
    //     </div>
    //   )
    // },
    {
      label: 'Modifier mon profil',
      icon: 'pi pi-user-edit',
      shortcut: '⌘+Q',
      template: item => (
        <div className='p-menuitem-content px-3'>
          <Link to={'/auth/edit-profil'} state={{ ID_utilisateur: user.data?.ID_UTILISATEUR }} className="flex align-items-center p-2" style={{ textDecoration: "none", color: '#3d3d3d' }}>
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
          </Link>
        </div>
      )
    },
    {
      label: 'Changer le mot de passe',
      icon: 'pi pi-key',
      shortcut: '⌘+Q',
      template: item => (
        <div className='p-menuitem-content px-3'>
          <Link to={'/auth/change-password'} state={{ ID_utilisateur: user.data?.ID_UTILISATEUR }} className="flex align-items-center p-2" style={{ textDecoration: "none", color: '#3d3d3d' }}>
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
          </Link>
        </div>
      )
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      shortcut: '⌘+Q',
      template: item => (
        <div className='p-menuitem-content px-3'>
          <Link onClick={onLogout} className="flex align-items-center p-2 text-danger font-bold" style={{ textDecoration: "none", color: '#3d3d3d' }}>
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
          </Link>
        </div>
      )
    },
    {
      separator: true
    },
    {
      template: (item, options) => {
        return (
          <button onClick={(e) => navigate('/auth/view-profil', { state: { ID_utilisateur: user.data?.ID_UTILISATEUR } })} className={'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround'}>
            {
              user?.data?.IMAGE ?
                <Avatar image={`${user.data.IMAGE}`} className="mr-2" shape="circle" />
                : <Avatar icon="pi pi-user" shape="circle" />
            }

            <div className="flex flex-column ml-2">
              <span className="font-bold">{user.data?.user?.name}</span>
              {/* <span className="text-sm">{user.data?.user?.name}</span> */}
            </div>
          </button>
        );
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => { setTime(Date.now()) }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (profilRef.current) {
      profilRef.current.hide(document);
    }
  }, [location])

  return (
    <header className="d-flex align-items-center justify-content-between px-4">
      <div className="d-flex align-items-center">
        {/* <div className="text-muted" style={{ fontSize: '.925rem' }}>
          <span>
            <FormattedDate
              value={new Date(time)}
              weekday="long"
              year="numeric"
              month="short"
              day="2-digit"
              hour="2-digit"
              second="2-digit"
              minute="2-digit"
            />
          </span>
        </div> */}
        <BreadCrumb />
      </div>

      <div className="flex align-items-center py-2">

        {/* <Button
          rounded
          text
          aria-label="Notifications"
          size="small"
          className="mx-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-bell"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>

          <Badge
            size={"normal"}
            value="8"
            severity="danger"
            style={{
              position: "absolute",
              top: 0,
            }}
          ></Badge>
        </Button> */}

        {/* <Button
          rounded
          text
          aria-label="Translate"
          size="small"
          className="mx-1"
          onClick={(e) => {
            localeRef.current.toggle(e);
          }}
        >
          {locale === "fr" ? (
            <img
              alt="Français"
              src={FR}
              className={`flag flag-FR`}
              style={{ width: "30px", height: "30px" }}
            />
          ) : (
            <img
              alt="English"
              src={EN}
              className={`flag flag-EN`}
              style={{ width: "30px", height: "30px" }}
            />
          )}
        </Button> */}

        {/* <Menu ref={localeRef} model={localeItems} popup style={{ fontSize: '.925rem' }} /> */}

        <button className="btn p-0 avatar mx-2" onClick={(e) => {
          profilRef.current.toggle(e);
        }}>
          {user?.data?.IMAGE
            ? <img src={`${user.data.IMAGE}`} alt="" className="" />
            : <Avatar icon="pi pi-user" shape="circle" />}
        </button>

        <Menu model={profilItems} popup ref={profilRef} id="popup_menu_right" popupAlignment="right" style={{ fontSize: '.925rem' }} />
      </div>
    </header>
  );
}
