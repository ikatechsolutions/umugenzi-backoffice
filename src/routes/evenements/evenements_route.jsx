import { Route } from "react-router-dom";
import ProtectedRouter from "../ProtectedRouter";
import EventListPage from "../../pages/evenements/eventsPages/EventListPage";
import EventDetailsPage from "../../pages/evenements/eventsPages/EventDetailsPage";

export const evenements_routes_items = {

  evenements: {
    path: "evenements",
    name: "Liste des événements",
    component: EventListPage,
  },

  voir_evenement_details: {
    path: "view-details/:id",
    name: "Details",
    component: EventDetailsPage,
  }

};

let evenements_routes = [];

for (let key in evenements_routes_items) {

  const route = evenements_routes_items[key];

  evenements_routes.push(
    <Route path={route.path} element={<ProtectedRouter><route.component /></ProtectedRouter>} key={route.path} />
  );
}

export default evenements_routes;
