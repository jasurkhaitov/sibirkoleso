import { styles } from '@/util/constant';
import React, { useState } from 'react';
import AddNewItem from './AddNewItem';
import DeleteItem from './DeleteItem';
import { wheels } from '@/util/data'

export default function AdminWheels() {
  const [wheelTab, setWheelTab] = useState('upload');
  const [items, setItems] = useState(wheels);
  const [item, setItem] = useState({
    name: '',
    brand: '',
    width: '',
    height: '',
    diametr: '',
    picture: '',
    price: '',
  });

	const title = 'колесо'

	const placeholder = {
		name: 'Brina Nordico V-522 88T',
		brand: 'Viatti',
		width: '185',
		height: '65',
		diametr: 'R15',
		price: 4550
	}

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItem({
        ...item,
        picture: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { ...item, id: new Date().getTime() };
    setItems([...items, newItem]);
    handleReset();
  };

  const handleReset = () => {
    setItem({
      name: '',
      brand: '',
      width: '',
      height: '',
      diametr: '',
      picture: '',
      price: '',
    });
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div className='flex flex-1'>
      <div className={`${styles.sideBarContent}`}>
        <div className='py-5 bg-whiteBoard rounded-md'>
          <div className={`flex justify-center`}>
            <button
              className={`text-lg font-semibold capitalize px-4 pb-3 ${
                wheelTab === 'upload'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500'
              }`}
              onClick={() => setWheelTab('upload')}
            >
              добавить товар
            </button>

            <button
              className={`text-lg font-semibold capitalize px-4 pb-3 ${
                wheelTab === 'edit'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500'
              }`}
              onClick={() => setWheelTab('edit')}
            >
              удалить товар
            </button>
          </div>
        </div>

        <div className='w-full'>
          {wheelTab === 'upload' ? (
            <AddNewItem item={item} handleChange={handleChange} handleSubmit={handleSubmit} handleImageUpload={handleImageUpload} handleReset={handleReset} title={title} pls={placeholder} />
          ) : (
            <DeleteItem items={items} handleDelete={handleDelete} title={title}/>
          )}
        </div>
      </div>
    </div>
  );
}