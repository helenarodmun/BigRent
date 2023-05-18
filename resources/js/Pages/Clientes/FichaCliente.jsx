import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardCliente from "../../components/clientes/CardCliente";
import TablaAutorizados from "../../components/clientes/TablaAutorizados";
import TablaDirecciones from "../../components/clientes/TablaDirecciones";
import TablaTelefonos from "../../components/clientes/TablaTelefonos";
import NavBar from "../../components/partials/NavBar";
import Sidebar from "../../components/partials/Sidebar";

export default function FichaCliente() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <NavBar></NavBar>
                <Container fluid="true" className="update-container">
          <Row>
            <Col lg={6}>
                    <div fluid="true" className="form-container">
                        <CardCliente />
                    </div>
                    </Col>
            <Col lg={6}>
                    <div fluid="true" className="tables-container">
                        <div className="table-container">
                            <TablaDirecciones></TablaDirecciones>
                        </div>
                        <div className="table-container">
                            <TablaTelefonos></TablaTelefonos>
                        </div>

                        <div className="table-container">
                            <TablaAutorizados></TablaAutorizados>
                        </div>
                    </div>
                </Col>
          </Row>
        </Container>
            </div>
        </div>
    );
}
