import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from 'src/schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { Model } from 'mongoose';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Item.name) private itemModel: Model<Item>){}
    
    async createItem(createItemDto: CreateItemDto) {
        return await this.itemModel.create(createItemDto);
    }
    
    async getAllItems() {
        return await this.itemModel.find();
    }
    
    async getItem(id: string) {
        return await this.itemModel.findById(id);
    }
}
