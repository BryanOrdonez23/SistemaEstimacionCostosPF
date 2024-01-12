import { buildPDF } from "../libs/pdfKit.js";

export const createPDF = async (req, res) => {
    const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    "Content-Disposition": "attachment; filename=informePF.pdf",
    })
  buildPDF(
    (data) => stream.write(data),
    () => stream.end() 
    );
}
