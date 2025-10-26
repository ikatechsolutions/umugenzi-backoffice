import { Route } from "react-router-dom";
import JoinGame from "../../pages/game/JoinGame";
import PublicLayout from "../../components/layouts/PublicLayout";

export const joingames_routes_items = {

  join_games: {
    path: "join/game/groupeId",
    name: "Game",
    component: JoinGame,
  },

};

let joingames_routes = [];

for (let key in joingames_routes_items) {

  const route = joingames_routes_items[key];

  joingames_routes.push(
    <Route path={route.path} element={<PublicLayout><route.component /></PublicLayout>} key={route.path} />
  );
}

export default joingames_routes;
