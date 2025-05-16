const medicineRepository = require('../dao/medicineRepository');
const { errorResponse, successResponse } = require('../utils/responseHandler');
const orderRepository = require('../dao/orderRepository')
const orderItemRepository = require('../dao/orderItemRepository')
const sendEmail = require('../utils/mailer')

const order = async (req, res) => {
  try {
    const { keyword } = require('../utils/keyword');
    const { itemCode, qty } = req.query; // 2 fields itemCode and quntity

    if (!itemCode || !qty) {
      return errorResponse(res, keyword?.auth?.medicine, 400);
    }
    const medicineData = await medicineRepository.getItemByCode(itemCode, qty);

    if (!medicineData.medicines || medicineData.medicines.length === 0) {
      //return res.status(404).json({ message: "Medicine not found" });
      //return successResponse(res, keyword.auth.medicine, 404)
      return errorResponse(res, keyword.order.notFound, 404);
    }
    // return res.status(200).json({ message: "Order processed", data: medicineData });
    return successResponse(res, keyword.order, 201)
  } catch (error) {
    return errorResponse(res, error.message || keyword.error)
  }
}

const orderCreate = async (req, res) => {
  try {
    const order = req.body.order;

    const orderDetails = {
      //order: req.body.order,
      orderId: req.body.orderId,
      totalPrice: req.body.totalPrice,
      totalQuantity: req.body.totalQuantity,
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerNumber: req.body.customerNumber,
      status: req.body.status,
    }

    /*order(orderDetails)*/
    const orderObj = await orderRepository.orderCreate(orderDetails);
    // console.log(orderObj.dataValues)

    // console.log("id order", orderObj.orderId)
    const formattedOrderItems = order.map((item) => ({
      itemCode: item.itemCode,
      productTitle: item.productTitle,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.subtotal,
      orderId: orderObj.orderId
    }))

    // console.log(formattedOrderItems)
    const createdOrderItems = await orderItemRepository.orderItemCreate(formattedOrderItems)
    // const orderitem = await orderitemRepo.orderItemCreate(orderItems)
    // console.log("Order Items Created:", createdOrderItems);

    // console.log("createdOrderItems:", createdOrderItems)

    const emailContent = `
      <h2>Order Confirmation</h2>
      <p>Dear ${orderDetails.customerName},</p>
      <p>Your order <b>#${orderObj.orderId}</b> has been placed successfully.</p>
      <p>Total Price: ₹${orderDetails.totalPrice}</p>
      <p>Payment Method: ${orderDetails.status}</p>
      <p>Thank you for shopping with us!</p>
    `;

    await sendEmail(
      orderDetails.customerEmail,
      'Order Confirmation - YourStore',
      `Order ID: ${orderObj.orderId}`,
      emailContent
    );

    res.status(201).json({ message: "order created successfuly!", orderDetails })
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Invaild order!" })
  }

}

module.exports = { order, orderCreate }; 