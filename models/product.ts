import {Schema , model,models, Document} from "mongoose";

interface IProduct extends Document {
    name: string,
    quantity: number,
    price: number,
    image?: string,
}

const productSchema = new Schema<IProduct>({
        name: {
            type:String,
            required: [true,'name is required']
        },
        quantity: {
            type:Number,
            required: [true,'quantity is required'],
            default: 0
        },
        price: {
            type: Number,
            required: [true,'price is required'],
            default:0
        },
        image: {
            type: String,
            required:false
        }
    },
    {
        timestamps:true,
    }
)
const Product = models.Product||model<IProduct>('Product',productSchema);

export default Product