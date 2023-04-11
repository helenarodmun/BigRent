import { Container } from "react-bootstrap";
import TablaSeries from "../../components/series/TablaSeries";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Listado() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <p className="h1 m-3">Listado series</p>
                <TablaSeries></TablaSeries>
            </div>
        </div>
    );
}
