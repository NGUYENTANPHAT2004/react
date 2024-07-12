import React from 'react';
import { IProduct } from '../interface/product';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type FormType = Pick<IProduct, 'name' | 'price' | 'image' | 'category'>;

type Props = {
  setProducts: (products: IProduct[]) => void;
  products: IProduct[];
  product: IProduct;
  onCancel: () => void;
};

const UpdateProduct: React.FC<Props> = ({ setProducts, products, product, onCancel }) => {
  const { register, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category
    }
  });

  const onSubmit = async (formData: FormType) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/products/${product.id}`, formData);
      setProducts(products.map(p => (p.id === data.id ? data : p)));
      reset();
      onCancel();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cập nhật sản phẩm</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Tên sản phẩm</label>
          <input type='text' className="form-control" id="name" {...register("name")} placeholder='Tên sản phẩm' required />
        </div>
        <div className="form-group">
          <label htmlFor="image">Ảnh sản phẩm</label>
          <input type='text' className="form-control" id="image" {...register("image")} placeholder='Ảnh sản phẩm' required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Giá sản phẩm</label>
          <input type='number' className="form-control" id="price" {...register("price")} placeholder='Giá sản phẩm' required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Danh mục</label>
          <input type='text' className="form-control" id="category" {...register("category")} placeholder='Danh mục' required />
        </div>
        <button type='submit' className="btn btn-primary mt-3">Cập nhật</button>
        <button type='button' className="btn btn-secondary mt-3" onClick={onCancel}>Hủy</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
