import { Route } from "react-router-dom";
import GenerateGame from "../../pages/game/GenerateGame";
import ProtectedRouter from "../ProtectedRouter";
import JoinGame from "../../pages/game/JoinGame";
import GameListPage from "../../pages/game/GameListPage";

export const games_routes_items = {
  games: {
    path: "games",
    name: "Jeux",
    component: GenerateGame,
  },

  games_list: {
    path: "game-list",
    name: "Liste des jeux",
    component: GameListPage,
  },

};

let games_routes = [];

for (let key in games_routes_items) {

  const route = games_routes_items[key];

  games_routes.push(
    <Route path={route.path} element={<ProtectedRouter><route.component /></ProtectedRouter>} key={route.path} />
  );
}

export default games_routes;
