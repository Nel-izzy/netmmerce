import agent from "../../app/api/agent";
import Loader from "../../app/layout/Loader";
import { Product } from "../../app/models/Product"
import ProductList from "./ProductList";
import { useEffect, useState } from "react";




const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    agent.Catalog.list().then(products => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader message="Loading Products..." />

  return (
    <>
      <ProductList products={products} />

    </>
  )
}

export default Catalog