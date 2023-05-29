import TablaContratos from "../../components/contratos/TablaContratos";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Listado() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <TablaContratos></TablaContratos>
            </div>
        </div>
    );
}