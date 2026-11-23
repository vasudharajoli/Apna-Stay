"use client";

import { useState } from "react";

export function DemoReservation() {
  const [simulated, setSimulated] = useState(false);
  return (
    <div className="simulation">
      <button
        className="button"
        type="button"
        onClick={() => setSimulated(true)}
        disabled={simulated}
      >
        {simulated ? "Simulation complete" : "Simulate reservation"}
      </button>
      <p role="status">
        {simulated
          ? "Demo reservation confirmed. No inventory was held and no payment was taken."
          : "The demo uses fictional inventory and collects no payment."}
      </p>
    </div>
  );
}
