import { Container } from "react-bootstrap";
import TablaSeries from "../../components/series/TablaSeries";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Listado() {
    return (
        <div style={{ display: "flex"}}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <TablaSeries></TablaSeries>
            </div>
        </div>
    );
}
