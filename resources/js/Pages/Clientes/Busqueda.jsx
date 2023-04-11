import BuscaCliente from "../../components/clientes/BuscaCliente";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Listado() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <BuscaCliente></BuscaCliente>
            </div>
        </div>
    );
}
