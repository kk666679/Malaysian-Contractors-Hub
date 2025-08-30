import React, { useEffect, useState } from 'react';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.REACT_APP_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function getData() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM posts');
    return rows;
  } finally {
    client.release();
  }
}

export default function DatabaseTestPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
      .then((rows) => setData(rows))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  return (
    <div>
      {data.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        data.map((post, index) => (
          <div key={index}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
