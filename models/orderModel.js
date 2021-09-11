import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    orderItems: [
      {
        _id: { type: String, require: true },
        name: { type: String, require: true },
        quantity: { type: Number, require: true },
        price: { type: Number, require: true },
      },
    ],
    shippingAdress: {
      address: { type: String, require: true },
      city: { type: String, require: true },
      postalCode: { type: String, require: true },
      country: { type: String, require: true },
    },
    orderAmount: {
      type: Number,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
    isDelivered: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("orders", orderSchema);
export default Order;
