import { usePage } from "@inertiajs/react";
import { Col, Container } from "react-bootstrap";
import TablaMaquinas from "../../components/maquinas/TablaMaquinas";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Listado() {
    const { flash } = usePage().props;
    return (
        <div style={{ display: "flex"}}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <TablaMaquinas></TablaMaquinas>
            </div>
        </div>
    );
}
