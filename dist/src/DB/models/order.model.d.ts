import { ICreateOrderItems, OrderStatus, PaymentMethod } from "lib/order/create-order.interface";
import { IOrder } from "lib/order/order-interface";
import mongoose, { HydratedDocument, Types } from "mongoose";
export declare class Order implements IOrder {
    user: Types.ObjectId;
    items: ICreateOrderItems[];
    cart: Types.ObjectId;
    coupon?: Types.ObjectId;
    orderStatus: OrderStatus;
    address: string;
    phone: string;
    paymentMethod: PaymentMethod;
    subTotal: number;
    discount: number;
    totalPrice: number;
    intentId: string;
    refundId: string;
    refundAt: Date;
}
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, (mongoose.Document<unknown, any, Order, any, mongoose.DefaultSchemaOptions> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, Order, any, mongoose.DefaultSchemaOptions> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Order>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, mongoose.Document<unknown, {}, Order, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    user?: mongoose.SchemaDefinitionProperty<Types.ObjectId, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    items?: mongoose.SchemaDefinitionProperty<ICreateOrderItems[], Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    cart?: mongoose.SchemaDefinitionProperty<Types.ObjectId, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    coupon?: mongoose.SchemaDefinitionProperty<Types.ObjectId | undefined, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    orderStatus?: mongoose.SchemaDefinitionProperty<OrderStatus, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    address?: mongoose.SchemaDefinitionProperty<string, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phone?: mongoose.SchemaDefinitionProperty<string, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paymentMethod?: mongoose.SchemaDefinitionProperty<PaymentMethod, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    subTotal?: mongoose.SchemaDefinitionProperty<number, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    discount?: mongoose.SchemaDefinitionProperty<number, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalPrice?: mongoose.SchemaDefinitionProperty<number, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    intentId?: mongoose.SchemaDefinitionProperty<string, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    refundId?: mongoose.SchemaDefinitionProperty<string, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    refundAt?: mongoose.SchemaDefinitionProperty<Date, Order, mongoose.Document<unknown, {}, Order, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Order>;
export type HOrderDocument = HydratedDocument<Order>;
export declare const OrderModel: import("@nestjs/common").DynamicModule;
