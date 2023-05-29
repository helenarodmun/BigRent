import Listado from "../../components/contratos/Listado";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Todos() {
    return (
        <div style={{ display: "flex"}}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <Listado></Listado>
            </div>
        </div>
    );
}