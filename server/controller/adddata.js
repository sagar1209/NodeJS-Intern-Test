import pool from '../conn.js';
import fetch from 'node-fetch';

const adddata = async () => {
  try {
    const response = await fetch('https://api.wazirx.com/api/v2/tickers');
    const data = await response.json();

    //create object 
    const sortedData = Object.values(data);

    // Select the top 10 entries
    const top10Data = sortedData.slice(0, 10);

    // Insert the top 10 data into the database
    const client = await pool.connect();
    await client.query('BEGIN');

    try {
      for (const entry of top10Data) {
        const { name, last, buy, sell, volume, base_unit } = entry;
        const query = 'INSERT INTO wazirx (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)';
        await client.query(query, [name, last, buy, sell, volume, base_unit]);
      }

      await client.query('COMMIT');
      console.log('Top 10 results stored in the database successfully.');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    console.log('An error occurred while fetching and storing the data.');
  }
};

export default adddata;
