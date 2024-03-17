import axios from "./axios";


export const calcuarPFSARequest = async (id) => axios.get(`/calcularpfsa/${id}`);
export const getFactoresAjusteRequest = async (id) => axios.get(`/getfactoresajuste`);
export const guardarFactoresAjusteRequest = async (id, factoresAjuste) => axios.post(`/guardarfactoresajuste/${id}`, factoresAjuste);
export const getValorFactoresAjusteRequest = async (id) => axios.get(`/getvalorfactoresajuste/${id}`);
export const createValorFactoresAjusteRequest = async (id, valorFactoresAjuste) => axios.post(`/createvalorfactoresajuste/${id}`, valorFactoresAjuste);
export const getPuntosFuncionRequest = async (id) => axios.get(`/getPuntosFuncion/${id}`);
export const sumaValorFactoresAjusteRequest = async (id) => axios.get(`/sumaValorFactoresAjsute/${id}`);

export const actualizarDatosPFRequest = async (id, datosPF) => axios.post(`/actualizarDatosPF/${id}`, datosPF);

export const calcularPresupuestoRequest = async (id) => axios.get(`/calcularpresupuesto/${id}`);

export const createPDFRequest = async (fileName) => {
    try {
      const response = await axios.get('/createPDF', {
        responseType: 'blob',
      });
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
  
      // Crear un enlace temporal y asignar el Blob a su atributo 'href'
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
  
      // Establecer el atributo 'download' con el nombre del archivo deseado
      link.download = fileName || 'informePDF.pdf';
  
      // Simular un clic en el enlace para iniciar la descarga
      link.click();
  
      // Liberar recursos del enlace
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };