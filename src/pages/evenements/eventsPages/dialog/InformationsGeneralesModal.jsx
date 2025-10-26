import { formatDate } from "../../../../helpers/formatter";

export default function InformationsGeneralesModal(props) {
    
    return <table className="table table-hover table-striped">
        <tbody>
            <tr>
                <th> {`Titre`}</th>
                <td colSpan="2" style={{ textTransform: "capitalize" }}>
                    {props.data?.Titre}
                </td>
            </tr>

            <tr>
                <th> {`Description`}</th>
                <td colSpan="2" style={{ textTransform: "capitalize" }}>
                    {props.data?.description}
                </td>
            </tr>

            <tr>
                <th> {`Place`}</th>
                <td colSpan="2">
                    {props.data?.place}
                </td>
            </tr>

            <tr>
                <th> {`Date d'événement'`}</th>
                <td colSpan="3">{props.data?.date_event ? formatDate(new Date(props.data?.date_event)) : '-'}</td>
            </tr>

            <tr>
                <th> {`Heure`}</th>
                <td colSpan="3">{props.data?.heure}</td>
            </tr>

        </tbody>
    </table>
}