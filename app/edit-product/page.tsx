"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { NextResponse } from "next/server";

const EditPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });

  const productId = searchParams.get("id");

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`api/products/${productId}`);
      const data = await response.json();
      setProduct({
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        image: data.image,
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const updateProduct = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`api/products/${productId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          image: product.image,
        }),
      });
      toast.success('Updated successfully');
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Edit a Product
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={updateProduct}>
            <div className="space-y-2">
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Quantity
                </label>
                <input
                  type="text"
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct({ ...product, quantity: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Quantity"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Price
                </label>
                <input
                  type="text"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Price"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Image URL
                </label>
                <input
                  type="text"
                  value={product.image}
                  onChange={(e) =>
                    setProduct({ ...product, image: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Image URL"
                />

                {product.image && (
                  <div className="w-1/2 border rounded p-2 mt-4 ">
                    <img className="w-full" src={product.image} />
                  </div>
                )}
              </div>
              <div>
                <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                  Update
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditPage;
