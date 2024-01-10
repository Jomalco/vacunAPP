{/*
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { flex: 1, flexDirection: 'column', backgroundColor: '#E4E4E4', justifyContent: 'flex-start'},
  section: { margin: 10, padding: 10, alignSelf: 'center'},
  vacunas: { marginVertical: 10 },
  vacunasSection: { flex: 1, flexDirection: 'column', marginVertical: 5, paddingHorizontal: 10  },
  vacunasDetails: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottom: '1 solid black' },
  text: {fontSize: 12, textAlign: 'justify', fontFamily: 'Times-Roman'}
});

const PDFDocument = ({vacunasPasadas}) => (
  <Document>
    <Page size="A4" >
      <View style={styles.page}>
        <View style={styles.section}>
          <Text>Registro de Vacunas</Text>
        </View>
        <View style={styles.vacunasSection}>
          {vacunasPasadas.map((item, index) => {
            if(item.status == 1) {
              return(
                <View style={styles.vacunasDetails}>
                  <View>
                    <Text style={styles.text}>{"Vacuna: " + item.nombre}</Text>
                    <Text style={styles.text}>{"Fecha de vacunación: " + item.fechaVacunacion}</Text>
                  </View>
                  <View>
                    <Text style={styles.text}>{"Vacuna: " + item.MD}</Text>
                  </View>
                </View>
              )
            }
          })}
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
        */}