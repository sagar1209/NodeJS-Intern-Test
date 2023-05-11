import pool from '../conn.js';

const getdata = async (req, res) => {
  const currency = req.params.unit;
  const base = currency.toLowerCase();
  try {
    const client = await pool.connect();
    await client.query('BEGIN');
    const query = 'SELECT * FROM wazirx WHERE base_unit = $1';
    const result = await client.query(query, [base]);
    await client.query('COMMIT');
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('An error occurred while retrieving the data.');
  }
};

export default getdata;
