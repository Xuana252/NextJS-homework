import { connectToDB } from "@utils/database";
import Product from "@models/product";
import { NextResponse } from "next/server"

export const GET = async ({params}:any):Promise<NextResponse> => {
    try {
        await connectToDB();

        const products = await Product.find({})
        return NextResponse.json(products,{status:200})
    } catch (error) {
        return NextResponse.json({message:'Failed to fetch products'},{status:500})
    }
}