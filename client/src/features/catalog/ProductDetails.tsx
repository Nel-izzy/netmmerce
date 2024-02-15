import { ChangeEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Product } from "../../app/models/Product";
import { Box, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import Loader from "../../app/layout/Loader";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";





const ProductDetails = () => {
  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0)

  const item = basket?.items.find(i => i.productId === product?.id)



  useEffect(() => {
    if (item) setQuantity(item.quantity)
    id && agent.Catalog.details(parseInt(id))
      .then(res => setProduct(res))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));

  }, [id, item]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (parseInt(event?.currentTarget.value) > 0) {
      setQuantity(parseInt(event.currentTarget.value))
    }
  }

  function handleUpdateCart() {
    if (!product) return

    if (!item || quantity > item?.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity
      dispatch(addBasketItemAsync({ productId: product?.id, quantity: updatedQuantity }))
    } else {
      const updatedQuantity = item.quantity - quantity
      dispatch(removeBasketItemAsync({ productId: product?.id, quantity: updatedQuantity }))
    }

  }

  if (loading) return <Loader message="Loading Product..." />
  if (!product) return <NotFound />
  return (
    <Grid sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <Box>
        <Grid>
          <img src={product.pictureUrl} alt={product.name} />
        </Grid>
      </Box>
      <Box>
        <Grid>
          <Typography variant="h6">{product.name}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary">₦{(product.price / 100).toFixed(2)}</Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name </TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description </TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity In Stock</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                type="number"
                label='Quantity in Cart'
                fullWidth
                value={quantity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                sx={{ height: '55px' }}
                color='primary'
                variant="contained"
                size='large'
                fullWidth
                loading={status.includes('pending')}
                onClick={handleUpdateCart}
                disabled={item?.quantity === quantity || !item && quantity === 0}
              >
                {item ? 'Update quantity' : 'Add to Cart'}
              </LoadingButton>
            </Grid>
          </Grid>

        </Grid>
      </Box>
    </Grid>

  )
}

export default ProductDetails