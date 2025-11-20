// composables/useFacturacion.js
import { ref } from 'vue';

export function useFacturacion() {
  const loading = ref(false);
  const error = ref(null);

  // URLs de los servicios
  const URLS = {
    dev: 'https://dev.facturacfdi.mx:8083/WSAutofactura/WSAutoFactura',
    prod: 'https://autofactura.facturacfdi.mx/WSAutofactura/WSAutoFactura'
  };

  /**
   * Construye el envelope SOAP para las peticiones
   */
  const buildSOAPEnvelope = (method, params) => {
    const paramsXML = Object.entries(params)
      .map(([key, value]) => `<${key}>${escapeXML(value)}</${key}>`)
      .join('');

    return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ws="http://ws.autofactura.com/">
  <soap:Header/>
  <soap:Body>
    <ws:${method}>
      ${paramsXML}
    </ws:${method}>
  </soap:Body>
</soap:Envelope>`;
  };

  /**
   * Escapa caracteres especiales XML
   */
  const escapeXML = (str) => {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  /**
   * Parsea la respuesta SOAP XML
   */
  const parseSOAPResponse = (xmlText) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    // Buscar errores en el XML
    const soapFault = xmlDoc.getElementsByTagName('soap:Fault')[0];
    if (soapFault) {
      const faultString = soapFault.getElementsByTagName('faultstring')[0]?.textContent;
      throw new Error(faultString || 'Error en la respuesta SOAP');
    }

    return xmlDoc;
  };

  /**
   * Extrae el valor de un nodo del XML
   */
  const getNodeValue = (xmlDoc, tagName) => {
    const node = xmlDoc.getElementsByTagName(tagName)[0];
    return node ? node.textContent : null;
  };

  /**
   * Realiza una petición SOAP al servicio
   */
  const soapRequest = async (method, params, environment = 'dev') => {
    loading.value = true;
    error.value = null;

    try {
      const url = URLS[environment];
      const soapEnvelope = buildSOAPEnvelope(method, params);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml;charset=UTF-8',
          'SOAPAction': `http://ws.autofactura.com/${method}`
        },
        body: soapEnvelope
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      const xmlText = await response.text();
      const xmlDoc = parseSOAPResponse(xmlText);

      return xmlDoc;

    } catch (err) {
      error.value = err.message;
      console.error('Error en SOAP Request:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // ==================== MÉTODOS DEL SERVICIO ====================

  /**
   * UploadTicket - Subir un ticket a la base de datos
   */
  const uploadTicket = async (ticketData, environment = 'dev') => {
    const params = {
      noTicket: ticketData.noTicket,
      token: ticketData.token,
      XML: ticketData.XML,
      Total: ticketData.Total,
      fechaTicket: ticketData.fechaTicket,
      serie: ticketData.serie,
      rfcEmisor: ticketData.rfcEmisor,
      usuario: ticketData.usuario,
      password: ticketData.password,
      sucursal: ticketData.sucursal
    };

    const result = await soapRequest('UploadTicket', params, environment);

    return {
      codigo: getNodeValue(result, 'codigo'),
      mensaje: getNodeValue(result, 'mensaje')
    };
  };

  /**
   * CancelarTicket - Cancelar un ticket
   */
  const cancelarTicket = async (ticketData, environment = 'dev') => {
    const params = {
      noTicket: ticketData.noTicket,
      token: ticketData.token,
      usuario: ticketData.usuario,
      password: ticketData.password
    };

    const result = await soapRequest('CancelarTicket', params, environment);

    return {
      codigo: getNodeValue(result, 'codigo'),
      mensaje: getNodeValue(result, 'mensaje')
    };
  };

  /**
   * DownloadFactura - Descargar factura timbrada por UUID
   */
  const downloadFactura = async (facturaData, environment = 'dev') => {
    const params = {
      UUID: facturaData.UUID,
      usuario: facturaData.usuario,
      password: facturaData.password
    };

    const result = await soapRequest('DownloadFactura', params, environment);

    return {
      cfdi: getNodeValue(result, 'cfdi'),
      uuid: getNodeValue(result, 'uuid'),
      codigo: getNodeValue(result, 'codigo'),
      mensaje: getNodeValue(result, 'mensaje')
    };
  };

  /**
   * DownloadFacturaTicket - Descargar factura por número de ticket
   */
  const downloadFacturaTicket = async (ticketData, environment = 'dev') => {
    const params = {
      noTicket: ticketData.noTicket,
      token: ticketData.token,
      usuario: ticketData.usuario,
      password: ticketData.password
    };

    const result = await soapRequest('DownloadFacturaTicket', params, environment);

    return {
      cfdi: getNodeValue(result, 'cfdi'),
      uuid: getNodeValue(result, 'uuid'),
      codigo: getNodeValue(result, 'codigo'),
      mensaje: getNodeValue(result, 'mensaje')
    };
  };

  /**
   * FacturarTicket - Facturar un ticket específico
   */
  const facturarTicket = async (facturaData, environment = 'dev') => {
    const params = {
      noTicket: facturaData.noTicket,
      token: facturaData.token,
      rfcReceptor: facturaData.rfcReceptor,
      usuario: facturaData.usuario,
      password: facturaData.password,
      // Datos del receptor
      nombreReceptor: facturaData.nombreReceptor,
      usoCFDI: facturaData.usoCFDI || 'G03',
      regimenFiscal: facturaData.regimenFiscal || '601',
      domicilioReceptor: facturaData.domicilioReceptor || '',
      correoReceptor: facturaData.correoReceptor || ''
    };

    const result = await soapRequest('FacturarTicket', params, environment);

    return {
      cfdi: getNodeValue(result, 'cfdi'),
      uuid: getNodeValue(result, 'uuid'),
      codigo: getNodeValue(result, 'codigo'),
      mensaje: getNodeValue(result, 'mensaje')
    };
  };

  /**
   * InformacionTicket - Obtener información de un ticket
   */
  const informacionTicket = async (ticketData, environment = 'dev') => {
    const params = {
      noTicket: ticketData.noTicket,
      token: ticketData.token,
      usuario: ticketData.usuario,
      password: ticketData.password
    };

    const result = await soapRequest('InformacionTicket', params, environment);

    return getNodeValue(result, 'return');
  };

  /**
   * ListaTicketsFacturados - Obtener lista de tickets facturados
   */
  const listaTicketsFacturados = async (filtros, environment = 'dev') => {
    const params = {
      Serie: filtros.serie,
      InicioLista: filtros.inicioLista,
      tamanoLista: filtros.tamanoLista,
      fechaInicio: filtros.fechaInicio,
      fechafinal: filtros.fechaFinal,
      usuario: filtros.usuario,
      password: filtros.password
    };

    const result = await soapRequest('ListaTicketsFacturados', params, environment);

    return {
      tickets: result.getElementsByTagName('ticket'),
      codigo: getNodeValue(result, 'codigo'),
      mensaje: getNodeValue(result, 'mensaje')
    };
  };

  /**
   * ListaTicketsVencidos - Obtener lista de tickets vencidos
   */
  const listaTicketsVencidos = async (filtros, environment = 'dev') => {
    const params = {
      Serie: filtros.serie,
      InicioLista: filtros.inicioLista,
      tamanoLista: filtros.tamanoLista,
      fechaInicio: filtros.fechaInicio,
      fechafinal: filtros.fechaFinal,
      usuario: filtros.usuario,
      password: filtros.password
    };

    const result = await soapRequest('ListaTicketsVencidos', params, environment);

    return {
      tickets: result.getElementsByTagName('ticket'),
      codigo: getNodeValue(result, 'codigo'),
      mensaje: getNodeValue(result, 'mensaje')
    };
  };

  /**
   * TotalTicketsFacturados - Total de tickets facturados
   */
  const totalTicketsFacturados = async (filtros, environment = 'dev') => {
    const params = {
      Serie: filtros.serie,
      fechaInicio: filtros.fechaInicio,
      fechafinal: filtros.fechaFinal,
      usuario: filtros.usuario,
      password: filtros.password
    };

    const result = await soapRequest('TotalTicketsFacturados', params, environment);

    return {
      total: getNodeValue(result, 'total'),
      codigo: getNodeValue(result, 'codigo'),
      mensaje: getNodeValue(result, 'mensaje')
    };
  };

  /**
   * TotalTicketsVencidos - Total de tickets vencidos
   */
  const totalTicketsVencidos = async (filtros, environment = 'dev') => {
    const params = {
      Serie: filtros.serie,
      fechaInicio: filtros.fechaInicio,
      fechafinal: filtros.fechaFinal,
      usuario: filtros.usuario,
      password: filtros.password
    };

    const result = await soapRequest('TotalTicketsVencidos', params, environment);

    return {
      total: getNodeValue(result, 'total'),
      codigo: getNodeValue(result, 'codigo'),
      mensaje: getNodeValue(result, 'mensaje')
    };
  };

  /**
   * CancelarComprobante - Cancelar un comprobante timbrado
   */
  const cancelarComprobante = async (cancelacionData, environment = 'dev') => {
    const params = {
      uuid: cancelacionData.uuid,
      fecha: cancelacionData.fecha || new Date().toISOString().slice(0, 19),
      usuario: cancelacionData.usuario,
      password: cancelacionData.password,
      motivo: cancelacionData.motivo, // 01, 02, 03, 04
      foliosustitucion: cancelacionData.folioSustitucion || '',
      descripcionCancelacion: cancelacionData.descripcionCancelacion || ''
    };

    const result = await soapRequest('CancelarComprobante', params, environment);

    return {
      codigo: getNodeValue(result, 'codigo'),
      mensaje: getNodeValue(result, 'mensaje'),
      acuse: getNodeValue(result, 'acuse')
    };
  };

  /**
   * ConsultaCancelacionComprobante - Consultar estatus de cancelación
   */
  const consultaCancelacionComprobante = async (consultaData, environment = 'dev') => {
    const params = {
      uuid: consultaData.uuid,
      usuario: consultaData.usuario,
      password: consultaData.password
    };

    const result = await soapRequest('ConsultaCancelacionComprobante', params, environment);

    return {
      estatusCancelacion: getNodeValue(result, 'estatusCancelacion'),
      estado: getNodeValue(result, 'estado'),
      esCancelable: getNodeValue(result, 'esCancelable'),
      codEstatus: getNodeValue(result, 'codEstatus')
    };
  };

  return {
    loading,
    error,
    // Métodos principales
    uploadTicket,
    cancelarTicket,
    downloadFactura,
    downloadFacturaTicket,
    facturarTicket,
    informacionTicket,
    listaTicketsFacturados,
    listaTicketsVencidos,
    totalTicketsFacturados,
    totalTicketsVencidos,
    cancelarComprobante,
    consultaCancelacionComprobante,
    // Método genérico
    soapRequest
  };
}
