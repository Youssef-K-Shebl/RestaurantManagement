import { Type } from "class-transformer";
import { IsArray, IsInt, IsMongoId, IsNotEmpty, ValidateNested } from "class-validator";

export class OrderItemDto {
	@IsNotEmpty()
	@IsMongoId({ message: "Invalid Id" })
	item: string;
	
	@IsNotEmpty()
	@IsInt()
	quantity: number
}

class CustomerDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	phone: string;

	@IsNotEmpty()
	address: string;
}

export class CreateOrderDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	items: OrderItemDto[]
	
	@ValidateNested()
	@Type(() => CustomerDto)
	customer: CustomerDto;
}