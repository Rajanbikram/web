import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/product.css';

const Product = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="product-page">
      <nav className="navbar">
        <div className="nav-container">
          <h2>RentEasy Nepal</h2>
          <div className="nav-right">
            <span className="welcome-text">Welcome, {user?.name}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="product-container">
        <div className="header">
          <h1>Products</h1>
          <button className="add-btn">+ Add Product</button>
        </div>

        <div className="products-grid">
          <div className="product-card">
            <div className="product-image">
              <img src="https://via.placeholder.com/300x200" alt="Product 1" />
            </div>
            <div className="product-info">
              <h3>Sample Product 1</h3>
              <p className="product-desc">This is a sample product description</p>
              <p className="product-price">Rs. 5000/month</p>
              <button className="view-btn">View Details</button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src="https://via.placeholder.com/300x200" alt="Product 2" />
            </div>
            <div className="product-info">
              <h3>Sample Product 2</h3>
              <p className="product-desc">This is a sample product description</p>
              <p className="product-price">Rs. 8000/month</p>
              <button className="view-btn">View Details</button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src="https://via.placeholder.com/300x200" alt="Product 3" />
            </div>
            <div className="product-info">
              <h3>Sample Product 3</h3>
              <p className="product-desc">This is a sample product description</p>
              <p className="product-price">Rs. 6500/month</p>
              <button className="view-btn">View Details</button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src="https://via.placeholder.com/300x200" alt="Product 4" />
            </div>
            <div className="product-info">
              <h3>Sample Product 4</h3>
              <p className="product-desc">This is a sample product description</p>
              <p className="product-price">Rs. 7500/month</p>
              <button className="view-btn">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;