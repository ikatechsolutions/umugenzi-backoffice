import { Skeleton } from "primereact/skeleton";

export default function DashboardSkeletons() {
    const statCardColor = "#e8f5e9"
    const barColors = ["#bbdefb", "#c8e6c9", "#ffe082", "#b2dfdb", "#f48fb1"];
    return (
        <div className="container py-3 px-4">
            {/** Titre + filtres */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Skeleton width="12rem" height="2rem" />
                <div className="d-flex gap-2">
                    <Skeleton width="6rem" height="1.5rem" />
                    <Skeleton width="6rem" height="1.5rem" />
                    <Skeleton width="6rem" height="1.5rem" />
                </div>
            </div>

            {/** Statistiques principales */}
            <div className="row mb-4">
                {[1, 2, 3].map((_, i) => (
                    <div className="col-md-4 mb-3" key={i}>
                        <div 
                            className="card p-3 shadow-sm" 
                            style={{ 
                                backgroundColor: statCardColor,
                                borderRadius: 10,
                                border: "1px solid #c8e6c9" 
                            }}
                        >
                            <Skeleton width="50%" height="1rem" className="mb-2" />
                            <Skeleton width="80%" height="2rem" />
                        </div>
                    </div>
                ))}
            </div>

            {/** Graphique avec barres */}
            <div className="card p-6 shadow-sm mb-4" style={{ borderRadius: 10 }}>
                <Skeleton width="150px" height="1.5rem" className="mb-3" />
                <div className="d-flex align-items-end justify-content-between" style={{ height: 200 }}>
                    {[40, 70, 100, 60, 90].map((h, i) => (
                        <div key={i} className="d-flex flex-column align-items-center mx-2">
                            <div
                                style={{
                                    width: 30,
                                    height: h,
                                    borderRadius: 6,
                                    backgroundColor: barColors[i],
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                                }}
                            />
                            <Skeleton width="30px" height="1rem" className="mt-2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}