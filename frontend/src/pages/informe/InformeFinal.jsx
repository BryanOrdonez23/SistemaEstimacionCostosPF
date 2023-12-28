import React, { useRef, useEffect } from 'react';
import { useFunctions } from '../../context/FunctionsContext';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useParams } from 'react-router-dom';

function InformeFinal() {
  const contentRef = useRef(null);
  const { funciones, getFunctions } = useFunctions();
  const params = useParams();

  useEffect(() => {
    async function loadFunciones() {
      if (params.id) {
        await getFunctions(params.id);
      }
    }
    loadFunciones();
  }, [params.id, getFunctions]);

// Ejemplo de un objeto fase
const faseEjemplo = {
    nombre: 'Fase de Ejemplo',
    descripcion: 'Esta es una fase de ejemplo para el informe final.',
    formula: 'PF = (UCP * TCF * ECF) / LOC',
    // Otras propiedades...
  };
  
  // ...
  
  const handleDownloadPDF = () => {
    try {
      const content = contentRef.current;
      const pdf = new jsPDF();
  
      // Configuración del color del texto a negro
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
  
      // Agrega el título
      pdf.text('Informe de Estimación de Costos', 15, 15);
      pdf.text('Listado de funcionalidades del sistema:', 20, 20);
  
      // Verifica que haya funciones antes de intentar construir la tabla
      if (funciones && funciones.length > 0) {
        // Selecciona manualmente las propiedades que deseas incluir en la tabla
        const headers = ['funcionalidad', 'complejidad', 'cantidad', 'tipo'];
  
        // Mapea los datos para obtener una matriz que pueda ser utilizada por autoTable
        const data = funciones.map((item) => headers.map((key) => item[key]));
  
        // Configuración de la tabla
        const tableConfig = {
          startY: 35,
          head: [headers],
          body: data,
        };
  
        // Agrega la tabla
        pdf.autoTable(tableConfig);
  
        // Añade la información de la fase de ejemplo
        const offsetY = pdf.autoTable.previous.finalY + 10;
        pdf.text('Fase de Ejemplo:', 20, offsetY);
        pdf.text(`Nombre: ${faseEjemplo.nombre}`, 20, offsetY + 10);
        pdf.text(`Descripción: ${faseEjemplo.descripcion}`, 20, offsetY + 20);
        pdf.text('Fórmula de Puntos de Función:', 20, offsetY + 30);
  
        // Divide la fórmula en partes para que se ajuste al ancho de la página
        const formulaParts = pdf.splitTextToSize(faseEjemplo.formula, pdf.internal.pageSize.width - 40);
        formulaParts.forEach((part, index) => {
          pdf.text(part, 20, offsetY + 40 + index * 10);
        });
      } else {
        // Si no hay funciones, agregar un mensaje
        pdf.text('No hay datos para mostrar en la tabla', 15, 25);
      }
  
      // Descarga el PDF
      pdf.save('InformeFinal.pdf');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-black">Informe Final</h1>
      <div className="text-black" ref={contentRef}>
        <p className="mb-4">Este informe proporciona una estimación de costos basada en Puntos de Función.</p>
        <p className="mb-4">Otra información relevante...</p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        onClick={handleDownloadPDF}
      >
        Descargar Informe
      </button>
    </div>
  );
}

export default InformeFinal;
