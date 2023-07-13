import React, { useEffect, useState } from "react";
import {
  getFirestore,
  getDocs,
  collection,
  orderBy,
  query,
} from "firebase/firestore";

const useOrderProduct = (order) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const q = query(
          collection(getFirestore(), "productos"),
          orderBy(order, "desc")
        );
        const querySnapshot = await getDocs(q);
        const product = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          product.push({ id: doc.id, ...doc.data() });
        });
        setProducts(product);
        setLoading(false);
      } catch (error) {
        console.error("hubo un error", error);
      }
    };
    getProducts();
  }, []);

  return {
    products,
    loading,
  };
};

export default useOrderProduct;
