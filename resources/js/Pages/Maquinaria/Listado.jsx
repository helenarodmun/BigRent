import { Container } from "react-bootstrap";
import TablaMaquinas from "../../components/maquinas/TablaMaquinas";
import NavBar from "../../components/partials/NavBar";

export default function Listado() {
    return (
        <>
            <div>
                <NavBar></NavBar>
                <p className="h1 m-3">Listado maquinaria</p>
                <TablaMaquinas></TablaMaquinas>
            </div>
        </>
    );
}
