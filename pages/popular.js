import React from "react";
import Layout from "@/components/layout/Layout";
import Product from "@/components/layout/product";
import Noproduct from "@/components/layout/Noproduct";
import Loading from "@/components/ui/Spinner";
import useOrderProduct from "@/hooks/useOrderProduct";

export default function Popular() {
  
  const {products, loading} = useOrderProduct("votes");

  return (
    <>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            {loading && <Loading/>}
            <ul className="bg-white">
              {products.length === 0 && !loading ? (
                <Noproduct/>
              ) : (
                products.map((product) => (
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
