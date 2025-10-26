import React from "react";
/** Layout pour les pages publics */

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Umugenzi App
        </h1>
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;
