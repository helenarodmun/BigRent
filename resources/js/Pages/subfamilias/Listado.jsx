import { Container } from "react-bootstrap";
import TablaSubfamilias from "../../components/subfamilias/TablaSubfamilias";
import NavBar from "../../components/partials/NavBar";

export default function Listado() {
    return (
        <>
            <div>
                <NavBar></NavBar>
                <p className="h1 m-3">Listado subfamilias</p>
                <TablaSubfamilias></TablaSubfamilias>
            </div>
        </>
    );
}
