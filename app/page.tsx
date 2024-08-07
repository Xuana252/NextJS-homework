'use client'
import Product from "@components/Product";
import TableProduct from "@components/TableProduct";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/products");
      const data= await response.json();
      console.log(data)
      setProducts(data);
      setIsLoading(false);
    } catch (error:any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  const deleteProduct = async (id:string) => {
    const result = await Swal.fire({
      title: "Do you want to delete the product?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`/api/products/${id}`,{
          method: 'DELETE',
        });
        toast.success("Delete a Product Successfully");
        getProducts();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div>
        <Link
          href={"/create-product"}
          className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"
        >
          Create a Product
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {isLoading ? (
          "Loading"
        ) : (
          <>
            {products.length > 0 ? (
              <>
                {products.map((product, index) => {
                  return (
                    <Product
                      key={index}
                      product={product}
                      getProducts={getProducts}
                      handleDelete={deleteProduct}
                    />
                  );
                })}
              </>
            ) : (
              <div className="mt-4 bg-gray-800 text-white font-serif p-4">
                There is no product
              </div>
            )}
          </>
        )}
      </div>

      <TableProduct products={products} handleDelete={deleteProduct} />
    </div>
  );
};

export default HomePage;
