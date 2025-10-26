export default function TicketsModal(props) {

    return (
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th>Type Ticket</th>
                    <th>Prix</th>
                    <th>Quantité disponible</th>
                </tr>
            </thead>

            <tbody>
                {props?.data?.typetickets?.length > 0 ? (
                    props.data.typetickets.map((ticket, index) => (
                        <tr key={index}>
                            <td style={{ textTransform: "capitalize" }}>{ticket?.nom}</td>
                            <td>{ticket?.prix?.toLocaleString()} BIF</td>
                            <td>{ticket?.tickets?.[0]?.quantite ?? 0}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center text-muted">
                        Aucun type de ticket disponible
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
