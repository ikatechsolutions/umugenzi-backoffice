import { Route } from "react-router-dom";
import GenerateGame from "../../pages/game/GenerateGame";
import ProtectedRouter from "../ProtectedRouter";
import CategorieListPage from "../../pages/evenements/categories/CategorieListPage";

export const categories_routes_items = {

  categorie_list: {
    path: "categorie-list",
    name: "Liste des categories",
    component: CategorieListPage,
  },

};

let categories_routes = [];

for (let key in categories_routes_items) {

  const route = categories_routes_items[key];

  categories_routes.push(
    <Route path={route.path} element={<ProtectedRouter><route.component /></ProtectedRouter>} key={route.path} />
  );
}

export default categories_routes;
