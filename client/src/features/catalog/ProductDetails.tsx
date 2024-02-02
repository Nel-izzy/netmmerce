import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Product } from "../../app/models/Product";
import { Box, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import Loader from "../../app/layout/Loader";





const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    id && agent.Catalog.details(parseInt(id))
      .then(res => setProduct(res))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));

  }, [id]);

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
        </Grid>
      </Box>
    </Grid>

  )
}

export default ProductDetails