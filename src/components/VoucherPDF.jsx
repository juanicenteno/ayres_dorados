// src/components/VoucherPDF.jsx

import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 20, fontSize: 8, fontFamily: 'Helvetica', color: '#333' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 30, height: 30, marginRight: 10 },
  title: { fontSize: 14, fontWeight: 'bold' },
  headerRight: { flexDirection: 'column', alignItems: 'flex-end' },
  headerInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 5 },
  col: { flex: 1, paddingRight: 5 },
  label: { fontWeight: 'bold', marginRight: 5, paddingBottom: 2 },
  value: { borderBottomWidth: 1, borderBottomColor: '#AAA', paddingBottom: 2, minHeight: 12, flex: 1 },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', marginTop: 10, marginBottom: 5, backgroundColor: '#F0F0F0', padding: 5 },
  table: { width: '100%', marginTop: 10 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#F0F0F0', padding: 5, fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', padding: 5, borderBottomWidth: 1, borderBottomColor: '#EEE', borderStyle: 'dashed' },
  tableCol: { flex: 1, textAlign: 'left' },
  tableColRight: { flex: 1, textAlign: 'right' },
  totalsContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 },
  totalsBox: { width: '40%', backgroundColor: '#F0F0F0', padding: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  totalLabel: { fontWeight: 'bold', flex: 1, textAlign: 'right', paddingRight: 10 },
  totalValue: { flex: 1, textAlign: 'right', borderBottomWidth: 1, borderBottomColor: '#AAA', padding: 2 },
  footer: { position: 'absolute', bottom: 20, left: 20, right: 20, textAlign: 'center', fontSize: 8, color: '#999' }
});

