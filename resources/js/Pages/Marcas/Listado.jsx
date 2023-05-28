import { Container } from "react-bootstrap";
import TablaMarcas from "../../components/marcas/TablaMarcas";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Listado() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <TablaMarcas></TablaMarcas>
            </div>
        </div>
    );
}
