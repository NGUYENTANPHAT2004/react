import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, { useState } from 'react'; 
import { Routes,Route, Link } from 'react-router-dom'; 
import { IProduct } from './interface/product';
import ReadProducts from './components/ReadProducts'; 
import AddProduct from './components/addProduct';

const App = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/create">Thêm mới</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
          <Route path="/create" element={<AddProduct setProducts={setProducts} products={products} />} />
          <Route path="/" element={<ReadProducts products={products} setProducts={setProducts} />} />
          {/* <Route path="/update/:id" element={<UpdateProduct setProducts={setProducts} products={products} />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
