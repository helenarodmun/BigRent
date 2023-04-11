import { Container } from "react-bootstrap";
import TablaFamilias from "../../components/familias/TablaFamilias";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Listado() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <p className="h1 m-3">Listado Familias</p>
                <TablaFamilias></TablaFamilias>
            </div>
        </div>
    );
}
