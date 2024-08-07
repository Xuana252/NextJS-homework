import { connectToDB } from "@utils/database";
import Product from "@models/product";
import { NextResponse } from "next/server";
interface ProductRequestBody {
    name:string,
    quantity: Number,
    price: Number,
    image?: string
}

interface Params{
    id: string
}
export const GET = async (req:Request,{params}:{params:Params}):Promise<NextResponse> => {
    try {
        await connectToDB();

        const product = await Product.findById(params.id)
        if(!product)
            return NextResponse.json({message:'Product not found'},{status:500})
        return NextResponse.json(product,{status:200})
    } catch (error) {
        return NextResponse.json({message: `Failed to fetch product`},{status:500})
    }
}



export const PATCH = async (req:Request, {params}:{params: Params}): Promise<NextResponse> => {
    const productRequestBody:ProductRequestBody = await req.json()
    try {
        await connectToDB()
        const existingProduct = await Product.findByIdAndUpdate(params.id,productRequestBody,{new:true})
        if(!existingProduct)
            return NextResponse.json({message: 'No product found'},{status:404})
        return NextResponse.json(existingProduct,{status:200})
    } catch (error) {
        return NextResponse.json({message: 'Failed to update the product'},{status:500})
    }
    
}

export const DELETE = async (req: Request,{params}:{params: Params}): Promise<NextResponse> => {
    try {
        await connectToDB();

        const deletedProduct = await Product.findByIdAndDelete(params.id)
        
        return NextResponse.json({message: 'product deleted successfully'},{status:200})
    } catch (error) {
        return NextResponse.json({message: 'Failed to delete product'},{status:500})
    }
}
