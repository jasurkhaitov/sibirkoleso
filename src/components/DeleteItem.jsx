import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function DeleteItem({ items, handleDelete, title }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='w-full p-6 bg-gray-100 rounded-lg shadow-md'>
      <h2 className='text-3xl font-bold mb-4 text-center'>{`Удалить продукт ${title}`}</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr className='w-full bg-gray-200 border-b'>
              <th className='text-left p-4'>Изображение</th>
              <th className='text-left p-4'>Название</th>
              <th className='text-left p-4'>Тип</th>
              <th className='text-left p-4'>Цена</th>
              <th className='text-left p-4'></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className='group border-b hover:bg-gray-100 cursor-pointer duration-200'
              >
                <td className='p-4 w-[50px]'>
                  <img
                    src={`https://sibirkoleso.ru${item.picture}`}
                    alt={item.name}
                    className='w-auto h-20 object-cover rounded-lg'
                  />
                </td>
                <td className='p-4'>{item.name}</td>
                <td className='p-4'>{item.type}</td>
                <td className='p-4'>{item.price}</td>
                <td className='p-4'>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='text-red-600 hover:text-red-700 transition duration-300 opacity-0 group-hover:opacity-100'
                    aria-label='Удалить продукт'
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex justify-center mt-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50'
          >
            Предыдущий
          </button>
          <span className='mx-4'>
            {currentPage} из {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50'
          >
            Следующий
          </button>
        </div>
      </div>
    </div>
  );
}
