import { Container } from "react-bootstrap";
import TablaFamilias from "../../components/familias/TablaFamilias";
import NavBar from "../../components/partials/NavBar";

export default function Listado() {
    return (
        <>
            <Container>
                <NavBar></NavBar>
                <p className="h1 m-3">Listado Familias</p>
                <TablaFamilias></TablaFamilias>
            </Container>
        </>
    );
}
