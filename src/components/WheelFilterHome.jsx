import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from './Select';
import { wheels } from '@/util/data';
import { MyContext } from '@/hooks/Context';
import { MdCancel } from 'react-icons/md';
import { styles } from '@/util/constant';

export default function WheelFilterHome() {
	const navigate = useNavigate();
	const { wheelParam, setWheelParam, selectedWheel, setSelectedWheel } = useContext(MyContext);
	const [options, setOptions] = useState({
		width: [],
		height: [],
		diametr: [],
		brand: [],
	});

	const [selectedValues, setSelectedValues] = useState({
		width: [],
		height: [],
		diametr: [],
		brand: []
	});

	const handleChange = (selectedValues, name) => {
		const newParams = { ...wheelParam, [name]: selectedValues };
		setWheelParam(newParams);
		setSelectedValues(prev => ({ ...prev, [name]: selectedValues }));
		updateAvailableOptions(newParams);
	};

	const [resetTrigger, setResetTrigger] = useState(false);

	const updateAvailableOptions = filterParams => {
		let filtered = wheels;

		if (filterParams.width.length > 0) {
			filtered = filtered.filter(tire => filterParams.width.includes(tire.width));
		}
		if (filterParams.height.length > 0) {
			filtered = filtered.filter(tire => filterParams.height.includes(tire.height));
		}
		if (filterParams.diametr.length > 0) {
			filtered = filtered.filter(tire => filterParams.diametr.includes(tire.diametr));
		}
		if (filterParams.brand.length > 0) {
			filtered = filtered.filter(tire => filterParams.brand.includes(tire.brand));
		}

		const newOptions = {
			width: [...new Set(filtered.map(t => t.width))].filter(Boolean),
			height: [...new Set(filtered.map(t => t.height))].filter(Boolean),
			diametr: [...new Set(filtered.map(t => t.diametr))].filter(Boolean),
			brand: [...new Set(filtered.map(t => t.brand))].filter(Boolean),
		};

		setOptions(newOptions);

		setSelectedWheel(
			filtered.length
		);
	};

	const handleSearch = () => {
		navigate('/wheels');
	};

	const handleReset = () => {
		const resetParams = { width: [], height: [], diametr: [], brand: [] };
		setWheelParam(resetParams);
		setSelectedValues(resetParams);
		updateAvailableOptions(resetParams);
		setResetTrigger(prev => !prev);
	};

	const isAnyOptionSelected = Object.values(wheelParam).some(param => param.length > 0);

	useEffect(() => {
		const initialOptions = {
			width: [...new Set(wheels.map(t => t.width))].filter(Boolean),
			height: [...new Set(wheels.map(t => t.height))].filter(Boolean),
			diametr: [...new Set(wheels.map(t => t.diametr))].filter(Boolean),
			brand: [...new Set(wheels.map(t => t.brand))].filter(Boolean),
		};
		setOptions(initialOptions);
	}, []);

	return (
		<div className='bg-[#282828] py-6 shadow-md'>
			<div className={`${styles.pageContainer}`}>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
					{['width', 'height', 'diametr', 'brand'].map(param => (
						<div key={param}>
							<h3 className='py-5 text-[#666666] bg-white rounded-t-md px-4 text-[13px]'>
								{param === 'width' ? 'Ширина' : param === 'height' ? 'Высота' : param === 'diametr' ? 'Диаметр' : 'Бренд'}
							</h3>
							<Select
								options={options[param]}
								onChange={selectedValues => handleChange(selectedValues, param)}
								name={param}
								value={selectedValues[param]}
								resetTrigger={resetTrigger}
							/>
						</div>
					))}
				</div>

				<div className='w-full flex gap-8 justify-center mb-4'>
					<button
						className={`px-6 bg-[#666666] text-sm text-white py-3 rounded-md hover:bg-gray-600 ${
							!isAnyOptionSelected ? 'opacity-50 cursor-not-allowed' : ''
						}`}
						onClick={handleSearch}
						disabled={!isAnyOptionSelected}
					>
						Поиск {selectedWheel > 0 && isAnyOptionSelected ? `(${selectedWheel})` : ''}
					</button>
					{isAnyOptionSelected && (
						<button
							className='px-6 flex items-center content-center gap-2 text-sm text-[#909090] py-2 rounded-md hover:text-orange-500 transition duration-300'
							onClick={handleReset}
						>
							<MdCancel /> Сбросить
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
