import { Container } from "react-bootstrap";
import TablaSeries from "../../components/series/TablaSeries";
import NavBar from "../../components/partials/NavBar";

export default function Listado() {
    return (
        <>
            <Container>
                <NavBar></NavBar>
                <p className="h1 m-3">Listado series</p>
                <TablaSeries></TablaSeries>
            </Container>
        </>
    );
}
