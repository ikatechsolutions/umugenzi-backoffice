import { Route } from "react-router-dom";
import ProtectedRouter from "../ProtectedRouter";
import TicketListPage from "../../pages/evenements/tickets/TicketListPage";

export const tickets_routes_items = {

  tickets: {
    path: "tickets",
    name: "Liste des tickets",
    component: TicketListPage
    ,
  },

};

let tickets_routes = [];

for (let key in tickets_routes_items) {

  const route = tickets_routes_items[key];

  tickets_routes.push(
    <Route path={route.path} element={<ProtectedRouter><route.component /></ProtectedRouter>} key={route.path} />
  );
}

export default tickets_routes;
