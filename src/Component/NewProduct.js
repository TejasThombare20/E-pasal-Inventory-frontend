import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {} from "tslib";
import { useSelector, useDispatch } from "react-redux";
import { FaUpload } from "react-icons/fa";
import { imageToBase64 } from "../Utility/ImageToBase64";
import { toast } from "react-hot-toast";
import Modal from "../Component/Modal";
import { useNavigate, NavLink } from "react-router-dom";
import {
  fetchCategories,
  setCategory,
  setsubsectionsReducer,
} from "../Redux/categorySlice";
import UpdateCategory from "./UpdateCategory";
import Category from "./Category";
import UpdateSection from "./UpdateSection";
import UpdateSubsection from "./UpdateSubsection";
import ProductItem from "./ProductItem";
import Select from "react-select";
import {
  addProduct,
  fetchUnits,
  deleteProduct,
  deleteCategory,
  deleteSection,
  deleteSubsection,
  handleDeleteUnitClick,
  fetchProducts,
} from "../FrontendAPI/frontendAPI";
import UpdateUnit from "./UpdateUnit";
import { addProductReducer, setProductReducer } from "../Redux/productSlice";
import NewSection from "./NewSection";
import NewSubsection from "./NewSubsection";
import NewUnit from "./NewUnit";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { setUnits } from "../Redux/unitSlice";
import { setSectionsReducer } from "../Redux/categorySlice";
import '../custom.css'


