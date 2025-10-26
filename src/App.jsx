import React, { useContext, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { Toast } from "primereact/toast";
import RoutesProvider from "./routes/RoutesProvider";
import { history } from "./helpers/history";
import { useApp } from "./hooks/useApp";
import frenchMessages from './locales/fr.json';
import englishMessages from './locales/en.json';
import "./App.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

import "/node_modules/primeflex/primeflex.css";
import 'primeicons/primeicons.css';

const App = () => {
  const toastRef = useRef(null);
  const { toast: appToast, setToastAction, locale } = useApp();

  history.navigate = useNavigate();
  history.toast = toastRef;

  useEffect(() => {
    if (appToast) {
      toastRef.current.show(appToast);
    }
  }, [appToast]);
  return (
      <IntlProvider
        messages={locale === 'fr' ? frenchMessages : englishMessages}
        locale={locale}
        defaultLocale="en"
      >
        <Toast
           ref={toastRef}
           position="top-center"
           onHide={() => {
            setToastAction(null);
           }}
        />

        <RoutesProvider />

      </IntlProvider>
  )
}

export default App