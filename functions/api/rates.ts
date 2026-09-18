export async function onRequestGet() {
  const metalRates = {
    updatedAt: new Date().toISOString(),
    source: "KRX 금시장 & LME",
    rates: {
      gold: { symbol: "Au", name: "순금 99.9%", pricePerGram: 195310, change: "+1.7%" },
      silver: { symbol: "Ag", name: "순은 99.9%", pricePerGram: 2945, change: "+1.8%" },
      palladium: { symbol: "Pd", name: "팔라듐", pricePerGram: 58050, change: "-0.8%" },
      copper: { symbol: "Cu", name: "동(구리)", pricePerKg: 14055, change: "+2.0%" }
    }
  };

  return new Response(JSON.stringify(metalRates), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60"
    }
  });
}
