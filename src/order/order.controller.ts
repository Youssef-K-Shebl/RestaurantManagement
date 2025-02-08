import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    const orders = await this.orderService.getAllOrders();
    return {
      status: 'success',
      orders,
    };
  }

  @Get('daily-report')
  async getDailySalesReport() {
    const report = await this.orderService.generateDailySalesReport();
    return {
      status: 'success',
      data: report,
    };
  }

  @Post()
  async createOrder(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
    const order = await this.orderService.createOrder(createOrderDto);
    return {
      status: 'success',
      order,
    };
  }
  @Get(':id')
  async getOrder(@Param('id') id: string) {
    const order = await this.orderService.getOrder(id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return {
      status: 'success',
      order,
    };
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body(ValidationPipe) updateOrderDto: UpdateOrderDto,
  ) {
    const order = await this.orderService.updateOrder(updateOrderDto, id);
    return {
      status: 'success',
      order,
    };
  }
}
