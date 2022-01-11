import { Container, Stack } from '@mui/material';
import Page from '../components/Page';
import ShopProductList from '../components/shop/ShopProductList';

export default function Tickets() {
  return (
    <Page title="Ecommerce: Shop">
      <Container maxWidth="xl">
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        />

        {/* <Stack sx={{ mb: 3 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{filteredProducts.length}</strong>
                &nbsp;Products found
              </Typography>

              <ShopTagFiltered
                filters={filters}
                isShowReset={!isDefault && !openFilter}
                onRemoveGender={handleRemoveGender}
                onRemoveCategory={handleRemoveCategory}
                onRemoveColor={handleRemoveColor}
                onRemovePrice={handleRemovePrice}
                onRemoveRating={handleRemoveRating}
                onResetAll={handleResetFilter}
              />
            </>
          )}
        </Stack> */}

        <ShopProductList
          products={[
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
              cover: 'https://www.mbcyachts.com/wp-content/uploads/2019/05/f1-monaco-gp.jpg',
              images: [
                'https://www.mbcyachts.com/wp-content/uploads/2019/05/f1-monaco-gp.jpg',
              ],
              name: 'Monaco Grand Prix',
              tags: [
                'Monaco',
                'Grand Prix',
              ],
              price: 299,
              status: 'out of stock',
              available: 20,
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
              cover: 'https://f1only.fr/wp-content/uploads/2021/06/E3yNoLIXEAwhcHW-scaled.jpg',
              images: [
                'https://f1only.fr/wp-content/uploads/2021/06/E3yNoLIXEAwhcHW-scaled.jpg',
              ],
              name: 'French Grand Prix',
              tags: [
                'French',
                'Grand Prix',
              ],
              price: 249,
              status: '',
              available: 20,
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
              cover: 'https://www.formula1.com/content/dam/fom-website/sutton/2019/Austria/Sunday/1017582243-LAT-20190630-_2ST8044.jpg',
              images: [
                'https://www.formula1.com/content/dam/fom-website/sutton/2019/Austria/Sunday/1017582243-LAT-20190630-_2ST8044.jpg',
              ],
              name: 'Austrian Grand Prix',
              tags: [
                'Austrian',
                'Grand Prix',
              ],
              price: 349,
              status: '',
              available: 20,
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
              cover: 'https://cdn-1.motorsport.com/static/img/amp/4900000/4980000/4982000/4982600/4982611/s6_1009861/1009861.jpg',
              images: [
                'https://cdn-1.motorsport.com/static/img/amp/4900000/4980000/4982000/4982600/4982611/s6_1009861/1009861.jpg',
              ],
              name: 'British Grand Prix',
              tags: [
                'Silverstone',
                'British',
                'Grand Prix',
              ],
              price: 349,
              status: '',
              available: 20,
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
              cover: 'https://cdn.racingnews365.com/transforms/default/79174/AP-227CQTYV91W11_news_101d7b8599c0cc599ee16e9637ccc19e.jpg',
              images: [
                'https://cdn.racingnews365.com/transforms/default/79174/AP-227CQTYV91W11_news_101d7b8599c0cc599ee16e9637ccc19e.jpg',
              ],
              name: 'Saõ Polo Grand Prix',
              tags: [
                'Saõ Polo',
                'Brazil',
                'Grand Prix',
              ],
              price: 349,
              status: '',
              available: 20,
            },
            {
              id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
              cover: 'https://www.formula1.com/content/dam/fom-website/sutton/2019/Australia/Sunday/1017394384-LAT-20190317-_86I6028-16x9.jpg.transform/9col/image.jpg',
              images: [
                'https://www.formula1.com/content/dam/fom-website/sutton/2019/Australia/Sunday/1017394384-LAT-20190317-_86I6028-16x9.jpg.transform/9col/image.jpg',
              ],
              name: 'Australian Grand Prix',
              tags: [
                'Australian',
                'Grand Prix',
              ],
              price: 349,
              status: '',
              available: 20,
            },
          ]}
          loading={false}
        />

        {/* <CartWidget /> */}
      </Container>
    </Page>
  );
}
