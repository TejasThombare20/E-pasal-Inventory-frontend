import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FloatingWindow = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [subsections, setSubsections] = useState([]);
  const [selectedSubsection, setSelectedSubsection] = useState('');

  useEffect(() => {
    // Fetch categories from backend
    axios.get('/api/categories').then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);

    // Fetch sections for the selected category
    axios.get(`/api/categories/${selectedCategoryId}/sections`).then((response) => {
      setSections(response.data.sections);
    });
  };

  const handleSectionChange = (event) => {
    const selectedSectionId = event.target.value;
    setSelectedSection(selectedSectionId);

    // Fetch subsections for the selected section
    axios
      .get(`/api/categories/${selectedCategory}/sections/${selectedSectionId}/subsections`)
      .then((response) => {
        setSubsections(response.data.subsections);
      });
  };

  return (
    <div className="floating-window">
      <form>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="section">Section:</label>
          <select
            id="section"
            value={selectedSection}
            onChange={handleSectionChange}
            disabled={!selectedCategory}
          >
            <option value="">Select a section</option>
            {sections.map((section) => (
              <option key={section._id} value={section._id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subsection">Subsection:</label>
          <select
            id="subsection"
            value={selectedSubsection}
            onChange={(event) => setSelectedSubsection(event.target.value)}
            disabled={!selectedSection}
          >
            <option value="">Select a subsection</option>
            {subsections.map((subsection) => (
              <option key={subsection} value={subsection}>
                {subsection}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default FloatingWindow;
