import TablaClientes from "../../components/clientes/TablaClientes";
import NavBar from "../../components/partials/NavBar";

export default function Listado() {
    return (
        <>
            <div>
                <NavBar></NavBar>
                <TablaClientes></TablaClientes>
            </div>
        </>
    );
}
