// AddProduct.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { IProduct } from '../interface/product';

type Props = {
  setProducts: (products: IProduct[]) => void;
  products: IProduct[];
};

type FormType = Pick<IProduct, 'name' | 'price' | 'image' | 'category'>;

const AddProduct: React.FC<Props> = ({ setProducts, products }) => {
  const { register, handleSubmit, reset } = useForm<FormType>();

  const onSubmit = async (formData: FormType) => {
    try {
      const { data } = await axios.post("http://localhost:3000/products", formData);
      setProducts([...products, data]);
      reset();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Thêm sản phẩm mới</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Tên sản phẩm</label>
          <input type="text" className="form-control" id="name" {...register("name")} placeholder="Tên sản phẩm" required />
        </div>
        <div className="form-group">
          <label htmlFor="image">Ảnh sản phẩm</label>
          <input type="text" className="form-control" id="image" {...register("image")} placeholder="Ảnh sản phẩm" required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Giá sản phẩm</label>
          <input type="number" className="form-control" id="price" {...register("price")} placeholder="Giá sản phẩm" required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Danh mục</label>
          <input type="text" className="form-control" id="category" {...register("category")} placeholder="Danh mục" required />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Thêm mới</button>
      </form>
    </div>
  );
};

export default AddProduct;
