import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-3 bg-light border-top mt-auto">
      <small className="text-muted">
        &copy; {new Date().getFullYear()} UMUGENZI - Tous droits réservés.
      </small>
    </footer>
  );
};

export default Footer;
