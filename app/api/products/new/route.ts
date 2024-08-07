import { connectToDB } from "@utils/database"
import Product from '@models/product'
import { NextResponse } from "next/server"

interface ProductRequestBody {
    name:string,
    quantity: Number,
    price: Number,
    image?: string
  }


export const POST = async (req:Request): Promise<NextResponse> => {
    const {name, quantity, price , image}: ProductRequestBody = await req.json()

    try {
        await connectToDB()

        const newProduct = new Product({
            name,
            quantity,
            price,
            image,
        })
        await newProduct.save();

        return NextResponse.json(newProduct,{status:200})
    } catch (error) {
        return NextResponse.json({message: 'Failed to create new product'},{status:500})
    }
}
