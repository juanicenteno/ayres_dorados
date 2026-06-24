// src/components/GeneradorVoucher.jsx
import { useState, useEffect } from 'react';
import { pdf, PDFViewer } from '@react-pdf/renderer'; 
import { VoucherPDF } from './VoucherPDF';
import '../styles/admin.css';

// Parche para el Buffer en Vite
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
}

export default function GeneradorVoucher() {
  const [formData, setFormData] = useState({
    fechaReserva: new Date().toLocaleDateString('es-AR'),
    nroReserva: '',
    referencia: '',
    referenciaOTA: '',
    estado: 'C. Sin anticipo',
    origen: 'Canal OTA',
    refPMS: '',
    empresa: '',
    politica: 'FLEXIBLE',
    fechaLlegada: '',
    fechaSalida: '',
    noches: '1',
    adultos: '2',
    menores: '0',
    observaciones: '',
    transporte: '',
    apellido: '',
    nombres: '',
    mail: '',
    direccion: '',
    ciudad: '',
    pais: '',
    sexo: '',
    tipoDocumento: '',
    nroDocumento: '',
    idioma: 'Español',
    telFijo: '',
    telMovil: '',
    detalleCodigo: 'DBL.ESTD',
    detalleDescripcion: 'Doble estándar para 2 adultos Con Desayuno',
    detallePrecio: '',
    totalAnticipo: '0.00',
    vtoAnticipo: '',
  });
  const [pdfData, setPdfData] = useState(formData);
  const [generando, setGenerando] = useState(false);

useEffect(() => {
    const timer = setTimeout(() => {
      setPdfData(formData);
    }, 1000); // 1000ms de espera

    return () => clearTimeout(timer);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDescargarPDF = async () => {
    setGenerando(true);
    try {
      const documento = <VoucherPDF datos={formData} />;
      const blob = await pdf(documento).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Voucher_${formData.nroReserva || '000'}_${formData.apellido || 'Pasajero'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un error al generar el PDF. Revisa la consola.");
    } finally {
      setGenerando(false);
    }
  };

  // SOLUCIÓN AQUÍ: Cambiamos de Componente (<InputGroup />) a Función (renderInput())
  const renderInput = (label, name, type = "text", customClass = "") => (
    <div className={`form-group ${customClass}`}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );

  return (
    <div className="voucher-container">
      <div className="voucher-header">
        <h2 className="voucher-title">Carga de Voucher</h2>
        <button
          onClick={handleDescargarPDF}
          className={`btn-descarga ${generando ? 'btn-loading' : ''}`}
          disabled={generando}
        >
          {generando ? 'Generando PDF...' : '⬇ Descargar PDF'}
        </button>
      </div>

      <div className="voucher-body">
        {/* SECCIÓN 1 */}
        <section className="form-section">
          <h3 className="section-title">1. Datos Generales de la Reserva</h3>
          <div className="form-grid grid-4">
            {/* Llamamos a la función con {} en lugar de usar etiquetas < /> */}
            {renderInput("N° Reserva", "nroReserva")}
            {renderInput("Fecha Reserva", "fechaReserva", "date")}
            {renderInput("Referencia", "referencia")}
            {renderInput("Referencia OTA", "referenciaOTA")}
            {renderInput("Origen", "origen")}
            {renderInput("Ref PMS", "refPMS")}
            {renderInput("Empresa", "empresa")}
            {renderInput("Estado", "estado")}
            {renderInput("Política", "politica")}
          </div>
        </section>

        {/* SECCIÓN 2 */}
        <section className="form-section">
          <h3 className="section-title">2. Estadía</h3>
          <div className="form-grid grid-5">
            {renderInput("Fecha Llegada", "fechaLlegada", "date")}
            {renderInput("Fecha Salida", "fechaSalida", "date")}
            {renderInput("Noches", "noches", "number")}
            {renderInput("Adultos", "adultos", "number")}
            {renderInput("Menores", "menores", "number")}
          </div>
          <div className="form-grid grid-2">
            <div className="form-group">
              <label className="form-label">Observaciones</label>
              <textarea name="observaciones" value={formData.observaciones} onChange={handleChange} className="form-textarea" rows="2"></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Transporte</label>
              <textarea name="transporte" value={formData.transporte} onChange={handleChange} className="form-textarea" rows="2"></textarea>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3 */}
        <section className="form-section">
          <h3 className="section-title">3. Datos del Pasajero Principal</h3>
          <div className="form-grid grid-4">
            {renderInput("Nombres", "nombres")}
            {renderInput("Apellido", "apellido")}
            {renderInput("Email", "mail", "email")}
            {renderInput("Tel. Móvil", "telMovil")}
            {renderInput("Nro. Documento", "nroDocumento")}
            {renderInput("Tipo Documento", "tipoDocumento")}
            {renderInput("País", "pais")}
            {renderInput("Ciudad", "ciudad")}
            {renderInput("Dirección", "direccion", "text", "span-2")}
            {renderInput("Idioma", "idioma")}
            {renderInput("Sexo (0/1)", "sexo")}
          </div>
        </section>

        {/* SECCIÓN 4 */}
        <section className="form-section">
          <h3 className="section-title">4. Tarifa y Totales</h3>
          <div className="form-grid grid-4">
            {renderInput("Código Hab.", "detalleCodigo")}
            {renderInput("Descripción", "detalleDescripcion", "text", "span-2")}
            {renderInput("Precio Total (AR$)", "detallePrecio", "number")}
            {renderInput("Anticipo (USD)", "totalAnticipo", "number")}
            {renderInput("Vto. Anticipo", "vtoAnticipo", "date")}
          </div>
        </section>
      </div>
    <div className="panel-preview">
        <PDFViewer showToolbar={true} className="visor-pdf">
          <VoucherPDF datos={pdfData} />
        </PDFViewer>
    </div>
  </div>
  );
}