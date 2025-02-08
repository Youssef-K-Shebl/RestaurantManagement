import { Type } from "class-transformer";
import { IsArray, IsEmail, IsInt, IsMongoId, IsOptional, ValidateNested } from "class-validator";
import { Types } from "mongoose";

export class OrderItemUpdateDto {
	@IsOptional()
	@IsMongoId({ message: "Invalid Id" })
	item?: Types.ObjectId;
	
	@IsOptional()
	@IsInt()
	quantity?: number;
}

class CustomerUpdateDto {
	@IsOptional()
	name?: string;
	
	@IsEmail()
	@IsOptional()
	email?: string;

	@IsOptional()
	phone?: string;

	@IsOptional()
	address?: string;
}

export class UpdateOrderDto {
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => OrderItemUpdateDto)
	items?: OrderItemUpdateDto[];
	
	@IsOptional()
	@ValidateNested()
	@Type(() => CustomerUpdateDto)
	customer?: CustomerUpdateDto;
}
