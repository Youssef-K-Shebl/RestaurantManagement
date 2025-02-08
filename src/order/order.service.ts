import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  getAllOrders() {
    return this.orderModel.find().populate('items.item');
  }

  createOrder(createOrderDto: CreateOrderDto) {
    const newOrder = new this.orderModel(createOrderDto);
    return newOrder.save();
  }

  async updateOrder(updateOrderDto: UpdateOrderDto, id) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    if (updateOrderDto.customer) {
      order.customer = Object.assign(order.customer, updateOrderDto.customer);
    }

    if (updateOrderDto.items) {
      updateOrderDto.items.forEach((newItem) => {
        const existingItem = order.items.find(
          (item) => item.item.toString() === newItem.item?.toString(),
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity ?? 1;
        } else {
          order.items.push({
            item: new Types.ObjectId(newItem.item),
            quantity: newItem.quantity ?? 1,
          });
        }
      });
    }

    return order.save();
  }

  getOrder(id: string) {
    return this.orderModel.findById(id).populate('items.item');
  }

  async generateDailySalesReport() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    console.log(startOfDay, endOfDay);

    const orders = await this.orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: {
            $sum: 1,
          },
          // ✅ Count total orders correctly
          allOrders: {
            $push: '$$ROOT',
          }, // Keep all order data for further processing
        },
      },
      // 3️⃣ Unwind orders to access `items` array
      {
        $unwind: '$allOrders',
      },
      {
        $unwind: '$allOrders.items',
      },
      // 4️⃣ Convert `items.item` to ObjectId for lookup
      {
        $addFields: {
          'allOrders.items.item': {
            $toObjectId: '$allOrders.items.item',
          },
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: 'allOrders.items.item',
          foreignField: '_id',
          as: 'itemDetails',
        },
      },
      {
        $unwind: '$itemDetails',
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $multiply: ['$allOrders.items.quantity', '$itemDetails.price'],
            },
          },
          totalOrders: {
            $first: '$totalOrders',
          },
          itemSales: {
            $push: {
              item: '$itemDetails.name',
              totalSold: '$allOrders.items.quantity',
            },
          },
        },
      },
      {
        $unwind: '$itemSales',
      },
      {
        $group: {
          _id: '$itemSales.item',
          totalSold: {
            $sum: '$itemSales.totalSold',
          },
          totalRevenue: {
            $first: '$totalRevenue',
          },
          totalOrders: {
            $first: '$totalOrders',
          },
        },
      },
      {
        $sort: {
          totalSold: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $first: '$totalRevenue',
          },
          totalOrders: {
            $first: '$totalOrders',
          },
          topSellingItems: {
            $push: {
              item: '$_id',
              totalSold: '$totalSold',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalOrders: 1,
          topSellingItems: 1,
        },
      },
    ]);

    if (orders.length === 0) {
      return {
        totalRevenue: 0,
        totalOrders: 0,
        topSellingItems: [],
      };
    }

    return orders;
  }
}
