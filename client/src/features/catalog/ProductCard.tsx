
import { Link } from 'react-router-dom'
import { Product } from '../../app/models/Product'
import { Card, Button, CardActions, CardContent, CardMedia, Typography, CardHeader, Avatar } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { formatCurrency } from '../../app/utils/util'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { addBasketItemAsync } from '../basket/basketSlice'

type Props = {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const { status } = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch()


  return (

    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>{product.name.charAt(0).toUpperCase()}</Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.main' }
        }}
      />


      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', bgcolor: "primary.light" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color='secondary.main'>
          {formatCurrency(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          size="small"
          loading={status.includes('pendingAddItem' + product.id)}
          onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}
        >Add To Cart
        </LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}> View</Button>
      </CardActions>
    </Card>
  );
}




export default ProductCard