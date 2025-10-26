import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import Dashboard from "../pages/Admin/Dashboard";
import Login from "../pages/Auth/Login";
import ProtectedRouter from "./ProtectedRouter";
import ForbiddenPage from "../pages/ForbiddenPage";
import NotFoundPage from "../pages/NotFoundPage";
import games_routes from "./games/generategame_router";
import joingames_routes from "./games/joingames_route";
import JoinGame from "../pages/game/JoinGame";
import categories_routes from "./evenements/categories_route";
import evenements_routes from "./evenements/evenements_route";
import tickets_routes from "./tickets/tickets_routes";

export default function RoutesProvider() {
    return (
        <Routes>
            <Route path="/" element={< AppLayout />}>

                {games_routes}
                {categories_routes}
                {evenements_routes}
                {tickets_routes}
                <Route path="/dashboard" element={<ProtectedRouter><Dashboard /></ProtectedRouter>} />
                <Route path="/forbidden" element={<ProtectedRouter><ForbiddenPage /></ProtectedRouter>} />
            </Route>

            {/* {joingames_routes} */}
            <Route path="/join/game/:groupeId" index element={<JoinGame />} />
            <Route path="/" index element={<Login />} />

            <Route path="*" element={<NotFoundPage />} /> 
        </Routes>
    );
}