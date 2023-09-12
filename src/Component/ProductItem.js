import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ProductItem = ({
  product,
  toggleDescription,
  deleteProduct,
  handleUpdateClick,
  expandedProducts,
}) => {
  const dispatch = useDispatch();

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div
      key={product._id}
      className="bg-blue-200 p-4 rounded-lg shadow-md flex flex-col justify-start items-start "
    >
      <div className="w-full flex justify-center items-center mb-4">
        <div className="w-64 h-52 overflow-hidden backdrop-blur-md">
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

      <p className=" font-semibold text-red-500">
        {parseFloat(product.price).toFixed(2)}
      </p>
      {showMore ? (
        <>
          <p className=" font-semibold text-gray-500">
            {" "}
            <span className="text-black">Unit :</span>
            {product.unit}
          </p>

          <p className="text-red-500 font-semibold my-1">
            <span className="text-black mr-2">Barcode :</span>
            {product.barcode ? product.barcode : "-"}
          </p>
          <p className="text-gray-500 my-1 max-w-[200px]  break-words">
            <span className="text-black mr-2">Category : </span>
            {product.category}
          </p>
          <p className="text-gray-500 my-1 max-w-[200px]  break-words">
            <span className="text-black mr-2">Section : </span>
            {product.sections}
          </p>

          {product.sections && (
            <p className="text-gray-500 my-1 max-w-[200px]  break-words">
              <span className="text-black mr-2">Sub-section : </span>
              {product.subsections}
            </p>
          )}

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
                className="text-blue-600  cursor-pointer  px-4 py-2 mt-2"
                onClick={() => toggleDescription(product._id)}
              >
                Show Description
              </a>
            )}
          </div>
          <div className="my-1">
            <button
              className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-2 py-1 mt-2 mx-2 rounded"
              onClick={(e) => deleteProduct(product._id, e, dispatch)}
            >
              Delete
            </button>
            <button
              className="bg-gradient-to-r from-indigo-600 to-purple-600  text-white px-3 py-1 mt-2 rounded-md"
              onClick={() => handleUpdateClick(product)}
            >
              Edit
            </button>
          </div>
          <button onClick={toggleShowMore}>Show Less</button>
        </>
      ) : (
        <button onClick={toggleShowMore}>Show More</button>
      )}
    </div>
  );
};

export default ProductItem;
