import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumber, IsString, MaxLength } from "class-validator";

@Schema()
export class Item {
    @IsString()
    @Prop({required: [true, "Name is required"], unique: true})
    name: string;
    
    @IsNumber()
    @Prop({required: true, max: 1000})
    price: number;
    
    @IsString()
    @MaxLength(255)
    @Prop({required: true})
    description: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);