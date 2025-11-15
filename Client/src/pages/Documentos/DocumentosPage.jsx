// Components
import { DocumentosPanel } from "./components/DocumentosPanel"
import { VisorPdf } from "./components/VisorPdf";
import { useState } from "react";

export const DocumentosPage = () => {
    const [pdfSeleccionado, setPdfSeleccionado] = useState(false);
    const [rutaPdf, setRutaPdf] = useState("");
    return (
        <>
            <DocumentosPanel pdfSeleccionado={pdfSeleccionado} setPdfSeleccionado={setPdfSeleccionado} setRutaPdf={setRutaPdf}/>
            {pdfSeleccionado == true && (
                <VisorPdf rutaPdf={rutaPdf} setPdfSeleccionado={setPdfSeleccionado}/>
            )}
        </>
    )
};