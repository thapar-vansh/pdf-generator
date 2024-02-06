import PDFDocument from "pdfkit";
import * as fs from "fs";
import { toWords } from "number-to-words";

export async function createTradeInvoice(tradeDetails: any): Promise<void> {
  const doc = new PDFDocument({ margin: 10, size: "A4" });
  const outputStream = fs.createWriteStream("invoice.pdf");
  doc.registerFont("Helvetica");

  doc.pipe(outputStream);

  // Add logo
  doc.image("sixergame_logo.jpg", 465, 30, { width: 50, align: "right" });

  // Header
  doc.font("Helvetica");
  doc.font("Helvetica-Bold").fontSize(15).text("Trade Invoice", 75, 45);
  doc.font("Helvetica-Bold").fontSize(12).text(`John Doe`, 75, 70);

  doc.moveTo(75, 85).lineTo(520, 85).stroke();

  // Trade Details
  const startY = 100;
  const lineSpacing = 20;
  let currentY = startY;
  doc
    .font("Helvetica-Bold")
    .text(`Sporta Technologies Private Limited`, 75, currentY);
  currentY += lineSpacing;
  doc.fontSize(12);
  doc
    .font("Helvetica")
    .text(
      `Unit No.1201-1202, 12th floor, Wing A, One BKC,\nG Block, Plot No.66,BKC, Bandra East,\nMumbai, Maharashtra 400051`,
      75,
      currentY,
      {
        align: "justify",
      }
    );
  currentY += 3 * lineSpacing;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 75, currentY);
  currentY += lineSpacing;
  doc.text(`Invoice No: ${tradeDetails.id}`, 75, currentY);
  currentY += lineSpacing;
  doc.text(`GSTIN: 27AAGCA4754K1ZD`, 75, currentY);
  currentY += lineSpacing;
  doc.text(`Place of Supply: Delhi(7)`, 75, currentY);
  currentY += lineSpacing;
  doc.text(`HSN Code : 9757600`, 75, currentY);
  currentY += lineSpacing;
  doc.moveTo(75, currentY).lineTo(520, currentY).stroke();
  currentY += lineSpacing;
  doc.font("Helvetica-Bold").text(`Description`, 75, currentY);
  doc.text(`Amount(INR)`, 445, currentY);
  currentY += lineSpacing;
  doc.moveTo(75, currentY).lineTo(520, currentY).stroke();
  currentY += lineSpacing;

  doc
    .font("Helvetica")
    .text(
      `Deposit for online gaming(incl. actionable claims involved in online money gaming)\nTransaction ID: DD20231030103758135222511`,
      75,
      currentY,
      {
        align: "justify",
      }
    );
  currentY += 2 * lineSpacing;
  doc.moveTo(75, currentY).lineTo(520, currentY).stroke();
  currentY += lineSpacing;
  doc.font("Helvetica-Bold");
  doc.text(`Amount paid/deposited`, 75, currentY);
  doc.text(`₹${tradeDetails.price}`, 475, currentY);
  currentY += lineSpacing;
  doc.moveTo(75, currentY).lineTo(520, currentY).stroke();
  currentY += lineSpacing;
  doc.text(`Trading fee:`, 75, currentY);
  doc.text(`\u20B9${tradeDetails.trading_fee}`, 475, currentY);
  currentY += lineSpacing;
  doc.text(`Trading fee(GST):`, 75, currentY);
  doc.text(`\₹3.2`, 475, currentY);
  currentY += lineSpacing;
  doc.text(`TDS Charge:`, 75, currentY);
  doc.text(`\u20B9${tradeDetails.tds_charge}`, 475, currentY);
  currentY += lineSpacing;
  doc.moveTo(75, currentY).lineTo(520, currentY).stroke();
  currentY += lineSpacing;
  doc.text(`Total:`, 75, currentY);
  doc.text(`\u20B9${tradeDetails.total_coins}`, 475, currentY);
  currentY += lineSpacing;
  doc.strokeColor("gray").moveTo(75, currentY).lineTo(520, currentY).stroke();
  doc.text(
    `Amount In Words:\u20B9 ${toWords(tradeDetails.total_coins)} only.`,
    75,
    currentY + 20
  );
  doc.font("Helvetica");
  currentY += 1.5 * lineSpacing;
  doc.lineWidth(3.5);
  doc
    .strokeOpacity(0.5)
    .moveTo(75, currentY + 10)
    .lineTo(520, currentY + 10)
    .stroke();
  currentY += lineSpacing;
  doc.text(`Terms and conditions:`, 75, currentY);
  currentY += lineSpacing;
  doc.text(`Refer to:`, 75, currentY);
  doc
    .fontSize(12)
    .fillColor("blue")
    .text(
      "https://www.dream11.com/games/fantasy-cricket/termsandconditions",
      125,
      currentY,
      {
        link: "https://www.dream11.com/games/fantasy-cricket/termsandconditions",
        underline: false,
      }
    );
  currentY += lineSpacing;
  doc.lineWidth(1);

  doc
    .strokeColor("gray")
    .dash(3, { space: 3 })
    .moveTo(75, currentY)
    .lineTo(520, currentY)
    .stroke();
  currentY += lineSpacing;
  doc.font("Helvetica-Oblique");
  doc
    .fillColor("black")
    .text(`Tax payable under Reverse Charge : No`, 75, currentY);
  currentY += lineSpacing;

  doc.text(
    `* Incase of Inter-state supply IGST will be applicable. Within State supplies are\nliable for CGST & SGST.`,
    75,
    currentY
  );
  currentY += 2 * lineSpacing;

  doc.text(
    `* This is an electronically generated invoice and does not require a digital signature.`,
    75,
    currentY
  );
  currentY += lineSpacing;

  doc.end();
}
