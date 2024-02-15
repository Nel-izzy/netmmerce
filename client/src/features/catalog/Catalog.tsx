import Loader from "../../app/layout/Loader";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";




const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll)
  const { productsLoaded, status } = useAppSelector(state => state.catalog)
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync())
  }, [productsLoaded, dispatch])

  if (status.includes('pending')) return <Loader message="Loading Products..." />

  return (
    <>
      <ProductList products={products} />

    </>
  )
}

export default Catalog