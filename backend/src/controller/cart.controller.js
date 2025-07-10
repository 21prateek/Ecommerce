import { db } from "../db/db.js";
import { sendError, sendSuccess } from "../utils/response.js";

//add to cart
export const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const id = req.user.id;

  try {
    //
    const existingProduct = await db.cartItem.findFirst({
      where: {
        userId,
        productId,
      },
    });

    //if the product exist than update the quantity
    if (existingProduct) {
      // So we want to update that cart quantity using the id of that cart
      const updateCartItem = await db.cartItem.update({
        where: {
          id: existingProduct.id,
        },
        data: {
          //exisitng quantity plus current quantity
          quantity: existingProduct.quantity + quantity,
        },
      });

      return sendSuccess(res, 200, "Cart updated", {
        cartItem: updateCartItem,
      });
    }

    //if product does not exist in the cart
    const newItem = await db.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });

    return sendSuccess(res, 201, "Item added to cart", { cartItem: newItem });
  } catch (error) {
    console.log("Add to cart error:", error);
    return sendError(res, 500, "Error while adding to cart", error.message);
  }
};

//Get user cart, it will show all items
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItem = await db.cartItem.findMany({
      where: {
        userId,
      },
      include: {
        product: true, //it will include the product details too
      },
    });

    return sendSuccess(res, 200, "Cart fetched", { cartItem });
  } catch (error) {
    console.error("Get cart error:", error);
    return sendError(res, 500, "Error fetching cart", error.message);
  }
};

//update quantity
export const updateQuantity = async (req, res) => {
  const { cartId } = req.params;
  const { quantity } = req.body;

  try {
    const updated = await db.cartItem.update({
      where: {
        id: cartId,
      },
      data: {
        quantity,
      },
    });

    return sendSuccess(res, 200, "Cart quantity updated", {
      cartItem: updated,
    });
  } catch (error) {
    console.error("Update cart error:", error);
    return sendError(res, 500, "Error updating cart", error.message);
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    await db.cartItem.delete({ where: { id: cartItemId } });

    return sendSuccess(res, 200, "Item removed from cart");
  } catch (error) {
    console.error("Remove cart item error:", error);
    return sendError(res, 500, "Error removing item from cart", error.message);
  }
};