const NewProduct = ({ accessToken }) => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);
  console.log("productData", productData);

  const CategoryData = useSelector((state) => state.category.categories);
  console.log("CategoryData", CategoryData);

  const SectionData = useSelector((state) => state.category.sections);
  console.log("SectionData", SectionData);

  const subsectionData = useSelector((state) => state.category.subsections);
  console.log("SubsectionData", subsectionData);

  const SearchData = useSelector((state) => state.search.productList);
  console.log("SearchData", SearchData);

 

  const [selectedCategory, setSelectedCategory] = useState(""); // Add this line

  const [sectionsForSelectedCategory, setSectionsForSelectedCategory] =
    useState([]);
  const [subsectionsForSelectedSection, setSubsectionsForSelectedSection] =
    useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSubsection, setSelectedSubsection] = useState("");
  const [data, setdata] = useState({
    product_name: "",
    category: "",
    sub_category: "",
    sub_sub_category: "",
    image: "",
    barcode: "",
    price: "",
    quantity: "",
    description: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleUpdateClick = (product) => {
    // console.log("product ", product);
    setSelectedProductId(product); // Step 2
    setIsModalOpen(true);
  };

  const [expandedProducts, setExpandedProducts] = useState([]);

  const toggleDescription = (productId) => {
    if (expandedProducts.includes(productId)) {
      setExpandedProducts(expandedProducts.filter((id) => id !== productId));
    } else {
      setExpandedProducts([...expandedProducts, productId]);
    }
  };

  // function convertDriveLinkToDirectLink(driveLink) {
  //   const fileIdMatch = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)\//);
  //   if (fileIdMatch && fileIdMatch[1]) {
  //     const fileId = fileIdMatch[1];
  //     return `https://drive.google.com/uc?export=view&id=${fileId}`;
  //   } else {
  //     return driveLink;
  //   }
  // }
  const [file, setFile] = useState(null);
  const onChange = (name, selectedValue) => {
    console.log("Selected value:", selectedValue);
    if (name === "category") {
      const selectedCategoryData = CategoryData.find(
        (category) => category._id === selectedValue
      );
      console.log("selectedCategoryData", selectedCategoryData);
      setSelectedCategory(selectedValue);

      setdata((prevData) => ({
        ...prevData,
        category: selectedCategoryData?.name || "",
        sub_category: "", // Reset sub-category when category changes
        sub_sub_category: "", // Reset sub-sub-category when category changes
      }));
      const sectionsForSelectedCategory = selectedCategoryData?.sections || [];
      dispatch(setSectionsReducer(sectionsForSelectedCategory));
      setSectionsForSelectedCategory(sectionsForSelectedCategory);
      setSelectedSubcategory("");
      setSelectedSubsection("");
    } else if (name === "sub_category") {
      // const selectedSectionData = sectionsForSelectedCategory.find(
      //   (section) => section._id === selectedValue
      // );
      console.log("SectionData", SectionData);
      const selectedSectionData = SectionData.find(
        (section) => section._id === selectedValue
      );

      console.log("selectedSectionDataName: ", selectedSectionData.name);
      setSelectedSubcategory(selectedValue);
      // setdata((prevData) => ({
      //   ...prevData,
      //   sub_category : selectedSectionData.name,
      //   // sub_category: selectedSectionData?.name || "",
      //   sub_sub_category: "", // Reset sub-sub-category when sub-category changes
      // }));
      data.sub_category = selectedSectionData.name;
      console.log("sub_category1 :", data.sub_category);
      const subsectionsForSelectedSection =
        selectedSectionData?.subsections || [];

      console.log(
        "subsectionsForSelectedSection",
        subsectionsForSelectedSection
      );
      dispatch(setsubsectionsReducer(subsectionsForSelectedSection));
      setSubsectionsForSelectedSection(subsectionsForSelectedSection);
    } else if (name === "sub_sub_category") {
      console.log("selectedValue", selectedValue);

      // const selectedSubsectionIndex = CategoryData.find(
      //   (category) => category._id === selectedCategory
      // )
      //   .sections.find((section) => section._id === selectedSubcategory)
      //   .subsections.indexOf(selectedSubsectionValue);
      // setSelectedSubsection(selectedSubsectionIndex);
      setdata((prevData) => ({
        ...prevData,
        sub_sub_category: selectedValue,
      }));
    } else if (name === "image") {
      console.log("selectedValue:", selectedValue);
      if (selectedValue) {
        const img = {
          preview: URL.createObjectURL(selectedValue),
          data: selectedValue,
        };
        setFile(img);
      }
    } else {
      setdata((prevData) => ({
        ...prevData,
        [name]: selectedValue,
      }));
    }
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    setIsSubmitted(true);
    e.preventDefault();
    const {
      product_name,
      category,
      sub_category,
      sub_sub_category,
      description,
      quantity,
      image,
      barcode,
      price,
    } = data;

    try {
      const newProduct = await addProduct({
        product_name,
        category,
        sub_category,
        sub_sub_category,
        description,
        quantity,
        image,
        barcode,
        price,
        file,
      });
      if (newProduct === 1) {
        toast.error("failed to add product ");
      } else {
        const addProductData = newProduct.savedProduct;

        console.log("addProductData", addProductData);
        dispatch(addProductReducer(addProductData));
        toast.success("Product added successfully");
        setdata({
          product_name: "",
          category: " ",
          sub_category: "",
          sub_sub_category: "",
          description: "",
          quantity: "",
          image: "",
          barcode: "",
          price: "",
        });
        setFile(null)

        setSelectedCategory(null); // Reset selected category
        setSelectedSubcategory(null); // Reset selected sub-category
        setSelectedSubsection(null); // Reset selected sub-sub-category
        setSelectedUnitForUpdate(null); // Reset selected unit
        setIsSubmitted(false);
      }
      // dispatch(setDataProduct([...productData, newProduct]));
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  const addCategoryButton = () => {
    setAddCategoryOpen(true); // Toggle the state
  };

  // for updation of the category
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] =
    useState(false);
  const [selectedCategoryForUpdate, setSelectedCategoryForUpdate] =
    useState(null);

  const handleUpdateCategoryClick = (categoryId) => {
    console.log("categoryId : ", categoryId);

    setSelectedCategoryForUpdate(categoryId);
    setIsUpdateCategoryModalOpen(true);
  };

  // for updation of the section

  const [selectedSectionForUpdate, setSelectedSectionForUpdate] =
    useState(null); // Add this line
  const [isUpdateSectionModalOpen, setIsUpdateSectionModalOpen] =
    useState(false); // Add this line

  const [selectedUpdateSection, setSelectedUpdateSection] = useState({
    sectionId: null,
    categoryId: null,
  });

  const handleUpdateSectionClick = (sectionId) => {
    const selectedSection = sectionsForSelectedCategory.find(
      (section) => section._id === sectionId
    );

    if (selectedSection) {
      setSelectedUpdateSection({
        sectionId,
        categoryId: selectedCategory,
      });
      setIsUpdateSectionModalOpen(true);
    }
  };

  // for updation of subsection

  const [isUpdateSubsectionModalOpen, setIsUpdateSubsectionModalOpen] =
    useState(false);
  const [selectedUpdateSubsection, setSelectedUpdateSubsection] = useState({
    categoryId: null,
    sectionId: null,
    // subsectionIndex: null,
    index: null,
  });
  const handleUpdateSubsectionClick = (
    categoryId,
    sectionId,
    // subsectionIndex
    index
  ) => {
    setIsUpdateSubsectionModalOpen(true);
    setSelectedUpdateSubsection({
      categoryId,
      sectionId,
      index,
      // subsectionIndex: sectionsForSelectedCategory
      //   .find((section) => section._id === sectionId)
      //   .subsections.indexOf(subsectionIndex), // Get the index of the subsection
    });
  };

  useEffect(() => {
    async function fetchUnitsData() {
      const units = await fetchUnits();
      dispatch(setUnits(units));
    }
    fetchUnitsData();
  }, []);
  const unitsData = useSelector((state) => state.units);
  // console.log("unitsData", unitsData);

  const [selectedUnitForUpdate, setSelectedUnitForUpdate] = useState(null);
  const handleUpdateUnitClick = (unitId) => {
    const selectedUnit = unitsData.find((unit) => unit._id === unitId);
    setSelectedUnitForUpdate(selectedUnit);
  };

  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isAddSubsectionOpen, setIsAddSubsectionOpen] = useState(false);
  const handleAddSubsectionClick = () => {
    setIsAddSubsectionOpen(true);
  };

  const handleAddSubsectionClose = () => {
    setIsAddSubsectionOpen(false);
  };

  // add new unit
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);

  const handleAddUnitClick = () => {
    setIsAddUnitOpen(true);
  };

  const handleCloseAddUnit = () => {
    setIsAddUnitOpen(false);
  };


  const [page, setPage] = useState(1);
//   const [isProdctData, setisProdctData] = useState([])

// setisProdctData(productData);
// console.log("previous isProdctData", isProdctData);
  useEffect(() => {
    fetchProducts(dispatch, page , productData );
  }, [page]);

  useEffect(() => {
    dispatch(fetchCategories()); // Dispatch the async action to fetch categories
  }, [dispatch]);

  const handleLoadMore = () => {
    const productDataTotalPages = productData.length / 10;
    if (page <= productDataTotalPages) {
      setPage((prevPage) => prevPage + 1);
    } else {
      toast.error("product items is over");
    }
  };
  const handlebackpage = () => {
    if (page !== 1) {
      setPage((prevPage) => prevPage - 1);
    } else {
      toast.error("you are on first page");
    }
  };
  const formStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(125, 211 ,252)', // Set the background color for the control (input)
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "pink", // Set the color of the dropdown indicator (the arrow)
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(186, 230, 253)', // Set the background color of each option
    }),
  };

  return (
    <div className="min-w-full bg-gradient-to-l from-teal-500 to-blue-500">
      <form
        //  style={formStyle}
        className={`p-4 m-auto   w-full max-w-md shadow-xl drop-shadow-2xl flex flex-col rounded-md  ${isSubmitted ? 'glow-border' : ''}`}
       
        action=""
        onSubmit={handleSubmit}
      >
        <label htmlFor="product_name" className="mt-1">
          Name :
        </label>
        <input
          id="product_name"
          type="text"
          name="product_name"
          value={data.product_name}
          required
          onChange={(e) => onChange("product_name", e.target.value)}
          className="bg-sky-300 focus:bg-sky-200 px-2 py-1 my-1 rounded-md hover:border-2 hover:border-pink-500 focus:border-2 focus:outline-none focus:border-pink-500"
        />

        {/* Category Dropdown */}
        <div className="my-1 flex justify-start items-center gap-52">
          <label htmlFor="category" className="mt-1">
            Category:
          </label>
          <NavLink
            to="#"
            className="bg-blue-500 rounded-md text-white text-sm px-2 py-1"
            onClick={addCategoryButton}
          >
            Add new
          </NavLink>
        </div>
        {addCategoryOpen && (
          <Category onClose={() => setAddCategoryOpen(false)} />
        )}
        {CategoryData && (
          <Select
          styles={customStyles}
            options={CategoryData.map((category) => ({
              value: category._id,

              label: (
                <div className="flex items-center justify-between  ">
                  {category.name}
                  <div className="flex gap-2">
                    <NavLink
                      className="bg-green-400 text-sm text-white px-2 py-1 rounded"
                      onClick={() => handleUpdateCategoryClick(category._id)}
                    >
                      <FiEdit size={15} />
                    </NavLink>
                    <NavLink
                      className="bg-red-500  text-sm text-white px-2 py-1 rounded"
                      onClick={() => deleteCategory(category._id, dispatch)}
                    >
                      <MdDelete size={15} />
                    </NavLink>
                  </div>
                </div>
              ),
            }))}
            required
            onChange={(selectedOption) =>
              onChange("category", selectedOption.value)
            }
          />
        )}
        {isUpdateCategoryModalOpen && (
          <UpdateCategory
            categoryId={selectedCategoryForUpdate}
            onClose={() => setIsUpdateCategoryModalOpen(false)}
          />
        )}

        <div className="my-1 flex justify-start items-center gap-52">
          <label htmlFor="sub_categorty" className="mt-1">
            Section :
          </label>
          {selectedCategory && (
            <NavLink
              to="#"
              className="bg-blue-500 rounded-md text-white text-sm px-2 py-1"
              onClick={() => setIsAddSectionModalOpen(true)}
            >
              Add new
            </NavLink>
          )}
        </div>
        {isAddSectionModalOpen && (
          <NewSection
            categoryId={selectedCategory} // Pass the selected category ID
            onClose={() => setIsAddSectionModalOpen(false)}
          />
        )}

        <Select
        styles={customStyles}
          options={SectionData.map((section) => ({
            value: section._id,
            label: (
              <div className="flex items-center justify-between">
                {section.name}
                <div className="flex gap-2">
                  <NavLink
                    className="bg-green-400 text-white px-2 py-1 rounded"
                    onClick={() => handleUpdateSectionClick(section._id)}
                  >
                    <FiEdit size={15} />
                  </NavLink>
                  <NavLink
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() =>
                      deleteSection(selectedCategory, section._id, dispatch)
                    }
                  >
                    <MdDelete size={15} />
                  </NavLink>
                </div>
              </div>
            ),
          }))}
          required
          onChange={(selectedOption) => {
            onChange("sub_category", selectedOption.value);
            console.log("sub category :", data.sub_category);
          }}
          isDisabled={!selectedCategory} // Disable the dropdown if no category is selected
        />

        {/* Update Section NavLink */}

        {isUpdateSectionModalOpen && (
          <UpdateSection
            sectionId={selectedUpdateSection.sectionId}
            categoryId={selectedUpdateSection.categoryId}
            onClose={() => setIsUpdateSectionModalOpen(false)}
          />
        )}

        <div className="my-1 flex justify-start items-center gap-52">
          <label htmlFor="sub_sub_category" className="mt-1">
            Subsection :
          </label>
          {selectedSubcategory && (
            <NavLink
              to="#"
              className="bg-blue-500 rounded-md text-white text-sm px-2 py-1"
              onClick={handleAddSubsectionClick}
            >
              Add new
            </NavLink>
          )}
        </div>
        {isAddSubsectionOpen && (
          <NewSubsection
            onClose={handleAddSubsectionClose}
            selectedSection={selectedSubcategory}
            selectedCategory={selectedCategory}
          />
        )}

        <Select
        styles={customStyles}
          options={
            // selectedSubcategory
            //   ? sectionsForSelectedCategory
            //       .find((section) => section._id === selectedSubcategory)
            //       .subsectionData.map((subsection, index) => ({
            sectionsForSelectedCategory && subsectionData
              ? subsectionData.map((subsection, index) => ({
                  value: subsection,
                  label: (
                    <div className="flex items-center justify-between">
                      {subsection}
                      <div className="flex gap-2">
                        <NavLink
                          className="bg-green-400 text-white px-2 py-1 rounded"
                          onClick={() =>
                            handleUpdateSubsectionClick(
                              selectedCategory,
                              selectedSubcategory,
                              index
                            )
                          }
                        >
                          <FiEdit size={15} />
                        </NavLink>
                        <NavLink
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => {
                            deleteSubsection(
                              selectedCategory,
                              selectedSubcategory,
                              index,
                              dispatch
                            );
                          }}
                        >
                          <MdDelete size={15} />
                        </NavLink>
                      </div>
                    </div>
                  ),
                }))
              : []
          }
          isDisabled={!selectedSubcategory}
          onChange={(selectedOption) =>
            onChange("sub_sub_category", selectedOption.value)
          }
        />

        {/* Update Subsection Modal */}
        {isUpdateSubsectionModalOpen && (
          <UpdateSubsection
            categoryId={selectedUpdateSubsection.categoryId}
            sectionId={selectedUpdateSubsection.sectionId}
            // subsectionIndex={selectedUpdateSubsection.subsectionIndex}
            subsectionIndex={selectedUpdateSubsection.index}
            onClose={() => setIsUpdateSubsectionModalOpen(false)}
          />
        )}

        <label htmlFor="image" className="mt-1 cursor-pointer">
          Image :
          <div
            className="h-40 w-full  flex items-center justify-center  bg-sky-300 focus:bg-sky-200 px-2 py-1 my-1 rounded-md hover:border-2 hover:border-pink-500 focus:border-2 focus:outline-none focus:border-pink-500
