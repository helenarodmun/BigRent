import FormActualizaAutorizado from "../../components/clientes/FormActualizaAutorizado";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Autorizados() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <FormActualizaAutorizado></FormActualizaAutorizado>
            </div>
        </div>
    );
}
