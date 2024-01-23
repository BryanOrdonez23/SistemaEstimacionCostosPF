import React, { useRef, useEffect, useState } from "react";
import { useFunctions } from "../../context/FunctionsContext";
import { useEstimacionPF } from "../../context/EstimacionPFContext";
import { useProyect } from "../../context/ProyectContext";
import { useAuth } from "../../context/AuthContext";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs ";

function InformeFinal() {
  const contentRef = useRef(null);
  const { funciones, getFunctions } = useFunctions();
  const {
    getPuntosFuncion,
    getValorFactoresAjuste,
    datosPuntosFuncion,
    valorfactoresAjuste,
    getInvolucrados,
    getOtrosGastos,
    involucrados,
    otrosGastos,
    promedioSueldosInvolucrados,
    contarInvolucrados,
    sumaotroGastos,
  } = useEstimacionPF();

  const { getProyect, proyect } = useProyect();
  const params = useParams();
  const [conteo, setconteo] = useState(0);
  const [prom, setprom] = useState(0);
  const [sumaotrosGastos, setsumaotrosGastos] = useState(0);
  const { isAuthenticated, logout, user } = useAuth();

  const routes = [
    { path: '/proyects', displayName: 'Inicio' },
    { path: `/fases/${params.id}`, displayName: 'Fases del Proyecto'},
    { path: `/informe/${params.id}`, displayName: 'Fase 7: Informe Final'},
  ];

  useEffect(() => {
    document.title = 'Fase 7 - App costos';
    async function loadFunciones() {
      if (params.id) {
        await getFunctions(params.id);
        await getPuntosFuncion(params.id);
        await getValorFactoresAjuste(params.id);
        await getInvolucrados(params.id);
        await getOtrosGastos(params.id);
        await getProyect(params.id);
        const promedio = await promedioSueldosInvolucrados(params.id);
        const contar = await contarInvolucrados(params.id);
        const sumaOtrosGastos = await sumaotroGastos(params.id);
        setconteo(contar.numeroInvolucrados);
        setprom(promedio.promedio);
        if (sumaOtrosGastos.totalCosto > 0) {
          setsumaotrosGastos(sumaOtrosGastos.totalCosto);
        } else {
          setsumaotrosGastos(0);
        }
      }
    }
    loadFunciones();
  }, []);

  // ...
  const calcularPeso = (tipo, complejidad) => {
    // Definir los valores de peso según el tipo y la complejidad
    const pesos = {
      EI: { Alta: 6, Media: 4, Baja: 3 },
      EO: { Alta: 7, Media: 5, Baja: 4 },
      EQ: { Alta: 6, Media: 4, Baja: 3 },
      ILF: { Alta: 15, Media: 10, Baja: 7 },
      EIF: { Alta: 10, Media: 10, Baja: 5 },
    };

    // Obtener el peso correspondiente
    const peso = pesos[tipo][complejidad];

    return peso;
  };

  const calcularPonderacion = (tipo, complejidad, cantidad) => {
    // Definir los valores de ponderación según el tipo y la complejidad
    const ponderaciones = {
      EI: { Alta: 6, Media: 4, Baja: 3 },
      EO: { Alta: 7, Media: 5, Baja: 4 },
      EQ: { Alta: 6, Media: 4, Baja: 3 },
      ILF: { Alta: 15, Media: 10, Baja: 7 },
      EIF: { Alta: 10, Media: 10, Baja: 5 },
    };

    // Obtener la ponderación correspondiente
    const ponderacion = ponderaciones[tipo][complejidad];

    // Calcular el valor de la ponderación
    const valorPonderacion = ponderacion * cantidad;

    return valorPonderacion;
  };

  const factoresAjuste = {
    factoresAjuste: [
      {
        valorFA1: "Comunicación de datos",
        valorFA2: "Procesamiento distribuido",
        valorFA3: "Objetivos de rendimiento",
        valorFA4: "Configuración del equipamiento",
        valorFA5: "Tasa de transacciones",
        valorFA6: "Entrada de datos en línea",
        valorFA7: "Interfaz con el usuario",
        valorFA8: "Actualizaciones en línea",
        valorFA9: "Procesamiento complejo",
        valorFA10: "Reusabilidad del código",
        valorFA11: "Facilidad de implementación",
        valorFA12: "Facilidad de operación",
        valorFA13: "Instalaciones múltiples",
        valorFA14: "Facilidades de cambio",
      },
    ],
  };

  const validacion = (pdf, posy, incremento) => {
    if (posy > 270) {
      pdf.addPage();
      return 20; // Restaurar posy a 10 después de agregar una nueva página
    } else {
      return posy + incremento;
    }
  };

  const handleDownloadPDF = async () => {
    try {
      console.log(proyect);
      const content = contentRef.current;
      const pdf = new jsPDF();
      let posy = 10;

      // Configuración del color del texto a negro
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(15);

      // Agrega el título
      pdf.setFont("helvetica", "bold");
      pdf.text("Informe de Estimación de Costos - Método de Puntos de Función", 25, 15);
      pdf.setFontSize(10);
      pdf.text("Proyecto: ",15,25)
      pdf.setFont("helvetica", "normal");
      pdf.text(""+ proyect.title,35,25)
      pdf.setFont("helvetica", "bold");
      ////
      pdf.text("Descripción: ",15,30)
      pdf.setFont("helvetica", "normal");
      pdf.text(""+ proyect.description,40,30)
      pdf.setFont("helvetica", "bold");
      ////
      ////
      pdf.text("Fecha del informe: ",15,35)
      pdf.setFont("helvetica", "normal");
      pdf.text(""+ new Date().toLocaleString(),48,35)
      pdf.setFont("helvetica", "bold");
      ////
      // Primer bloque: Tabla con las columnas originales
      pdf.setFontSize(14);
      pdf.text("1. Listado de funcionalidades del sistema:", 15, 45);pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      // Verifica que haya funciones antes de intentar construir la tabla original
      if (funciones && funciones.length > 0) {
        // Selecciona manualmente las propiedades originales que deseas incluir en la tabla
        const headersOriginal = [
          "Funcionalidad",
          "Tipo",
          "Complejidad",
          "Cantidad",
        ];
        // Mapea los datos originales para obtener una matriz que pueda ser utilizada por autoTable
        const dataOriginal = funciones.map((item) => [
          item.funcionalidad,
          item.tipo,
          item.complejidad,
          item.cantidad,
        ]);

        // Configuración de la tabla original
        const tableConfigOriginal = {
          startY: 50,
          head: [headersOriginal],
          body: dataOriginal,
        };
        // Agrega la tabla original
        pdf.autoTable(tableConfigOriginal);
      } else {
        // Si no hay funciones, agregar un mensaje
        pdf.text("No hay datos originales para mostrar en la tabla", 15, 25);
      }
      posy = pdf.previousAutoTable.finalY + 10;
      posy = validacion(pdf, posy, 0);
      // Segundo bloque: Tabla con las columnas adicionales de Peso y Ponderación
      pdf.setFont("helvetica", "bold");pdf.setFontSize(14);
      pdf.text("2. Cálculo de puntos de función sin ajustar:", 15, posy);pdf.setFontSize(10);
      posy = validacion(pdf, posy, 0);
      pdf.setFont("helvetica", "normal");
      // Verifica que haya funciones antes de intentar construir la segunda tabla
      if (funciones && funciones.length > 0) {
        // Selecciona manualmente las propiedades que deseas incluir en la segunda tabla
        const headersAdicionales = [
          "Funcionalidad",
          "Tipo",
          "Complejidad",
          "Peso",
          "Cantidad",
          "Ponderación",
        ];
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
        pdf.text(
          "No hay datos adicionales para mostrar en la segunda tabla",
          15,
          pdf.previousAutoTable.finalY + 10
        );
      }
      posy = pdf.previousAutoTable.finalY + 10;
      posy = validacion(pdf, posy, 0);

      /////////////////// Tercer bloque: Tabla con los factores de ajuste
      pdf.setFont("times", "bold");pdf.setFontSize(11);
      pdf.text("- Fórmula: ", 20, posy);pdf.setFont("times", "normal");
      posy = validacion(pdf, posy, 10);
      pdf.text("PFSA = Σ(Cantidad * Peso)", 70, posy);
      posy = validacion(pdf, posy, 10);pdf.setFont("times", "bold");
      pdf.text("- Aplicando la fórmula se obtiene:", 20, posy);pdf.setFont("times", "normal");
      posy = validacion(pdf, posy, 10);
      pdf.text(
        "Puntos de Función Totales (sin ajustar): " +
          datosPuntosFuncion.functionPoints[0].calculoSA,
        70,
        posy
      );
      posy = validacion(pdf, posy, 10);
      pdf.setFont("helvetica", "bold");pdf.setFontSize(14);
      pdf.text("3. Factores de ajuste:", 15, posy);pdf.setFontSize(10);
      posy = validacion(pdf, posy, 10);
      pdf.setFont("helvetica", "normal");

      if (valorfactoresAjuste && factoresAjuste.factoresAjuste.length > 0) {
        const headersValoresAjuste = ["Factor de Ajuste", "Valor"];

        const dataValoresAjuste = Object.keys(
          valorfactoresAjuste.valorFactoresAjuste[0]
        )
          .filter((key) => key.startsWith("valorFA"))
          .map((key) => {
            const factorName = factoresAjuste.factoresAjuste[0][key];
            return [
              factorName,
              valorfactoresAjuste.valorFactoresAjuste[0][key],
            ];
          });

        const tableConfigValoresAjuste = {
          startY: posy,
          head: [headersValoresAjuste],
          body: dataValoresAjuste,
        };

        pdf.autoTable(tableConfigValoresAjuste);
      } else {
        pdf.text("No hay valores de ajuste para mostrar en la tabla", 15, posy);
      }
      posy = pdf.previousAutoTable.finalY + 10;
      posy = validacion(pdf, posy, 5);pdf.setFont("times", "normal");pdf.setFontSize(11);
      pdf.text(
        "Sumatoria de Factores de Ajuste: " +
          datosPuntosFuncion.functionPoints[0].SumaFA,
          80,
        posy
      );pdf.setFontSize(14);
      posy = validacion(pdf, posy, 10);
      pdf.setFont("helvetica", "bold");
      pdf.text("4. Cálculo de puntos de función con Ajuste", 15, posy);
      posy = validacion(pdf, posy, 10);
      pdf.setFont("times", "bold");pdf.setFontSize(11);
      pdf.text("- Formula", 20, posy);pdf.setFont("times", "normal");
      posy = validacion(pdf, posy, 10);
      pdf.text(
        "PFAjustados = PFSA x (0.65 + 0.01 * Factores de Ajuste):",
        70,
        posy
      );
      posy = validacion(pdf, posy, 10);pdf.setFont("times", "bold");
      pdf.text("- Aplicando la fórmula se obtiene", 20, posy);pdf.setFont("times", "normal");
      posy = validacion(pdf, posy, 10);
      pdf.text(
        "PFAjustados =" +
          datosPuntosFuncion.functionPoints[0].calculoSA +
          " x(0.65 + 0.01 *" +
          datosPuntosFuncion.functionPoints[0].SumaFA +
          ")",
        70,
        posy
      );
      posy = validacion(pdf, posy, 5);
      pdf.text(
        "PFAjustados = " + datosPuntosFuncion.functionPoints[0].calculoCA.toFixed(2),
        88,
        posy
      );
      posy = validacion(pdf, posy, 10);
      //Esfuerzo
      pdf.setFont("helvetica", "bold");pdf.setFontSize(14);
      pdf.text("5. Cálculo del esfuerzo del proyecto", 15, posy);
      posy = validacion(pdf, posy, 11);
      pdf.setFont("times", "normal");pdf.setFontSize(11);
      pdf.text(
        "Para el cálculo del esfuerzo se toma en cuenta el trabajo de un equipo que trabaja " +
          datosPuntosFuncion.functionPoints[0].horasDia +
          " horas al día durante " +
          datosPuntosFuncion.functionPoints[0].diasTrabajados +
          " días al mes",
        20,
        posy
      );
      posy = validacion(pdf, posy, 10);pdf.setFont("times", "bold");
      // Muestra la fórmula y los cálculos
      pdf.text("- Fórmula:", 20, posy);pdf.setFont("times", "normal");
      posy = validacion(pdf, posy, 5);
      pdf.text("   Esfuerzo = PFA * (H/PF)", 80, posy);
      posy = validacion(pdf, posy, 10);pdf.setFont("times", "bold");

      pdf.text("- Donde:", 20, posy);
      posy = validacion(pdf, posy, 5);pdf.setFont("times", "normal");
      pdf.text("   PFA = Puntos de función ajustados", 80, posy);
      posy = validacion(pdf, posy, 5);
      pdf.text("   H/PF = Horas por puntos de función", 80, posy);
      posy = validacion(pdf, posy, 5);pdf.setFont("times", "bold");
      pdf.text("- Aplicando la fórmula se obtiene:", 20, posy);pdf.setFont("times", "normal");
      posy = validacion(pdf, posy, 5);
      pdf.text(
        `   Esfuerzo = ${datosPuntosFuncion.functionPoints[0].calculoCA.toFixed(
          2
        )} * ${datosPuntosFuncion.functionPoints[0].horasPF}`,
        80,
        posy
      );
      posy = validacion(pdf, posy, 5);
      pdf.text(
        `   Esfuerzo = ${datosPuntosFuncion.functionPoints[0].esfuerzo.toFixed(
          2
        )}`,
        80,
        posy
      );
      posy = validacion(pdf, posy, 5);pdf.setFont("times", "bold");
      // Calcula y muestra los días de trabajo estimados
      pdf.text("- Días de Trabajo Estimados:", 20, posy);
      posy = validacion(pdf, posy, 10);pdf.setFont("times", "normal");
      pdf.text(`   DiasTrabajo = Esfuerzo / Horas por día`, 80, posy);
      posy = validacion(pdf, posy, 5);
      pdf.text(
        `   DiasTrabajo = ${datosPuntosFuncion.functionPoints[0].esfuerzo.toFixed(
          2
        )} / ${datosPuntosFuncion.functionPoints[0].horasDia}`,
        80,
        posy
      );
      posy = validacion(pdf, posy, 5);
      pdf.text(
        `   DiasTrabajo = ${datosPuntosFuncion.functionPoints[0].diasEstimados.toFixed(
          2
        )}`,
        80,
        posy
      );
      posy = validacion(pdf, posy, 10);pdf.setFont("times", "bold");
      // Calcula y muestra los meses de trabajo estimados
      pdf.text("- Meses de Trabajo Estimados:", 20, posy);
      posy = validacion(pdf, posy, 5);pdf.setFont("times", "normal");
      pdf.text(
        `   MesesTrabajo = Dias de trabajo / Dias por mes trabajados`,
        80,
        posy
      );
      posy = validacion(pdf, posy, 5);
      pdf.text(
        `   MesesTrabajo = ${datosPuntosFuncion.functionPoints[0].diasEstimados.toFixed(
          2
        )} / ${datosPuntosFuncion.functionPoints[0].diasTrabajados}`,
        80,
        posy
      );
      posy = validacion(pdf, posy, 5);
      pdf.text(
        `   MesesTrabajo = ${datosPuntosFuncion.functionPoints[0].mesesEstimados.toFixed(
          2
        )}`,
        80,
        posy
      );
      posy = validacion(pdf, posy, 10);
      // Muestra el esfuerzo total del proyecto
      pdf.text(
        `- Por lo tanto, el esfuerzo del proyecto es de ${datosPuntosFuncion.functionPoints[0].mesesEstimados.toFixed(
          2
        )} meses de trabajo.`,
        20,
        posy
      );
      posy = validacion(pdf, posy, 10);

      // Presenta el total de puntos de función ajustados
      pdf.setFont("helvetica", "bold");pdf.setFontSize(14);
      pdf.text(
        "6. Cálculo del presupuesto del proyecto",
        15,
        posy
      );
      posy = validacion(pdf, posy, 10);pdf.setFontSize(10);
      pdf.text(
        "6.1 Listado de involucrados del proyecto",
        15,
        posy
      );
      posy = validacion(pdf, posy, 10);
      pdf.setFont("helvetica", "normal");
      if (involucrados && involucrados.length > 0) {
        // Selecciona las propiedades que deseas incluir en la tabla de involucrados
        const headersInvolucrados = ["Nombre", "Rol", "Sueldo"];
        // Mapea los datos de involucrados para obtener una matriz que pueda ser utilizada por autoTable
        const dataInvolucrados = involucrados.map((item) => [
          item.nombre,
          item.rol,
          item.sueldo,
        ]);

        // Configuración de la tabla de involucrados
        const tableConfigInvolucrados = {
          startY: posy,
          head: [headersInvolucrados],
          body: dataInvolucrados,
        };
        // Agrega la tabla de involucrados
        pdf.autoTable(tableConfigInvolucrados);
      } else {
        // Si no hay involucrados, agregar un mensaje para la tabla
        pdf.text(
          "No hay involucrados para mostrar en la tabla",
          20,
          posy
        );
      }
      // Muestra el total de otros gastos
      pdf.setFont("helvetica", "bold");
      posy = pdf.previousAutoTable.finalY + 10;
      pdf.text(
        "6.2 Listado de otros gastos del proyecto",
        15,
        posy
      );
      posy = validacion(pdf, posy, 10);
      pdf.setFont("helvetica", "normal");
      if (otrosGastos && otrosGastos.length > 0) {
        // Selecciona las propiedades que deseas incluir en la tabla de involucrados
        const headersInvolucrados = ["descripcion", "costo", "observacion"];
        // Mapea los datos de involucrados para obtener una matriz que pueda ser utilizada por autoTable
        const dataInvolucrados = otrosGastos.map((item) => [
          item.descripcion,
          item.costo,
          item.observacion,
        ]);
        // Configuración de la tabla de involucrados
        const tableConfigInvolucrados = {
          startY: posy,
          head: [headersInvolucrados],
          body: dataInvolucrados,
        };
        // Agrega la tabla de involucrados
        pdf.autoTable(tableConfigInvolucrados);
      } else {
        // Si no hay involucrados, agregar un mensaje para la tabla
        pdf.text(
          "No hay involucrados para mostrar en la tabla",
          20,
          posy
        );
      }

      ////////////////////////////////////

      posy = pdf.previousAutoTable.finalY + 10;
      posy = validacion(pdf, posy, 0);
      pdf.setFont("times", "bold");pdf.setFontSize(11);
      pdf.text(
        "Se toma en consideración lo siguiente:",
        20,
        posy
      );
      posy = validacion(pdf, posy, 10);
      pdf.setFont("times", "normal");
      pdf.text(
        "- Sueldo mensual de los involucrados en el proyecto (Analista, Desarrollador, Probador, etc.)",
        20,
        posy
      );
      posy = validacion(pdf, posy, 5);
      pdf.text(
        "- Otros costos del proyecto (Servicios, Materiales, Imprevistos, Externos etc.)",
        20,
        posy
      );
      posy = validacion(pdf, posy, 5);
      pdf.text(
        "- Cantidad de Desarrolladores",
        20,
        posy
      );
      posy = validacion(pdf, posy, 10);
      pdf.setFont("times", "bold");
      pdf.text("- Formula:", 20, posy);
      posy = validacion(pdf, posy, 5);
      pdf.setFont("times", "normal");
      pdf.text(
        "Costo = (nd x dm x ps) + og",
        80,
        posy
      );
      posy = validacion(pdf, posy, 10);
      pdf.setFont("times", "bold");
      pdf.text("Donde:", 20, posy);
      posy = validacion(pdf, posy, 5);
      pdf.setFont("times", "normal");
      pdf.text(
        "- nd = Número de involucrados.",
        20,
        posy
      );
      posy = validacion(pdf, posy, 5);
      pdf.text(
        "- dm = Duración del proyecto en meses.",
        20,
        posy
      );
      posy = validacion(pdf, posy, 5);
      pdf.text(
        "- ps = Promedio de sueldos de los involucrados.",
        20,
        posy
      );
      posy = validacion(pdf, posy, 5);
      pdf.text(
        "- ot = suma de otros gastos.",
        20,
        posy
      );
      posy = validacion(pdf, posy, 10);
      pdf.setFont("times", "bold");
      pdf.text(
        "- Aplicando las formula:",
        20,
        posy
      );
      posy = validacion(pdf, posy, 5);
      pdf.setFont("times", "normal");
      pdf.text(
        `Costo = (${conteo} x ${datosPuntosFuncion.functionPoints[0].mesesEstimados.toFixed(
          2
        )} x ${prom.toFixed(2)}) + ${sumaotrosGastos}`,
        80,
        posy
      );
      posy = validacion(pdf, posy, 5);
      pdf.text(
        `Costo = ${datosPuntosFuncion.functionPoints[0].presupuesto.toFixed(2)}`,
        95,
        posy
      );
      posy = validacion(pdf, posy, 20);pdf.setFontSize(11);
      pdf.text(
        `El costo estimado del proyecto es de: ${datosPuntosFuncion.functionPoints[0].presupuesto.toFixed(2)} USD`,
        20,
        posy
      );
      posy = validacion(pdf, posy, 40);
      pdf.text(
        `___________________________`,
        32,
        posy
      );
      pdf.text(
        `___________________________`,
        120,
        posy
      );
      posy = validacion(pdf, posy, 7);
      pdf.text(
        `${user.name} ${user.lastname} `,
        43,
        posy
      );
      pdf.text(
        `Revisor del informe`,
        128,
        posy
      );

      pdf.save("InformeFinal.pdf");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 bg-white rounded shadow-md">
      <Breadcrumbs routes={routes} />
      <h1 className="text-3xl font-bold mb-4 text-black">
        Fase 7: Informe Final
      </h1>
      <div className="text-black" ref={contentRef}>
        <p className="mb-4">
          Este informe proporciona una estimación de costos basada en Puntos de
          Función.
        </p>
        <p className="mb-4">De clic en el botón "Descargar Informe", y espere unos segundos.</p>
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
