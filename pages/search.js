import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import useOrderProduct from "@/hooks/useOrderProduct";
import Noproduct from "@/components/layout/Noproduct";
import Product from "@/components/layout/Product";
import Loading from "@/components/ui/Spinner";

export default function Search() {
  const [result, setResult] = useState([]);
  const router = useRouter();
  const {
    query: { q },
  } = router;
  const { products, loading } = useOrderProduct("created");

  useEffect(() => {
    const search = q.toLowerCase();
    const filter = products.filter(product =>{
      return (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      )
    })
    setResult(filter);
    
  }, [q, products]);

  return (
    <>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            {loading && <Loading/>}
            <ul className="bg-white">
              {result.length === 0 && !loading ? (
                <Noproduct/>
              ) : (
                result.map((product) => (
                  <Product key={product.id} product={product} />
                ))
              )}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}
