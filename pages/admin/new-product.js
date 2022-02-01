import { Container } from '@mui/material';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewForm from '../../components/product/ProductNewForm';

export default function ProductCreate() {
  return (
    <Page title="Create a new product">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs heading="Create a new product" />
        <ProductNewForm />
      </Container>
    </Page>
  );
}
