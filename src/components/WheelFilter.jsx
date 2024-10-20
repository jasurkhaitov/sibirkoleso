import React, { useContext, useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { FaChevronUp } from 'react-icons/fa6';
import { wheels } from '@/util/data';
import Select from './Select';
import Products from './Products';
import { icons, styles } from '@/util/constant';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MyContext } from '@/hooks/Context';
import Cart from './Cart';
import Badge from '@mui/material/Badge';
import { ShoppingCartIcon } from 'lucide-react';

export default function WheelFilter() {
  const {
    wheelParam,
    setWheelParam,
    numberOfStore,
    selectedWheel,
    setSelectedWheel,
  } = useContext(MyContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(wheels);
  const [options, setOptions] = useState({
    width: [],
    height: [],
    diametr: [],
    brand: [],
  });
  const [resetTrigger, setResetTrigger] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const updateAvailableOptions = (filterParams) => {
    let filtered = wheels;

    const keys = ['width', 'height', 'diametr', 'brand'];
    keys.forEach((key) => {
      if (filterParams[key].length > 0) {
        filtered = filtered.filter((wheel) =>
          filterParams[key].includes(wheel[key])
        );
      }
    });

    const newOptions = keys.reduce((acc, key) => {
      acc[key] = [...new Set(filtered.map((w) => w[key]))].filter(Boolean);
      return acc;
    }, {});

    setOptions(newOptions);
    setFilteredProducts(filtered);
    setSelectedWheel(filtered.length);
  };

  const handleChange = (selectedValues, name) => {
    const newParams = { ...wheelParam, [name]: selectedValues };
    setWheelParam(newParams);
    updateAvailableOptions(newParams);
  };

  const handleSearch = () => {
    setDisplayedProducts(
      Object.values(wheelParam).some((arr) => arr.length > 0)
        ? filteredProducts
        : wheels
    );
  };

  const handleReset = () => {
    setWheelParam({ width: [], height: [], diametr: [], brand: [] });
    setFilteredProducts([]);
    setDisplayedProducts(wheels);
    setResetTrigger((prev) => prev + 1);
    updateAvailableOptions({ width: [], height: [], diametr: [], brand: [] });
  };

  const isSearchDisabled = Object.values(wheelParam).every(
    (value) => value.length === 0
  );

  useEffect(() => {
    const initialOptions = {
      width: [...new Set(wheels.map((w) => w.width))].filter(Boolean),
      height: [...new Set(wheels.map((w) => w.height))].filter(Boolean),
      diametr: [...new Set(wheels.map((w) => w.diametr))].filter(Boolean),
      brand: [...new Set(wheels.map((w) => w.brand))].filter(Boolean),
    };
    setOptions(initialOptions);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 550);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="w-full bg-[#282828] py-6 shadow-md">
        <div className={styles.pageContainer}>
          <div className="mb-5">
            <div className="flex items-center justify-start gap-2 mb-7">
              <span>{icons.setting}</span>
              <span className="text-[15px] leading-[20px] text-white">
                По параметрам
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['width', 'height', 'diametr', 'brand'].map((param) => (
                <div key={param}>
                  <h3 className="py-5 hover:text-orange-500 text-[#666666] bg-white rounded-t-md px-4 text-[13px] duration-300 cursor-pointer">
                    {param === 'width'
                      ? 'Ширина'
                      : param === 'height'
                      ? 'Высота'
                      : param === 'diametr'
                      ? 'Диаметр'
                      : 'Бренд'}
                  </h3>
                  <Select
                    options={options[param]}
                    onChange={(selectedValues) =>
                      handleChange(selectedValues, param)
                    }
                    name={param}
                    resetTrigger={resetTrigger}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex gap-8 justify-center mb-4">
            <button
              className={`px-6 bg-[#666666] text-sm text-white py-3 rounded-md hover:bg-gray-600 ${
                isSearchDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSearch}
              disabled={isSearchDisabled}
            >
              Поиск{' '}
              {selectedWheel > 0 && !isSearchDisabled
                ? `(${selectedWheel})`
                : ''}
            </button>
            {!isSearchDisabled && (
              <button
                className="px-6 flex items-center gap-2 text-sm text-[#909090] py-2 rounded-md hover:text-orange-500 transition duration-300"
                onClick={handleReset}
              >
                <MdCancel /> Сбросить
              </button>
            )}
          </div>
        </div>
      </div>

      {displayedProducts.length > 0 && (
        <Products displayedProducts={displayedProducts} type={'wheel'} />
      )}

      {showScrollButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-[67vh] left-5 lg:right-[90vw] lg:left-auto z-0 text-xl bg-white font-[400] p-4 rounded-full shadow-lg border hover:text-orange-600 hover:border-orange-600 transition duration-300"
        >
          <FaChevronUp size={20} className="font-normal" />
        </button>
      )}

      {showScrollButton && (
        <button className="fixed bottom-[67vh] z-10 right-5 lg:left-[90vw] lg:right-auto">
          <Sheet className="bg-opacityBackground">
            <SheetTrigger className="focus:outline-none">
              <div className="bg-white p-4 rounded-full border hover:border-hoverOrange">
                <Badge badgeContent={numberOfStore} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </div>
            </SheetTrigger>

            <SheetContent side={'right'} className="md:w-[500px] w-full">
              <Cart />
            </SheetContent>
          </Sheet>
        </button>
      )}
    </>
  );
}
