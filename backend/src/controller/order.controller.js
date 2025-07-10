import { sendSuccess, sendError } from "../utils/response.js";
import { db } from "../db/db.js";

//Place order based on cart
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    //take the all the item that this user have from the cart
    const allItems = await db.cartItem.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    if (!allItems.length) {
      return sendError(res, 400, "Cart is empty");
    }

    const orderItems = allItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      totalPrice: item.quantity * item.product.price, //as we have set product to true so it will also give info about that product
    }));

    //now to get whole cart
    const totalOrderPrice = orderItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    const order = await db.orders.create({
      data: {
        userId,
        orderItems: {
          create: orderItems, // Creates data in OrderItem table
        },
      },
      include: {
        orderItems: true, // Returns the created OrderItems along with the Order
      },
    });

    //also delete the cart, for that user after placing the order
    await db.cartItem.deleteMany({ where: { userId } });

    return res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order,
      totalOrderPrice, // 👈 Send this as part of the response
    });
  } catch (error) {
    console.log("Error while placing order:", error);
    return sendError(res, 500, "Error placing order", error.message);
  }
};

//Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await db.orders.findMany({
      where: { userId },
      include: {
        //so it will include the orderItems table
        orderItems: {
          //from that orderItems table it will include product info
          include: { product: true },
        },
      },
    });

    return sendSuccess(res, 200, "Orders fetched", { orders });
  } catch (error) {
    console.error("Get user orders error:", error);
    return sendError(res, 500, "Error fetching orders", error.message);
  }
};

//Admin: get all orders
export const getAllOrders = async (req, res) => {
  try {
    //so here we want all the order that are in database
    const orders = await db.order.findMany({
      include: {
        user: true, //so it will include user detail and all its order items with the product info
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
    return sendSuccess(res, 200, "All orders fetched", { orders });
  } catch (error) {
    console.error("Get all orders error:", error);
    return sendError(res, 500, "Error fetching all orders", error.message);
  }
};

//Admin: update order status
export const updateOrder = async (req, res) => {
  const { status } = req.body;
  const { orderId } = req.params;

  try {
    const updated = await db.orders.update({
      where: { id: orderId },
      data: { status },
    });

    return sendSuccess(res, 200, "Order status updated", { order: updated });
  } catch (error) {
    console.error("Update order status error:", error);
    return sendError(res, 500, "Error updating order status", error.message);
  }
};
