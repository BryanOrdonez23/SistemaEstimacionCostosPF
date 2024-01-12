import React, { useRef, useEffect } from 'react';
import { useFunctions } from '../../context/FunctionsContext';
import { useEstimacionPF } from '../../context/EstimacionPFContext';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useParams } from 'react-router-dom';

function InformeFinal() {
  const contentRef = useRef(null);
  const { funciones, getFunctions } = useFunctions();
  const {  getPuntosFuncion, getValorFactoresAjuste, datosPuntosFuncion, valorfactoresAjuste } = useEstimacionPF();
  const params = useParams();

  useEffect(() => {
    async function loadFunciones() {
      if (params.id) {
        await getFunctions(params.id);
        await getPuntosFuncion(params.id);
        await getValorFactoresAjuste(params.id);
      }
    }
    loadFunciones();
  }, []);

// Ejemplo de un objeto fase
const faseEjemplo = {
    nombre: 'Fase de Ejemplo',
    descripcion: 'Esta es una fase de ejemplo para el informe final.',
    formula: 'PF = (UCP * TCF * ECF) / LOC',
    // Otras propiedades...
  };
  
  // ...
  const calcularPeso = (tipo, complejidad) => {
    // Definir los valores de peso según el tipo y la complejidad
    const pesos = {
      'EI': { 'Alta': 6, 'Media': 4, 'Baja': 3 },
      'EO': { 'Alta': 7, 'Media': 5, 'Baja': 4 },
      'EQ': { 'Alta': 6, 'Media': 4, 'Baja': 3 },
      'ILF': { 'Alta': 15, 'Media': 10, 'Baja': 7 },
      'EIF': { 'Alta': 10, 'Media': 10, 'Baja': 5 },
    };
  
    // Obtener el peso correspondiente
    const peso = pesos[tipo][complejidad];
  
    return peso;
  };

  const calcularPonderacion = (tipo, complejidad, cantidad) => {
    // Definir los valores de ponderación según el tipo y la complejidad
    const ponderaciones = {
      'EI': { 'Alta': 6, 'Media': 4, 'Baja': 3 },
      'EO': { 'Alta': 7, 'Media': 5, 'Baja': 4 },
      'EQ': { 'Alta': 6, 'Media': 4, 'Baja': 3 },
      'ILF': { 'Alta': 15, 'Media': 10, 'Baja': 7 },
      'EIF': { 'Alta': 10, 'Media': 10, 'Baja': 5 },
    };

    // Obtener la ponderación correspondiente
    const ponderacion = ponderaciones[tipo][complejidad];

    // Calcular el valor de la ponderación
    const valorPonderacion = ponderacion * cantidad;

    return valorPonderacion;
  };

  const handleDownloadPDF = async () => {
  try {
    const content = contentRef.current;
    const pdf = new jsPDF();

    // Configuración del color del texto a negro
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(15);

    // Agrega el título
    pdf.text('Informe de Estimación de Costos', 15, 15);
    pdf.setFontSize(10);

    // Primer bloque: Tabla con las columnas originales
    pdf.text('1. Listado de funcionalidades del sistema (Original):', 20, 20);

    // Verifica que haya funciones antes de intentar construir la tabla original
    if (funciones && funciones.length > 0) {
      // Selecciona manualmente las propiedades originales que deseas incluir en la tabla
      const headersOriginal = ['Funcionalidad', 'Tipo', 'Complejidad', 'Cantidad'];
      
      // Mapea los datos originales para obtener una matriz que pueda ser utilizada por autoTable
      const dataOriginal = funciones.map((item) => [
        item.funcionalidad,
        item.tipo,
        item.complejidad,
        item.cantidad,
      ]);

      // Configuración de la tabla original
      const tableConfigOriginal = {
        startY: 35,
        head: [headersOriginal],
        body: dataOriginal,
      };

      // Agrega la tabla original
      pdf.autoTable(tableConfigOriginal);
    } else {
      // Si no hay funciones, agregar un mensaje
      pdf.text('No hay datos originales para mostrar en la tabla', 15, 25);
    }

    // Segundo bloque: Tabla con las columnas adicionales de Peso y Ponderación
    pdf.text('2. Cálculo de puntos de función sin ajustar:', 20, pdf.previousAutoTable.finalY + 10);

    // Verifica que haya funciones antes de intentar construir la segunda tabla
    if (funciones && funciones.length > 0) {
      // Selecciona manualmente las propiedades que deseas incluir en la segunda tabla
      const headersAdicionales = ['Funcionalidad', 'Tipo', 'Complejidad', 'Peso', 'Cantidad', 'Ponderación'];

      // Mapea los datos para obtener una matriz que pueda ser utilizada por autoTable
      const dataAdicional = funciones.map((item) => [
        item.funcionalidad,
        item.tipo,
        item.complejidad,
        calcularPeso(item.tipo, item.complejidad),
        item.cantidad,
        calcularPonderacion(item.tipo, item.complejidad, item.cantidad),
      ]);

      // Configuración de la segunda tabla
      const tableConfigAdicional = {
        startY: pdf.previousAutoTable.finalY + 15,
        head: [headersAdicionales],
        body: dataAdicional,
      };

      // Agrega la segunda tabla
      pdf.autoTable(tableConfigAdicional);
    } else {
      // Si no hay funciones, agregar un mensaje para la segunda tabla
      pdf.text('No hay datos adicionales para mostrar en la segunda tabla', 15, pdf.previousAutoTable.finalY + 10);
    }

    



    

    // Descarga el PDF
    pdf.save('InformeFinal.pdf');
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
};


  

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-black">Fase 7: Informe Final</h1>
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
