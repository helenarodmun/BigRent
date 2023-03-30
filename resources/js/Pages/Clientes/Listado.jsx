import TablaClientes from "../../components/clientes/TablaClientes";
import NavBar from "../../components/partials/NavBar";

export default function Index() {
    return (
        <>
            <div>
                <NavBar></NavBar>
                <TablaClientes></TablaClientes>
            </div>
        </>
    );
}
