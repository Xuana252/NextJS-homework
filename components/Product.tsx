/* eslint-disable react/prop-types */
import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";


interface Product {
  _id:string,
  name: string,
  quantity: number,
  price: number,
  image:string,
}
interface ProductProps {
  product: Product,
  getProducts: () => void,
  handleDelete: (id: string) => void,

}
const Product: React.FC<ProductProps> = ({ product, getProducts,handleDelete }) => {


  return (
    <div className="bg-white rounded shadow-lg overflow-hidden">
      <img src={product.image} className="w-full h-28 object-cover" />
      <div className="px-4 pt-2 pb-4">
        <h2 className="text font-semibold">{product.name}</h2>
        <div className="text-sm">Quantiy: {product.quantity}</div>
        <div className="text-sm">Price: ${product.price}</div>

        <div className="mt-2 flex gap-4">
          <Link
            href={`/edit-product?id=${product._id}`}
            className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(product._id)}
            className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
