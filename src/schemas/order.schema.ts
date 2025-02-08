import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({timestamps: true})
export class Order {
    @Prop({type: [{
        item: { type: Types.ObjectId, ref: 'Item', required: true },
        quantity: { type: Number, required: true, min: 1 },
    }], _id: false})
    items: { item: Types.ObjectId; quantity: number}[];
    
    @Prop({min: 0})
    totalPrice: number;
    
    @Prop({
        type: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
        },
        required: true,
        _id: false
    })
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
    }
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre('save', async function (next) {
    const order = this as any;
    let total = 0;

    // Populate item details to get their prices
    await order.populate('items.item');
    
    for (const orderItem of order.items) {
        total += orderItem.item.price * (orderItem.quantity ?? 1);
    }

    order.totalPrice = total;
    next();
});