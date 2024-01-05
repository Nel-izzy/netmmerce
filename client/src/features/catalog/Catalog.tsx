import { Product } from "../../app/models/Product"
import ProductList from "./ProductList";
import { useEffect, useState } from "react";



// function addProduct(){
//   setProducts(prevState => [
//     ...prevState,
//     {
//       id: prevState.length + 101,
//       name: 'product' + (prevState.length + 1),
//       price: (prevState.length * 100) + 100,
//       brand: "Some brand",
//       description: "some desc",
//       pictureUrl: "http://picsum/photo/200"
//     }
//   ])
// }

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  

useEffect(()=>{
  fetch('http://localhost:5000/api/products')
  .then(res=>res.json())
  .then(data=> setProducts(data))
}, [])

  return (
    <>
       <ProductList products={products}/>
      
    </>
  )
}

export default Catalog