export const VoucherPDF = ({ datos }) => {
  // Formateador simple de precios para que no queden vacíos en el PDF
  const formatearPrecio = (precio) => precio ? Number(precio).toLocaleString('es-AR') : '0';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* CABECERA */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src="/logo_black.png" /> 
            <Text style={styles.title}>AYRES DORADOS</Text>
          </View>
          <View style={styles.headerRight}>
            <Text>Fecha Reserva: {datos.fechaReserva}</Text>
            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
              <Text style={{ ...styles.label, fontSize: 12, borderBottomWidth: 0 }}>N° Reserva:</Text>
              <Text style={{ fontSize: 12, width: 60, textAlign: 'right', backgroundColor: '#F0F0F0', padding: 3 }}>
                {datos.nroReserva || 'S/N'}
              </Text>
            </View>
          </View>
        </View>

        {/* INFO GENERAL */}
        <View style={styles.headerInfo}>
          <View style={styles.col}>
            <View style={styles.row}><Text style={styles.label}>Referencia:</Text><Text style={styles.value}>{datos.referencia}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Origen:</Text><Text style={styles.value}>{datos.origen}</Text></View>
          </View>
          <View style={styles.col}>
            <View style={styles.row}><Text style={styles.label}>Referencia OTA:</Text><Text style={styles.value}>{datos.referenciaOTA}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Ref PMS:</Text><Text style={styles.value}>{datos.refPMS}</Text></View>
          </View>
          <View style={styles.col}>
            <View style={styles.row}><Text style={styles.label}>Estado:</Text><Text style={styles.value}>{datos.estado}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Política:</Text><Text style={styles.value}>{datos.politica}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Empresa:</Text><Text style={styles.value}>{datos.empresa}</Text></View>
          </View>
        </View>

        {/* FECHAS */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <View style={{ ...styles.row, flex: 2 }}><Text style={styles.label}>Fecha Llegada:</Text><Text style={styles.value}>{datos.fechaLlegada}</Text></View>
          <View style={{ ...styles.row, flex: 2 }}><Text style={styles.label}>Fecha Salida:</Text><Text style={styles.value}>{datos.fechaSalida}</Text></View>
          <View style={{ ...styles.row, flex: 1 }}><Text style={styles.label}>Noches:</Text><Text style={styles.value}>{datos.noches}</Text></View>
          <View style={{ ...styles.row, flex: 1 }}><Text style={styles.label}>Adultos:</Text><Text style={styles.value}>{datos.adultos}</Text></View>
          <View style={{ ...styles.row, flex: 1 }}><Text style={styles.label}>Menores:</Text><Text style={styles.value}>{datos.menores}</Text></View>
        </View>

        {/* OBSERVACIONES */}
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={{ flex: 1 }}>
              <Text style={{ ...styles.label, marginBottom: 8 }}>Observaciones / Comentarios del Pasajero:</Text>
            <Text style={{ ...styles.value, height: 60, width: 200 }}>{datos.observaciones}</Text>
            </View>
          <View >
            <Text style={{ ...styles.label, marginBottom: 8 }}>Transporte:</Text>
            <Text style={{ ...styles.value, height: 60, width: 200 }}>{datos.transporte}</Text>
          </View>
        </View>

        {/* DATOS DEL PASAJERO */}
        <Text style={styles.sectionTitle}>Datos de los pasajeros:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.col}>
            <View style={styles.row}><Text style={styles.label}>Apellido:</Text><Text style={styles.value}>{datos.apellido}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Dirección:</Text><Text style={styles.value}>{datos.direccion}</Text></View>
            <View style={styles.row}>
              <Text style={styles.label}>Sexo:</Text>
              <Text style={styles.value}>{datos.sexo}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tipo Doc:</Text>
              <Text style={styles.value}>{datos.tipoDocumento}</Text>
            </View>
            <View style={styles.row}><Text style={styles.label}>Idioma:</Text><Text style={styles.value}>{datos.idioma}</Text></View>
          </View>
          <View style={styles.col}>
            <View style={styles.row}><Text style={styles.label}>Nombres:</Text><Text style={styles.value}>{datos.nombres}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Ciudad:</Text><Text style={styles.value}>{datos.ciudad}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Tel. fijo:</Text><Text style={styles.value}>{datos.telFijo}</Text></View>
          </View>
          <View style={styles.col}>
            <View style={styles.row}><Text style={styles.label}>Mail:</Text><Text style={styles.value}>{datos.mail}</Text></View>
            <View style={styles.row}><Text style={styles.label}>País:</Text><Text style={styles.value}>{datos.pais}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Nro. Doc:</Text><Text style={styles.value}>{datos.nroDocumento}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Tel. móvil:</Text><Text style={styles.value}>{datos.telMovil}</Text></View>
          </View>
        </View>

        {/* DETALLE (Tabla) */}
        <Text style={styles.sectionTitle}>Detalle:</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={{ flex: 1 }}>Fecha</Text>
            <Text style={{ flex: 1 }}>Código</Text>
            <Text style={{ flex: 3 }}>Descripción</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>Precio Unitario</Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>Cantidad</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>Subtotal</Text>
          </View>
          
          <View style={styles.tableRow}>
            <View style={{ flex: 1 }}>
              <Text>{datos.fechaLlegada || ' '}</Text>
              <Text style={{ fontSize: 6, color: '#666' }}>Habitación</Text>
            </View>
            <Text style={styles.tableCol}>{datos.detalleCodigo}</Text>
            <View style={{ flex: 3 }}>
              <Text>Régimen de Comidas</Text>
              <Text style={{ fontSize: 6, color: '#666' }}>{datos.detalleDescripcion}</Text>
            </View>
            <Text style={styles.tableColRight}>AR$ {formatearPrecio(datos.detallePrecio)}</Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>1</Text>
            <Text style={styles.tableColRight}>AR$ {formatearPrecio(datos.detallePrecio)}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 5 }}>
          <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Total Detalle:</Text>
          <Text>AR$ <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{formatearPrecio(datos.detallePrecio)}</Text></Text>
        </View>

        {/* TOTALES FINALES */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsBox}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Totales:</Text>
            <View style={styles.totalRow}><Text style={styles.totalLabel}>Subtotal: ar</Text><Text style={styles.totalValue}>{formatearPrecio(datos.detallePrecio)}</Text></View>
            <View style={styles.totalRow}><Text style={styles.totalLabel}>Recargo/Dto:</Text><Text style={styles.totalValue}>0.00</Text></View>
            <View style={styles.totalRow}><Text style={styles.totalLabel}>Total sin cargos: ar</Text><Text style={styles.totalValue}>{formatearPrecio(datos.detallePrecio)}</Text></View>
            
            <Text style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Anticipo Requerido:</Text>
            <View style={styles.totalRow}><Text style={styles.totalLabel}>Anticipo: USD</Text><Text style={styles.totalValue}>{datos.totalAnticipo}</Text></View>
            <View style={styles.totalRow}><Text style={styles.totalLabel}>Vto. Anticipo:</Text><Text style={styles.totalValue}>{datos.vtoAnticipo}</Text></View>
            
            <View style={{ borderTopWidth: 1, borderTopColor: '#AAA', marginTop: 10, paddingTop: 5 }}>
              <View style={styles.totalRow}><Text style={styles.totalLabel}>Total Final: ar</Text><Text style={styles.totalValue}>{formatearPrecio(datos.detallePrecio)}</Text></View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Saldo a Pagar: ar</Text>
                <Text style={{...styles.totalValue, borderBottomWidth: 0, fontWeight: 'bold', fontSize: 10}}>
                  {formatearPrecio(datos.detallePrecio)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>ayresdorados.com</Text>
      </Page>
    </Document>
  );
};