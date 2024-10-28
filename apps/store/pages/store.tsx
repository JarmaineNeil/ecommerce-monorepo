import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import toastr from 'toastr';

import './style.css';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data } = await axios.get('/api/inventory'); // This will call the API we create
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const notification = (copied: boolean): void => {
    setCopied(copied);
    toastr.info('Product ID copied!')
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="table-container">
    <h2 className="text-center mb-4">Store Inventory</h2>
    <table className="table table-material">
      <thead>
        <tr>
          <th>NO</th>
          <th>Name</th>
          <th>Inventory_count</th>
          <th>Created_at</th>
          <th>Updated_at</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, idx) => (
          <tr key={idx} >
            <td>{idx + 1}</td>
            <CopyToClipboard text={product.id} onCopy={() => notification(true)}>
              <td style={{ cursor: "pointer", color: "blue" }}>{product.name}</td>
            </CopyToClipboard>
            <td>{product.inventory_count}</td>
            <td>{product.created_at.slice(0, 19).replace("T", " ")}</td>
            <td>{product.updated_at ? <span className="badge-active">{product.updated_at.slice(0, 19).replace("T", " ")}</span> : ''}</td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Home;
