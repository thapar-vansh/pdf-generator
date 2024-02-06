import { fetchTradeDetails } from "./db";
import { createTradeInvoice } from "./pdfService";

async function generateInvoice() {
  try {
    // Assuming fetchTradeDetails returns a promise
    const tradeDetails = await fetchTradeDetails(
      "550e8400-e29b-41d4-a716-446655440000"
    );

    console.log("Trade details:", tradeDetails);

    // Assuming createTradeInvoice returns a promise
    await createTradeInvoice(tradeDetails);

    console.log("Invoice created successfully.");
  } catch (err) {
    console.error("Error generating invoice:", err);
  }
}

// Call the function to start the process
generateInvoice();