"
          >
            {file ? (
              <img src={file.preview} className="h-full" alt="productImage" />
            ) : (
              <span className="text-5xl">
                <FaUpload />
              </span>
            )}

            <input
              type="file"
              name="file"
              accept="image/*"
              id="image"
              required
              onChange={(e) => onChange("image", e.target.files[0])}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="barcode" className="mt-1">
          Barcode :
        </label>
        <input
          type="text"
          name="barcode"
          id="barcode"
          value={data.barcode}
          required
          onChange={(e) => onChange("barcode", e.target.value)}
          className=" bg-sky-300 focus:bg-sky-200 px-2 py-1 my-1 rounded-md hover:border-2 hover:border-pink-500 focus:border-2 focus:outline-none focus:border-pink-500"
        />

        <label htmlFor="price" className="mt-1">
          Price :
        </label>
        <input
          type="text"
          name="price"
          id="price"
          value={data.price}
          required
          onChange={(e) => onChange("price", e.target.value)}
          className=" bg-sky-300 focus:bg-sky-200 px-2 py-1 my-1 rounded-md hover:border-2 hover:border-pink-500 focus:border-2 focus:outline-none focus:border-pink-500"
        />

        <div className="flex justify-start items-center gap-52 my-2">
          <label htmlFor="quantity" className="mt-1">
            Unit :
          </label>
          <NavLink
            className="bg-blue-500 text-sm text-white px-2 py-1 rounded-md"
            onClick={handleAddUnitClick}
          >
            Add Unit
          </NavLink>
        </div>
        {isAddUnitOpen && <NewUnit onClose={handleCloseAddUnit} />}

        {selectedUnitForUpdate && (
          <UpdateUnit 
            unitId={selectedUnitForUpdate._id}
            onClose={() => setSelectedUnitForUpdate(null)}
            // updateUnitCallback={handleUnitUpdate}
          />
        )}
        
        <Select
        styles={customStyles}
          options={unitsData.map((unit) => ({
            value: unit._id,
            label: (
              <div className="flex items-center justify-between">
                {unit.name}
                <div className="flex gap-2">
                  <NavLink
                    className="bg-green-400 text-white px-2 py-1 rounded"
                    onClick={() => handleUpdateUnitClick(unit._id)}
                  >
                    <FiEdit size={15} />
                  </NavLink>
                  <NavLink
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteUnitClick(unit._id, dispatch)}
                  >
                    <MdDelete size={15} />
                  </NavLink>
                </div>
              </div>
            ),
          }))}
          required
          onChange={(selectedOption) =>
            onChange("quantity", selectedOption.label.props.children[0])
          }
        />

        <label htmlFor="description" className="mt-1">
          Description :
        </label>
        <textarea
          name="description"
          id="description"
          rows="3"
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          className=" bg-sky-300 focus:bg-sky-200 px-2 py-1 my-1 rounded-md hover:border-2 hover:border-pink-500 focus:border-2 focus:outline-none focus:border-pink-500 resize-none"
        ></textarea>

        <div className="flex justify-center">
          <button
            type="submit"
            className=" font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500  hover:from-pink-500 hover:to-yellow-500 rounded-md px-4 py-2"
          >
            Submit
          </button>
        </div>
      </form>

      <p className="text-3xl font-semibold py-10">SearchPoduct : </p>

      <div className="flex justify-center items-center flex-wrap gap-6 pt-6">
        {SearchData.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            expandedProducts={expandedProducts}
            toggleDescription={toggleDescription}
            deleteProduct={deleteProduct}
            handleUpdateClick={handleUpdateClick}
          />
        ))}
      </div>

      <p className="text-3xl font-semibold py-10">Product List : </p>
     
      <div className="  flex flex-wrap gap-6 pt-6 justify-center items-center ">
        {productData.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            expandedProducts={expandedProducts}
            toggleDescription={toggleDescription}
            deleteProduct={deleteProduct}
            handleUpdateClick={handleUpdateClick}
          />
        ))}
      </div>
     
      <div className="flex justify-end items-center  my-5">
        {/* <button
          className="bg-gradient-to-b font-semibold text-white from-cyan-500 to-blue-500 rounded-md px-4 py-2"
          onClick={handlebackpage}
        >
          Load back
        </button> */}
        <button
          className="bg-gradient-to-b font-semibold text-white from-cyan-500 to-blue-500 rounded-md px-4 py-2"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          product={selectedProductId}
          // Pass product ID to Modal component
        />
      )}
    </div>
  );
};

export default NewProduct;
