import { usePage } from "@inertiajs/react";
import { Col, Container } from "react-bootstrap";
import TablaMaquinas from "../../components/maquinas/TablaMaquinas";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function Listado() {
    const { flash } = usePage().props;
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <div align="center">
                    <Col sm={10}>
                        {flash.success && (
                            <div class="alert alert-success" role={"alert"}>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="alert"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                {flash.errorEdicion}
                            </div>
                        )}
                        {flash.error && (
                            <div class="alert alert-danger" role={"alert"}>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="alert"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                {flash.errorBorrado}
                            </div>
                        )}
                    </Col>
                </div>
                <TablaMaquinas></TablaMaquinas>
            </div>
        </div>
    );
}
