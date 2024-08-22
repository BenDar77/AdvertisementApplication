import React, { useEffect, useState } from 'react';
import api from '../services/api';
import SearchBar from './Searchbar';
import Select from './Select';
import Navbar from './Navbar';
import Modal from './Modal';
import EditAdvertModal from './EditAdvertModal';
import { toast } from 'react-toastify';

const AdvertList = () => {
  const [adverts, setAdverts] = useState([]);
  const [filteredAdverts, setFilteredAdverts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [advertToDelete, setAdvertToDelete] = useState(null);
  const [advertToEdit, setAdvertToEdit] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get('/adverts'),
      api.get('/categories')
    ])
    .then(([advertsResponse, categoriesResponse]) => {
      setAdverts(advertsResponse.data);
      setFilteredAdverts(advertsResponse.data);
      setCategories(categoriesResponse.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data.');
    });
  }, []);

  console.log(categories);
  console.log(adverts);

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterAdverts(value, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterAdverts(searchTerm, category);
  };

  const filterAdverts = (term, category) => {
    const filteredAdverts = adverts.filter(advert => {
      const advertName = advert.name || '';
      const advertCategory = advert.category || '';

      return advertName.toLowerCase().includes(term.toLowerCase()) &&
        (category === '' || advertCategory.toLowerCase() === category.toLowerCase());
    });
    setFilteredAdverts(filteredAdverts);
  };

  const handleDeleteAdvert = (id) => {
    api.delete(`/advert/${id}`)
      .then(() => {
        const updatedAdverts = adverts.filter(advert => advert.id !== id);
        setAdverts(updatedAdverts);
        setFilteredAdverts(updatedAdverts);
        toast.success('Advert deleted successfully!');
      })
      .catch(error => {
        console.error('Failed to delete the advert:', error);
        toast.error('Failed to delete the advert.');
      });
    closeModal();
  };

  const handleSaveAdvert = (updatedAdvert) => {
    if (!updatedAdvert.id) {
      toast.error('Advert ID is missing. Update failed.');
      return;
    }

    api.put(`/advert/${updatedAdvert.id}`, updatedAdvert)
      .then(response => {
        const updatedAdvertFromResponse = response.data;
        const updatedAdverts = adverts.map(advert =>
          advert.id === updatedAdvertFromResponse.id ? updatedAdvertFromResponse : advert
        );
        setAdverts(updatedAdverts);
        setFilteredAdverts(updatedAdverts);
        toast.success('Advert updated successfully!');
        closeEditModal();
      })
      .catch(error => {
        console.error('Failed to update the advert:', error);
        toast.error('Failed to update the advert.');
      });
  };

  const openModal = (advert) => {
    setIsModalOpen(true);
    setAdvertToDelete(advert);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAdvertToDelete(null);
  };

  const openEditModal = (advert) => {
    setIsEditModalOpen(true);
    setAdvertToEdit(advert);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setAdvertToEdit(null);
  };

  return (
    <div className="">
      <Navbar />
      <h1 className='text-5xl font-bold text-center m-12 mb-24 text-[rgb(0,223,154)]'>Advert List</h1>
      <div className='flex m-12'>
        <SearchBar onSearch={handleSearch} />
        <Select 
          value={selectedCategory} 
          onChange={handleCategoryChange} 
          categories={categories} 
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-black-200">
          <thead className="bg-black-50 dark:bg-black-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-black-200 dark:bg-black-800">
        
            {filteredAdverts.map(advert => (
              <tr key={advert.id}>
              
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black-100">{advert.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-100">{advert.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black-100">{advert.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black-100">{advert.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black-100">{advert.city}</td>
                
                <td>
                  <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-2 rounded mr-2" 
                    onClick={() => openModal(advert)}
                  >
                    Delete
                  </button>
                  <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded" 
                    onClick={() => openEditModal(advert)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        title="Confirm Deletion" 
        message={`Are you sure you want to delete the advert titled "${advertToDelete?.name}"?`}
        onConfirm={() => handleDeleteAdvert(advertToDelete.id)} 
        onCancel={closeModal} 
      />
      <EditAdvertModal 
        isOpen={isEditModalOpen}
        advert={advertToEdit}
        onSave={handleSaveAdvert}
        onCancel={closeEditModal}
      />
    </div>
  );
};

export default AdvertList;
