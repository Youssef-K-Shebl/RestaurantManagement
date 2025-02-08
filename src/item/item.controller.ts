import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService){}

    @Post()
    async createItem(@Body(ValidationPipe) item: CreateItemDto) {
        const newItem = await this.itemService.createItem(item);
        return {
            status: 'success',
            newItem
        };        
    }
    
    @Get()
    async getAllItems() {
        const items = await this.itemService.getAllItems();
        return {
            status: 'success',
            items
        };
    }
    
    @Get(':id')
    async getItem(@Param('id') id: string) {
        const item = await this.itemService.getItem(id);
        return {
            status: 'success',
            item
        };
    }
}
