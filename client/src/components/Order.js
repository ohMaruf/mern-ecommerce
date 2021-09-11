import "./Order.css";
import React from "react";

export default function Order({ order }) {
  if (!order) return <section className="order-card"></section>;
  return (
    <section className="order-card">
      <div className="order-info">
        <div>ordine: {order._id}</div>
        <span>costo: €{order.orderAmount.toFixed(2)}</span>
      </div>
      <b className="order-status">
        {order.isDelivered ? "consegnato" : "in elaborazione"}
      </b>
      <table className="order-table">
        <colgroup>
          <col style={{ width: 40 + "%" }} />
          <col style={{ width: 30 + "%" }} />
          <col style={{ width: 30 + "%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>nome</th>
            <th>quantità</th>
            <th>prezzo</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems.map((it, index) => {
            return (
              <tr key={index}>
                <td>{it.name.toLowerCase()}</td>
                <td>{it.quantity}</td>
                <td>{(it.price * it.quantity).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
