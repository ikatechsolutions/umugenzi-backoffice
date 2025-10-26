import React, { useEffect, useState } from "react"
import DashboardSkeletons from "../../components/skeletons/DashboardSkeletons";


export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(null);
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading || !data) {
    return <DashboardSkeletons />
  }

  // useEffect(() => {
  //       document.title = 'Dashboard';
  //   }, [])

  return (
    <div>
      <h3>Dashboard</h3>
      {/* Affichage des données réel ici */}
    </div>
  );
}