import React from 'react'
import imageUpload from '../assets/img/noImage.webp'

export default function AddNewItem({
	item,
	handleChange,
	handleSubmit,
	handleImageUpload,
	handleReset,
	title, 
	pls,
}) {
	return (
		<div className='w-full p-6 bg-gray-100 rounded-lg shadow-md'>
			<h2 className='text-3xl font-bold mb-4 text-center font-mono'>
				{`Добавить новый продукт ${title} в деталях`}
			</h2>
			<div className='max-w-[900px] mx-auto flex flex-col md:flex-row'>
				<div className='md:w-1/2 p-4 flex flex-col items-center'>
					<div className='w-full h-60 bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg mb-4'>
						{item.picture ? (
							<img
								src={item.picture}
								alt='Uploaded'
								className='h-full w-full object-cover rounded-lg'
							/>
						) : (
							<div className='relative'>
								<img
									src={imageUpload}
									alt='Uploaded'
									className='h-full w-full object-cover rounded-lg'
								/>
								<span className='text-gray-600 w-full text-center text-lg font-semibold absolute top-2/3 left-1/2 -translate-x-1/2'>
									{`Загрузить изображение ${title}`}
								</span>
							</div>
						)}
					</div>
					<input
						autoComplete='off'
						type='file'
						accept='image/*'
						onChange={handleImageUpload}
						className='w-full bg-white p-2 border border-gray-300 rounded-md mb-4'
					/>

					<div className='flex flex-col w-full'>
						<label htmlFor='price' className='text-gray-700 px-3'>
							Цена:
						</label>
						<input
							autoComplete='off'
							type='number'
							id='price'
							name='price'
							value={item.price}
							onChange={handleChange}
							placeholder={pls.price}
							className='mt-1 p-2 border border-gray-300 rounded-md'
							required
						/>
					</div>
				</div>

				<div className='md:w-1/2 p-4'>
					<form className='space-y-4' onSubmit={handleSubmit}>
						<div className='flex flex-col'>
							<label htmlFor='name' className='text-gray-700 px-3'>
								Название:
							</label>
							<input
								autoComplete='off'
								type='text'
								id='name'
								name='name'
								value={item.name}
								onChange={handleChange}
								placeholder={pls.name}
								className='mt-1 p-2 border border-gray-300 rounded-md'
								required
							/>
						</div>

						<div className='flex flex-col'>
							<label htmlFor='brand' className='text-gray-700 px-3'>
								Бренд:
							</label>
							<input
								autoComplete='off'
								type='text'
								id='brand'
								name='brand'
								value={item.brand}
								onChange={handleChange}
								placeholder={pls.brand}
								className='mt-1 p-2 border border-gray-300 rounded-md'
								required
							/>
						</div>

						<div className='flex space-x-4'>
							<div className='flex flex-col w-1/2'>
								<label htmlFor='width' className='text-gray-700 px-3'>
									Ширина:
								</label>
								<input
									autoComplete='off'
									type='text'
									id='width'
									name='width'
									value={item.width}
									onChange={handleChange}
									placeholder={pls.width}
									className='mt-1 p-2 border border-gray-300 rounded-md'
									required
								/>
							</div>

							<div className='flex flex-col w-1/2'>
							<label htmlFor='height' className='text-gray-700 px-3'>
								Высота:
							</label>
							<input
								autoComplete='off'
								type='text'
								id='height'
								name='height'
								value={item.height}
								onChange={handleChange}
								placeholder={pls.height}
								className='mt-1 p-2 border border-gray-300 rounded-md'
								required
							/>
						</div>
						</div>

						<div className='flex flex-col'>
								<label htmlFor='diametr' className='text-gray-700 px-3'>
									Диаметр:
								</label>
								<input
									autoComplete='off'
									type='text'
									id='diametr'
									name='diametr'
									value={item.diametr}
									onChange={handleChange}
									placeholder={pls.diametr}
									className='mt-1 p-2 border border-gray-300 rounded-md'
									required
								/>
							</div>

						<div className='flex space-x-4'>
							<button
								type='submit'
								className='w-full active:scale-90 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300'
							>
								Добавить продукт
							</button>
							<button
								type='button'
								onClick={handleReset}
								className='w-full active:scale-90 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300'
							>
								Сбросить
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}