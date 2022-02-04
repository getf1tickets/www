/* eslint-disable jsx-a11y/alt-text */
import {
  Page, View, Text, Image, Document,
} from '@react-pdf/renderer';
import { fCurrency } from '../../utils/formatNumber';
import styles from './OrderPDFStyle';

export default function InvoicePDF({ order, orderId }) {
  const {
    products, total, subtotal, status, address,
  } = order;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="https://s3.getf1tickets.com/public/logo-larger.png" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>{status}</Text>
            <Text>
              n°
              {orderId}
            </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Invoice from</Text>
            <Text style={styles.body1}>F1 Tickets</Text>
            <Text style={styles.body1}>Formula One</Text>
            <Text style={styles.body1}>Phone: (+001) 237 2838</Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Invoice to</Text>
            <Text style={styles.body1}>{address.fullName}</Text>
            <Text style={styles.body1}>{address.address}</Text>
            <Text style={styles.body1}>
              {address.zip}
              ,
              {' '}
              {address.city}
            </Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Description</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Qty</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Unit price</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Total</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {products.map((product, index) => (
              <View style={styles.tableRow} key={product.id}>
                <View style={styles.tableCell_1}>
                  <Text>{index + 1}</Text>
                </View>
                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{product.description.name}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{product.quantity}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{product.price}</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(product.quantity * product.price)}</Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Subtotal</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(subtotal)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Taxes</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(0)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{fCurrency(total)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={[styles.col12, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>support@getf1tickets.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
