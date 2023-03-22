
import React from "react";
import { Container} from "react-bootstrap";
import FormActualizaCliente from "../../components/FormActualizaCliente";
import TablaDirecciones from "../../components/TablaDirecciones";
import TablaTelefonos from "../../components/TablaTelefonos";

export default function Update() {


    return (
        <>
            <Container>
        <p className="h1 mt-3">Modificar Cliente</p>
        <div className="update-container">
          <div className="form-container">
            <FormActualizaCliente />
          </div>
          <div className="tables-container">
            <div className="table-container">
              <TablaDirecciones />
            </div>
            <div className="table-container">
              <TablaTelefonos />
            </div>
          </div>
        </div>
      </Container>
        </>
    );
}
