import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.POOL_USER,
  password: process.env.POOL_PASSWORD,
  host: process.env.POOL_HOST,
  port: Number(process.env.POOL_PORT),
  database: process.env.POOL_DATABASE,
  max: 100,
});

export const fetchTradeDetails = async (tradeId: string) => {
  try {
    const query = `
    SELECT id, customer_id, quantity, price, total_coins, transaction_time, tds_charge, status, trading_fee, trading_fee_gst
    FROM sixergame.real_wallet_transactions
    WHERE id = $1
  `;
    const { rows } = await pool.query(query, [tradeId]);
    return rows[0]; // Assuming tradeId is unique and returns a single row}
  } catch (err) {
    console.log(err);
  } finally {
    pool.end();
  }
};
