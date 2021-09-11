import React, { useState } from "react";
import "./BannerPremium.css";

export default function BannerPremium({ isPremium }) {
  const [active, setActive] = useState(!isPremium);

  if (active) {
    return (
      <section className="banner-premium">
        <span>
          entra in <b>obaPremium</b>: ti aspettano un prisma di vantaggi
        </span>
        <button onClick={() => setActive(false)}>abbonati</button>
      </section>
    );
  } else return <section></section>;
}
