import React from "react";
import { useDispatch } from "react-redux";

const ProductItem = ({
  product,
  toggleDescription,
  deleteProduct,
  handleUpdateClick,
  expandedProducts,
}) => {

  const dispatch = useDispatch()
  return (
    <div
      key={product._id}
      className="bg-slate-200 p-4 rounded-lg shadow-md flex flex-col justify-start items-start "
    >
      <div className="w-full flex justify-center items-center mb-4">
        <div className="w-50 h-40  overflow-hidden backdrop-blur-md">
          <img
            className="w-full h-full object-cover border border-black"
            src={product.image}
            alt="no internet"
          />
        </div>
      </div>

      <p className="text-xl font-semibold my-1 max-w-[200px]  break-words">
        {product.product_name}
      </p>

      <p className="text-red-500 font-semibold my-1">
        <p className="text-black">Barcode</p>
        {product.barcode ? product.barcode : "-"}
      </p>
      <p className="text-gray-500 my-1">
        <p className="text-black">Category</p>
        { product.category}
      </p>
      <p className="text-gray-500 my-1">
        <p className="text-black">Section</p>
        {product.sub_category}
      </p>

      
        {product.sub_sub_category && (
        <p className="text-gray-500 my-1">
          <p className="text-black">Sub-section</p>
          {product.sub_sub_category}
        </p>
      )}


      <div className="flex justify-start items-center gap-4 my-1">
        <p className="text-xl font-semibold text-red-500">
          {parseFloat(product.price).toFixed(2)}
        </p>
        <p className="text-xl font font-semibold">{product.quantity}</p>
      </div>
      <div className="my-1">
        {expandedProducts.includes(product._id) ? (
          <div>
            <p className="text-gray-600 max-w-xs  break-words ">
              {product.description}
            </p>
            <a
              className=" text-blue-600 cursor-pointer  px-4 py-2 mt-2 "
              onClick={() => toggleDescription(product._id)}
            >
              Hide Description
            </a>
          </div>
        ) : (
          <a
            className="text-blue-600 cursor-pointer  px-4 py-2 mt-2"
            onClick={() => toggleDescription(product._id)}
          >
            Show Description
          </a>
        )}
      </div>
      <div className="my-1">
        <button
          className="bg-red-500 text-white px-4 py-2 mt-2 mx-2 rounded"
          onClick={(e) => deleteProduct(product._id, e,dispatch)}
        >
          Delete
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
          onClick={() => handleUpdateClick(product)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
