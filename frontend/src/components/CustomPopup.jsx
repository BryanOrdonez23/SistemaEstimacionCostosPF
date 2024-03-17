import React, { useEffect } from "react";

const CustomPopup = ({ isOpen, message, onClose }) => {
  const getCustomContent = (message) => {
    // Define contenido personalizado para cada factor de ajuste
    const customContents = {
      "Comunicación de datos": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            1. Comunicación de Datos
          </h3>
          <p className="text-black">
            Los datos y la información de control que se utilizan en sistemas
            aplicativos son normalmente enviados a través de equipos de
            comunicación, como sucede por ejemplo con las terminales conectadas
            a una unidad de control. Los puntos deben ser asignados según la
            siguiente guía:
          </p>
          <ul className="list-disc ml-6 text-black">
            <li>
              La aplicación es sólo "batch" o se trata de una PC independiente:{" "}
              <span className="font-semibold">0</span>
            </li>
            <li>
              La aplicación es "batch" pero tiene entrada remota de datos o
              impresión remota: <span className="font-semibold">1</span>
            </li>
            <li>
              La aplicación es "batch" pero tiene entrada remota de datos e
              impresión remota: <span className="font-semibold">2</span>
            </li>
            <li>
              Captura de datos en línea o teleprocesamiento (TP) como "front
              end" para un sistema "batch":{" "}
              <span className="font-semibold">3</span>
            </li>
            <li>
              Más que "front end", pero la aplicación soporta solamente un tipo
              de protocolo de TP: <span className="font-semibold">4</span>
            </li>
            <li>
              La aplicación soporta más de un tipo de protocolo de TP:{" "}
              <span className="font-semibold">5</span>
            </li>
          </ul>
        </div>
      ),
      "Procesamiento distribuido": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            2. Procesamiento distribuido
          </h3>
          <p className="text-black">
            Se deben asignar los siguientes puntajes:
          </p>
          <ul className="list-disc ml-6 text-black">
            <li>
              La aplicación no facilita la transferencia de datos o las
              funciones de procesamiento entre componentes del sistema:{" "}
              <span className="font-semibold">0</span>
            </li>
            <li>
              La aplicación prepara datos para su procesamiento por el usuario
              final o por otro componente del sistema, tales como una planilla
              de cálculo en PC o un sistema de administración de base de datos
              para PC: <span className="font-semibold">1</span>
            </li>
            <li>
              Se preparan datos para su transferencia, se transfieren y se
              procesan en otro componente del sistema:{" "}
              <span className="font-semibold">2</span>
            </li>
            <li>
              El procesamiento distribuido y la transferencia de datos se
              producen en línea y solamente en una dirección:{" "}
              <span className="font-semibold">3</span>
            </li>
            <li>
              El procesamiento distribuido y la transferencia de datos se
              producen en línea y en ambas direcciones:{" "}
              <span className="font-semibold">4</span>
            </li>
            <li>
              Las funciones de procesamiento se realizan en forma dinámica en el
              componente más apropiado del sistema:{" "}
              <span className="font-semibold">5</span>
            </li>
          </ul>
        </div>
      ),
      "Objetivos de rendimiento": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            3. Objetivos de rendimiento
          </h3>
          <p className="text-black">
            Los objetivos de rendimiento de la aplicación, indicados o aprobados
            por el usuario, con respecto a tiempos de respuesta o cantidad de
            transacciones por unidad de tiempo, tienen influencia sobre el
            diseño, desarrollo, instalación y mantenimiento de la aplicación. Se
            usarán los siguientes puntajes:
          </p>
          <ul className="list-disc ml-6 text-black">
            <li>
              El usuario no ha indicado ningún objetivo específico de
              rendimiento: <span className="font-semibold">0</span>
            </li>
            <li>
              Se indicaron requerimientos en cuanto a rendimiento y diseño pero
              no fue necesario tomar ninguna acción especial:{" "}
              <span className="font-semibold">1</span>
            </li>
            <li>
              El tiempo de respuesta o la cantidad de transacciones que se
              procesan es crítico en horas pico. No se requirió ningún diseño
              especial para optimizar la utilización de la CPU:{" "}
              <span className="font-semibold">2</span>
            </li>
            <li>
              El tiempo de respuesta o la cantidad de transacciones que se
              procesan es crítico durante todo el horario de trabajo. No se
              requirió ningún diseño especial para utilización de la CPU.
              Existen restricciones en cuanto al procesamiento debido a sistemas
              de interfaz: <span className="font-semibold">3</span>
            </li>
            <li>
              Los requerimientos de performance del usuario son suficientemente
              estrictos como para requerir tareas de análisis de performance en
              la etapa de diseño: <span className="font-semibold">4</span>
            </li>
            <li>
              Además, se debió utilizar herramientas para el análisis de
              performance durante el diseño, desarrollo, y/o implementación para
              poder cumplir los requerimientos de rendimiento del usuario:{" "}
              <span className="font-semibold">5</span>
            </li>
          </ul>
        </div>
      ),
      "Tasa de transacciones": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            5. Tasa de transacciones
          </h3>
          <p className="text-black">
            La cantidad de transacciones por unidad de tiempo es alta e influye
            en el diseño, desarrollo, instalación y mantenimiento de la
            aplicación.
          </p>
          <ul className="list-disc ml-6 text-black">
            <li>
              No se anticipa que existirá un período pico:{" "}
              <span className="font-semibold">0</span>
            </li>
            <li>
              Se anticipa un período pico (por ej., mensual, trimestral,
              estacional, anual): <span className="font-semibold">1</span>
            </li>
            <li>
              Se anticipa un período pico semanal:{" "}
              <span className="font-semibold">2</span>
            </li>
            <li>
              Se anticipa un período pico diario:{" "}
              <span className="font-semibold">3</span>
            </li>
            <li>
              Las altas tasas de transacciones indicadas por el usuario en la
              especificación de requerimientos o en los acuerdos de nivel de
              servicio son suficientemente altas como para requerir tareas de
              análisis de performance en la etapa de diseño:{" "}
              <span className="font-semibold">4</span>
            </li>
            <li>
              Las altas tasas de transacciones indicadas por el usuario en la
              especificación de requerimientos o en los acuerdos de nivel de
              servicio son suficientemente altas como para requerir tareas de
              análisis de performance en la etapa de diseño; además, se requiere
              el uso de herramientas para el análisis de performance en las
              etapas de diseño, desarrollo, y/o instalación:{" "}
              <span className="font-semibold">5</span>
            </li>
          </ul>
        </div>
      ),
      "Configuración del equipamiento": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            4. Configuración del equipamiento
          </h3>
          <p className="text-black">
            Una característica de la aplicación es que deberá ser procesada en
            una instalación muy ocupada. Los puntajes son los siguientes:
          </p>
          <ul className="list-disc ml-6 text-black">
            <li>
              No existen restricciones implícitas o explícitas:{" "}
              <span className="font-semibold">0</span>
            </li>
            <li>
              Existen restricciones operativas, pero no es necesario hacer
              ningún esfuerzo especial para cumplirlas:{" "}
              <span className="font-semibold">1</span>
            </li>
            <li>
              Existen algunas consideraciones relacionadas con la seguridad o
              con tiempos de proceso: <span className="font-semibold">2</span>
            </li>
            <li>
              Existen requerimientos específicos de CPU para una porción
              determinada de la aplicación:{" "}
              <span className="font-semibold">3</span>
            </li>
            <li>
              Las restricciones operativas especificadas requieren condiciones
              especiales con respecto a la CPU:{" "}
              <span className="font-semibold">4</span>
            </li>
            <li>
              Además, existen restricciones especiales sobre la aplicación
              relacionadas con los componentes distribuidos del sistema:{" "}
              <span className="font-semibold">5</span>
            </li>
          </ul>
        </div>
      ),
      "Interfaz con el usuario": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            Interfaz con el usuario
          </h3>
          <p className="text-black">
            Las funciones en línea enfatizan el diseño con miras a la eficiencia
            del usuario final. Esas funciones son del siguiente tipo:
          </p>
          <ul className="list-disc ml-6 text-black">
            <li>
              Ninguno de los items indicados más arriba:{" "}
              <span className="font-semibold">0</span>
            </li>
            <li>
              Uno a tres de los indicados:{" "}
              <span className="font-semibold">1</span>
            </li>
            <li>
              Cuatro a cinco de los indicados:{" "}
              <span className="font-semibold">2</span>
            </li>
            <li>
              Seis o más de los indicados pero no existen requerimientos
              específicos del usuario con relación a la eficiencia:{" "}
              <span className="font-semibold">3</span>
            </li>
            <li>
              Seis o más de los indicados y con requerimientos de eficiencia
              para el usuario suficientemente estrictos como para requerir la
              inclusión de tareas de diseño especiales para tener en cuenta
              factores humanos (por ejemplo, minimizar la cantidad de
              digitaciones, utilizar plantillas o modelos, etc.):{" "}
              <span className="font-semibold">4</span>
            </li>
            <li>
              Seis o más de los items indicados y con requerimientos de
              eficiencia para el usuario suficientemente estrictos como para
              requerir el uso de herramientas y procesos especiales a fin de
              demostrar que los objetivos fueron logrados:{" "}
              <span className="font-semibold">5</span>
            </li>
          </ul>
        </div>
      ),
      "Entrada de datos en línea": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            6. Ingreso de datos en línea
          </h3>
          <p className="text-black">
            La aplicación incluye ingreso de datos y funciones de control en
            línea:
          </p>
          <ul className="list-disc ml-6 text-black">
            <li>
              Todas las transacciones se procesan en modo "batch":{" "}
              <span className="font-semibold">0</span>
            </li>
            <li>
              1% a 7% de las transacciones son datos de entrada interactivos:{" "}
              <span className="font-semibold">1</span>
            </li>
            <li>
              8% a 15% de las transacciones son datos de entrada interactivos:{" "}
              <span className="font-semibold">2</span>
            </li>
            <li>
              16% a 23% de las transacciones son datos de entrada interactivos:{" "}
              <span className="font-semibold">3</span>
            </li>
            <li>
              24% a 30% de las transacciones son datos de entrada interactivos:{" "}
              <span className="font-semibold">4</span>
            </li>
            <li>
              Más de 30% de las transacciones son datos de entrada interactivos:{" "}
              <span className="font-semibold">5</span>
            </li>
          </ul>
        </div>
      ),
      "Actualizaciones en línea": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            8. Actualización en línea
          </h3>
          <p className="text-black">
            La aplicación proporciona actualización en línea para los Archivos
            Lógicos Internos (ILF). Los puntajes son los siguientes:
          </p>
          <ul className="list-disc ml-6 text-black">
            <li>
              Ninguna actualización: <span className="font-semibold">0</span>
            </li>
            <li>
              Actualización en línea de uno a tres archivos de control. El
              volumen de actualización es bajo y la recuperación es simple:{" "}
              <span className="font-semibold">1</span>
            </li>
            <li>
              Actualización en línea de cuatro o más archivos de control. El
              volumen de actualización es bajo y la recuperación es simple:{" "}
              <span className="font-semibold">2</span>
            </li>
            <li>
              Actualización en línea de los principales Archivos Lógicos
              Internos: <span className="font-semibold">3</span>
            </li>
            <li>
              Además, la protección contra pérdida de datos es esencial y ha
              sido diseñada y programada especialmente para el sistema:{" "}
              <span className="font-semibold">4</span>
            </li>
            <li>
              Además, los altos volúmenes implican consideraciones de costo para
              el proceso de recuperación. Procedimientos de recuperación
              altamente automatizados con un mínimo de intervención humana:{" "}
              <span className="font-semibold">5</span>
            </li>
          </ul>
        </div>
      ),
      "Procesamiento complejo": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            9. Procesamiento Complejo
          </h3>
          <p className="text-black">
            Una característica de la aplicación es la complejidad del
            procesamiento. Las categorías son las siguientes:
          </p>
          <ul className="list-disc ml-6 text-black">
            <li>
              Control delicado (por ejemplo, procesamiento especial para
              auditoría) y/o procesamiento de seguridad específico para la
              aplicación.
            </li>
            <li>Amplio procesamiento lógico.</li>
            <li>Amplio procesamiento matemático.</li>
            <li>
              Mucho procesamiento de excepción que resulta en transacciones
              incompletas que deben ser procesadas nuevamente; por ejemplo,
              transacciones incompletas de cajeros automáticos originadas en
              interrupciones de TP, en datos faltantes, o en validaciones no
              aprobadas.
            </li>
            <li>
              Procesamiento complejo para poder manejar múltiples posibilidades
              de entrada/salida (por ejemplo, multimedia).
            </li>
          </ul>
          <p className="text-black mt-2">Los puntajes son los siguientes:</p>
          <ul className="list-disc ml-6 text-black">
            <li>
              Ninguno de los puntos indicados más arriba:{" "}
              <span className="font-semibold">0</span>
            </li>
            <li>
              Cualquiera de los puntos indicados:{" "}
              <span className="font-semibold">1</span>
            </li>
            <li>
              Dos cualesquiera de los puntos indicados:{" "}
              <span className="font-semibold">2</span>
            </li>
            <li>
              Tres cualesquiera de los puntos indicados:{" "}
              <span className="font-semibold">3</span>
            </li>
            <li>
              Cuatro cualesquiera de los puntos indicados:{" "}
              <span className="font-semibold">4</span>
            </li>
            <li>
              Los cinco puntos indicados:{" "}
              <span className="font-semibold">5</span>
            </li>
          </ul>
        </div>
      ),
      "Reusabilidad del código": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            10. Reusabilidad del código
          </h3>
          <p className="text-black">
            La aplicación y los programas de la aplicación han sido
            específicamente diseñados y desarrollados para poder ser usados en
            otras aplicaciones. El puntaje es el siguiente:
          </p>
          <ul className="list-disc ml-6 text-black">
            <li>
              No existen programas reusables:{" "}
              <span className="font-semibold">0</span>
            </li>
            <li>
              La aplicación emplea módulos reusables:{" "}
              <span className="font-semibold">1</span>
            </li>
            <li>
              Menos de un 10% de la aplicación ha tenido en cuenta las
              necesidades de más de un usuario:{" "}
              <span className="font-semibold">2</span>
            </li>
            <li>
              10% o más de la aplicación ha tenido en cuenta las necesidades de
              más de un usuario: <span className="font-semibold">3</span>
            </li>
            <li>
              La aplicación ha sido específicamente preparada o documentada para
              facilitar el reuso, y la aplicación se ajusta a medida por el
              usuario por medio de instrucciones fuente:{" "}
              <span className="font-semibold">4</span>
            </li>
            <li>
              La aplicación ha sido específicamente preparada o documentada para
              facilitar el reuso, y la aplicación se ajusta a medida por el
              usuario por medio de parámetros:{" "}
              <span className="font-semibold">5</span>
            </li>
          </ul>
        </div>
      ),
      "Facilidad de implementación": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            11. Facilidad de implementación
          </h3>
          <p className="text-black">
            La facilidad de instalación y de conversión son características de
            la aplicación. Durante la etapa de prueba del sistema se contó y se
            probó un plan de instalación y conversión, y/o herramientas de
            conversión. El puntaje es el siguiente:
          </p>
          <ul className="list-disc ml-6 text-black">
            <li>
              El usuario no indicó ninguna consideración especial, y tampoco se
              requirió un procedimiento especial para la instalación:{" "}
              <span className="font-semibold">0</span>
            </li>
            <li>
              El usuario no indicó ninguna consideración especial, pero la
              instalación requirió un procedimiento especial:{" "}
              <span className="font-semibold">1</span>
            </li>
            <li>
              El usuario indicó requerimientos de conversión e instalación y se
              proporcionaron y probaron guías para la conversión e instalación.
              El impacto de la conversión sobre el proyecto no se considera
              importante: <span className="font-semibold">2</span>
            </li>
            <li>
              El usuario indicó requerimientos de conversión e instalación y se
              proporcionaron y probaron guías para la conversión e instalación.
              El impacto de la conversión sobre el proyecto se considera
              importante: <span className="font-semibold">3</span>
            </li>
            <li>
              Además de (2) se proveyeron y probaron herramientas automáticas
              para la conversión e instalación:{" "}
              <span className="font-semibold">4</span>
            </li>
            <li>
              Además de (3) se proveyeron y probaron herramientas automáticas
              para la conversión e instalación:{" "}
              <span className="font-semibold">5</span>
            </li>
          </ul>
        </div>
      ),
      "Facilidad de operación": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            12. Facilidad de operación
          </h3>
          <p className="text-black">
            Una característica de la aplicación es la facilidad de operación. Se
            proveyeron y se probaron durante la etapa de prueba del sistema
            procedimientos efectivos de iniciación del procesamiento, respaldo,
            y recuperación. La aplicación minimiza la necesidad de actividades
            manuales, tales como montajes de cintas, manipuleo de formularios, e
            intervención directa manual.
          </p>
          <p className="text-black">El puntaje es el siguiente:</p>
          <ul className="list-disc ml-8 text-black">
            <li>
              El usuario no indicó consideraciones especiales más allá de los
              procedimientos normales de respaldo:{" "}
              <span className="font-semibold">0</span>
            </li>
            <li>
              <p className="font-semibold">
                Seleccionar los puntos siguientes que tienen relación con la
                aplicación. Cada ítem tiene un puntaje de 1, con excepción de lo
                que se indica en contrario: 1-4
              </p>
              <ul className="list-disc ml-8 text-black">
                <li>
                  Se proveyeron procesos efectivos para inciación del
                  procesamiento, respaldo, y recuperación pero se requiere
                  intervención del operador:{" "}
                  <span className="font-semibold">1</span>
                </li>
                <li>
                  Se proveyeron procesos efectivos para iniciación del
                  procesamiento, respaldo, y recuperación y no se requiere
                  intervención del operador (contar como dos ítems):{" "}
                  <span className="font-semibold">2</span>
                </li>
                <li>
                  La aplicación minimiza la necesidad del montaje de cintas:{" "}
                  <span className="font-semibold">1</span>
                </li>
                <li>
                  La aplicación minimiza el manipuleo de formularios:{" "}
                  <span className="font-semibold">1</span>
                </li>
              </ul>
            </li>
            <li>
              La aplicación está diseñada para operación no asistida. Operación
              no asistida significa que no se requiere intervención de operador
              salvo para comenzar o terminar la aplicación. Una característica
              de la aplicación es la recuperación automática ante errores:{" "}
              <span className="font-semibold">5</span>
            </li>
          </ul>
        </div>
      ),
      "Instalaciones múltiples": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            13. Instalaciones múltiples
          </h3>
          <p className="text-black">
            La aplicación ha sido específicamente diseñada, desarrollada, y
            soportada para su instalación en múltiples instalaciones para
            múltiples organizaciones.
          </p>
          <p className="text-black">El puntaje es el siguiente:</p>
          <ul className="list-disc ml-8 text-black">
            <li>
              No existen requerimientos para considerar las necesidades de más
              de un usuario o ubicación:{" "}
              <span className="font-semibold">0</span>
            </li>
            <li>
              En el diseño se han considerado instalaciones múltiples, pero la
              aplicación está diseñada para operar solamente en idénticos
              ambientes de hardware y software (
              <span className="font-semibold">1</span>):{" "}
              <span className="font-semibold">1</span>
            </li>
            <li>
              En el diseño se han considerado instalaciones múltiples, y la
              aplicación está diseñada para operar solamente en similares
              ambientes de hardware y software (
              <span className="font-semibold">2</span>):{" "}
              <span className="font-semibold">2</span>
            </li>
            <li>
              En el diseño se han considerado instalaciones múltiples, y la
              aplicación está diseñada para operar en distintos ambientes de
              hardware y software (<span className="font-semibold">3</span>):{" "}
              <span className="font-semibold">3</span>
            </li>
            <li>
              <p>
                Se proporciona y prueba documentación y un plan para soportar la
                aplicación en múltiples instalaciones, y la aplicación es tal
                como se la describe en (1) o en (2):{" "}
                <span className="font-semibold">4</span>
              </p>
            </li>
            <li>
              <p>
                Se proporciona y prueba documentación y un plan para soportar la
                aplicación en múltiples instalaciones, y la aplicación es tal
                como se la describe en (3):{" "}
                <span className="font-semibold">5</span>
              </p>
            </li>
          </ul>
        </div>
      ),
      "Facilidades de cambio": (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black">
            14. Facilidad de Modificación
          </h3>
          <p className="text-black">
            La aplicación ha sido específicamente diseñada, desarrollada, y
            soportada como para facilitar modificaciones.
          </p>
          {/*
          <p className="text-black">
            Se proporciona una capacidad flexible para la realización de
            consultas o producción de informes. Los datos de control se agrupan
            en tablas que pueden ser mantenidas por el usuario.
          </p> */}
          
          <p className="text-black">El puntaje es el siguiente:</p>
          <ul className="list-disc ml-2 text-black ">
            <li>
              No existe ningún requerimiento especial del usuario para diseñar
              la aplicación para minimizar o facilitar las modificaciones:{" "}
              <span className="font-semibold">0</span>
            </li>
            <li>
              <p>
                Seleccionar cuál de los items siguientes se pueden aplicar al
                sistema y valuar de 1 a 5:
              </p>
              <ol className="list-disc ml-4">
                <li>
                  Se proporcionan facilidades flexibles para la realización de
                  consultas o producción de informes que pueden manejar pedidos
                  simples; por ejemplo, lógica "and/or" aplicada sólo a un
                  Archivo Lógico Interno (contar como un item):{" "}
                  <span className="font-semibold">1</span>
                </li>
                <li>
                  Se proporcionan facilidades flexibles para la realización de
                  consultas o producción de informes que pueden manejar pedidos
                  de complejidad media; por ejemplo, lógica "and/or" aplicada a
                  más de un Archivo Lógico Interno (contar como dos items):{" "}
                  <span className="font-semibold">2</span>
                </li>
                <li>
                  Se proporcionan facilidades flexibles para la realización de
                  consultas o producción de informes que pueden manejar pedidos
                  complejos; por ejemplo, lógica "and/or" aplicada a uno o más
                  Archivos Lógicos Internos (contar como tres items):{" "}
                  <span className="font-semibold">3</span>
                </li>
                <li>
                  Se guardan en tablas datos de control que son mantenidos por
                  el usuario con procesos interactivos en línea, pero los
                  cambios tienen efecto sólo al día siguiente:{" "}
                  <span className="font-semibold">4</span>
                </li>
                <li>
                  Se guardan en tablas datos de control que son mantenidos por
                  el usuario con procesos interactivos en línea, y los cambios
                  tienen efecto en forma inmediata (contar como dos items):{" "}
                  <span className="font-semibold">5</span>
                </li>
              </ol>
            </li>
          </ul>
        </div>
      ),
      Fase1: (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            FASE 1: Destinada a la gestión de las Funcionalidades/Requerimientos
            del software al que deseemos estimar su costo
          </h3>
          <h3 className="text-lg font-semibold text-black mb-2"></h3>
          <p className="text-black mb-4">
            Para poder estimar el costo de un proyecto de software, es necesario
            conocer las funcionalidades que el software debe cumplir. Para ello,
            se debe realizar un análisis de requerimientos, el cual consiste en
            identificar y describir las funcionalidades que el software debe
            cumplir.
          </p>
          <p className="text-black mb-4">
            Los tipos de funcionalidades que se deben identificar son:
          </p>
          <ul className="list-disc ml-8 text-black">
            <li>EE (Entrada Externa)</li>
            <li>SE (Salida Externa)</li>
            <li>CE (Consulta Externa)</li>
            <li>ALI (Archivo Lógico Interno)</li>
            <li>AIE (Archivo de Interfaz Externo)</li>
          </ul>
        </div>
      ),
      Fase2: (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            FASE 2: Cálculo de puntos de función sin el ajuste
          </h3>
          <h3 className="text-lg font-semibold text-black mb-2"></h3>
          <p className="text-black mb-4">
            Para poder calcular los puntos de función sin el ajuste se toma en
            cuenta las funcionalidades ingresadas en la fase anterior, además de
            la complejidad, tipo y cantidad de cada una de ellas.
          </p>
          <p className="text-black mb-4">
            Para ello se aplica la siguiente ecuación:
          </p>
          <p className="text-black mb-4 text-center">
            <b>PFSA=</b>∑(Complejidad * Peso)
          </p>
        </div>
      ),
      Fase3: (
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-black mb-2">
            FASE 3: Factores de ajuste del método de puntos de función
          </h3>
          <p className="text-black mb-4">
            Evaluados de 0 a 5, en donde 0 es una relevancia sin importancia y 5
            uno muy importante. Esto nos permite ajustar el cálculo de puntos de
            función tomando en cuenta ciertod factores comunes dentro de la
            industria
          </p>
          <p className="text-black mb-4">
            Los factores de ajuste son los siguientes:
          </p>
          <ul className="list-disc ml-8 text-black">
            <li>Comunicación de datos</li>
            <li>Procesamiento distribuido</li>
            <li>Objetivos de rendimiento</li>
            <li>Configuración del equipamiento</li>
            <li>Tasa de transacciones</li>
            <li>Entrada de datos en línea</li>
            <li>Interfaz con el usuario</li>
            <li>Actualizaciones en línea</li>
            <li>Procesamiento complejo</li>
            <li>Reusabilidad del código</li>
            <li>Facilidad de implementación</li>
            <li>Facilidad de operación</li>
            <li>Instalaciones múltiples</li>
            <li>Facilidades de cambio</li>
          </ul>
        </div>
      ),
      Fase4: (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            FASE 4: Cálculo de Puntos de Función Ajustado
          </h3>

          <p className="text-sm text-black mb-4">
            La manera de calcular los puntos de función ajustado (PFA) es la
            siguiente:
          </p>

          <p className="text-sm text-black text-center">
            <strong>PFA =</strong> PFSA * (0.65 + 0.01 * FA)
          </p>

          <p className="text-sm text-black">Donde:</p>

          <ul className="list-disc pl-6 text-sm text-black">
            <li>PFA: Puntos de función ajustado</li>
            <li>PFSA: Puntos de función sin ajustar</li>
            <li>FA: Factores de ajuste</li>
          </ul>
        </div>
      ),
      Fase5: (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-black mb-2">
            FASE 5: Cálculo del esfuerzo del proyecto
          </h3>
          <p className="text-sm text-black mb-4">
            El cálculo del esfuerzo del proyecto se realiza en base a los puntos
            de función ajustados (PFA) y a las horas por puntos de función
            (H/PF). Este valor del esfuerzo nos permite estimar la cantidad de
            tiempo en meses que tendra el proeyecto.
          </p>
          <p className="text-sm text-black mb-4">
            La ecuación para calcular el esfuerzo es la siguiente:
          </p>
          <p className="text-sm text-black text-center">
            <strong>Esfuerzo = PFA * (H/PF)</strong>
          </p>
          <p className="text-sm text-black font-semibold">Donde:</p>
          <ul className="list-disc pl-6 text-sm text-black mb-2">
            <li>Esfuerzo: Esfuerzo estimado en horas</li>
            <li>PFA: Puntos de función ajustados</li>
            <li>H/PF: Horas por puntos de función</li>
          </ul>
          <p className="text-sm text-black mb-2">
            Para obtener los días de trabajo estimados realizamos el siguiente
            cálculo:
          </p>

          <p className="text-sm text-black text-center mb-2">
            <strong>DiasTrabajo = </strong>Esfuerzo / Horas de trabajo por día
          </p>

          <p className="text-sm text-black mb-2">
            Por último, se calcularán los meses de trabajo estimados para el
            proyecto:
          </p>

          <p className="text-sm text-black text-center">
            <strong>MesesTrabajo = </strong>DiasTrabajo / Dias por mes
            trabajados
          </p>
        </div>
      ),
      Fase6: (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-black mb-2">
            FASE 6: Cálculo del presupuesto del proyecto
          </h3>
          <p className="text-sm text-black mb-4">
            El cálculo del presupuesto del proyecto se realiza en base a el esfuerzo
            en meses del proyecto, los involucrados del proyecto y los otros gastos.
            Este valor monetario nos da un esstimado del costo final del proyecto.
          </p>
          <p className="text-sm text-black mb-4">
            La ecuación para calcular el presupuesto es la siguiente:
          </p>
          <p className="text-sm text-black text-center">
            <strong>Costo = (nd ∗ dm ∗ ps) + og</strong>
          </p>
          <p className="text-sm text-black font-semibold">Donde:</p>
          <ul className="list-disc pl-6 text-sm text-black mb-2">
            <li>nd = Número de involucrados.</li>
            <li>dm = Duración del proyecto en meses.</li>
            <li>ps = Promedio de sueldos de los involucrados.</li>
            <li>og = suma de otros gastos.</li>
          </ul>
        </div>
      ),
      Fase7: (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            Fase 7: Generar PDF
          </h3>
          <p className="text-black">
            Es fase está destinada en la elaboración del informe final del
            proyecto, en el cual se detallan los resultados obtenidos en las
            fases anteriores en un archivo en formato PDF
          </p>
        </div>
      ),
      Tipo: (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-black mb-2">Tipos de Funciones</h3>
        <p className="text-black">
          Descripción de los diferentes tipos de funciones en un sistema de información.
        </p>
        <table className="min-w-full text-black bg-white border border-gray-300 rounded-md overflow-hidden mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Tipos</th>
              <th className="py-2 px-4 border-b">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">EE (Entrada Externa)</td>
              <td className="py-2 px-4 border-b">Número de interfaces en donde el usuario ingresa información al software.</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">SE (Salida Externa)</td>
              <td className="py-2 px-4 border-b">Generan información dentro de la aplicación y la muestra al usuario. Se relaciona con listados de datos, mensajes de error, vistas e informes.</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">CE (Consulta Externa)</td>
              <td className="py-2 px-4 border-b">Hace referencia a las búsquedas de información que los usuarios realizan en el sistema.</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">ALI (Archivo Lógico Interno)</td>
              <td className="py-2 px-4 border-b">Son grupos de datos que tienen relación entre sí, y son almacenados en la aplicación. Por ejemplo, una base de datos.</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">AIE (Archivo de Interfaz Externo)</td>
              <td className="py-2 px-4 border-b">Un conjunto organizado de datos que existe fuera de la aplicación pero que suministra información útil para su uso en la misma.</td>
            </tr>
          </tbody>
        </table>
      </div>
      ),
      Complejidad: (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-black mb-2">Complejidad estándar de acuerdo a cada tipo de funcionalidad</h3>

        <table className="w-full bg-white text-black border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-center">Tipos</th>
              <th className="py-2 px-4 border-b text-center">Complejidad Baja</th>
              <th className="py-2 px-4 border-b text-center">Complejidad Media</th>
              <th className="py-2 px-4 border-b text-center">Complejidad Alta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b text-center">EE (Entrada Externa)</td>
              <td className="py-2 px-4 border-b text-center">3</td>
              <td className="py-2 px-4 border-b text-center">4</td>
              <td className="py-2 px-4 border-b text-center">6</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">SE (Salida Externa)</td>
              <td className="py-2 px-4 border-b text-center">4</td>
              <td className="py-2 px-4 border-b text-center">5</td>
              <td className="py-2 px-4 border-b text-center">7</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">CE (Consulta Externa)</td>
              <td className="py-2 px-4 border-b text-center">3</td>
              <td className="py-2 px-4 border-b text-center">4</td>
              <td className="py-2 px-4 border-b text-center">6</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">ALI (Archivo Lógico Interno)</td>
              <td className="py-2 px-4 border-b text-center">7</td>
              <td className="py-2 px-4 border-b text-center">10</td>
              <td className="py-2 px-4 border-b text-center">15</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">AIE (Archivo de Interfaz Externo)</td>
              <td className="py-2 px-4 border-b text-center">5</td>
              <td className="py-2 px-4 border-b text-center">10</td>
              <td className="py-2 px-4 border-b text-center">10</td>
            </tr>
          </tbody>
        </table>
      </div>
      ),
      cantidad: (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">Cantidad de Funciones</h3>
          <p className="text-black">
            La cantidad de funciones se refiere a la cantidad de veces que se repite cada tipo de funcionalidad en el proyecto de software.
          </p>
        </div>
        ),
  
    };

    // Retorna el contenido personalizado o el mensaje original si no hay coincidencia
    return customContents[message] || <p>{message}</p>;
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="flex items-center justify-center mb-4">
              <div className="text-sm">{getCustomContent(message)}</div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomPopup;
