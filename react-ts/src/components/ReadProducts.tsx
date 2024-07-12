import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from '../interface/product';
import UpdateProduct from './UpdateProduct';

type Props = {
  products: IProduct[];
  setProducts: (data: IProduct[]) => void;
};
const ReadProducts: React.FC<Props> = ({ products, setProducts }) => {
  const [flag, setFlag] = useState<number | null>(null);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:3000/products');
      setProducts(data);
    };
    fetchProducts();
  }, [setProducts]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  const handleEdit = (product: IProduct) => {
    setProductToEdit(product);
    setFlag(product.id);
  };

  return (
    <div className="container mt-4">
      <h2>Danh sách sản phẩm</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Ảnh</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td><img src={product.image} alt={product.name} style={{ width: '50px' }} /></td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => handleEdit(product)} className="btn btn-warning btn-sm mr-2">Sửa</button>
                <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {flag !== null && productToEdit && (
        <UpdateProduct
          setProducts={setProducts}
          products={products}
          product={productToEdit}
          onCancel={() => setFlag(null)}
        />
      )}
    </div>
  );
};

export default ReadProducts;
