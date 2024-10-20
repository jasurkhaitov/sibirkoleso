import React, { useState, useEffect, useRef, useContext } from 'react';
import { icons, linkNavBar, menuBar, styles } from '@/util/constant';
import Logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MyContext } from '@/hooks/Context';
import Cart from './Cart';
import { Badge } from '@mui/material';
import { ShoppingCartIcon } from 'lucide-react';

export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const { numberOfStore } = useContext(MyContext);

  const handleMenu = (e) => {
    e.stopPropagation();
    setOpenModal((prev) => !prev);
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
        setOpenModal(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setOpenModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <div ref={navbarRef}>
      <div className="bg-white border-b border-slate-200 z-50 relative">
        <div
          className={`${styles.pageContainer} py-[20px] flex items-center justify-between`}
        >
          <div className="flex items-center justify-center gap-[30px] md:gap-[50px]">
            <Link
              to={'/'}
              onClick={closeMenu}
              className="flex items-center justify-start gap-3"
            >
              <img
                className="w-[33px] h-[34px]"
                src={Logo}
                alt="Сибирь Колесо"
              />
              <span className="text-[20px] font-roboto leading-[30px] font-bold hidden sm:block">
                Сибирь Колесо
              </span>
            </Link>
            <span className="h-[30px] w-[1px] hidden md:block bg-slate-300"></span>
            <button
              className="flex items-center justify-start gap-[5px] focus:outline-none"
              onClick={handleMenu}
            >
              <div className="relative translate-y-[2px] w-6 h-6">
                <span
                  className={`absolute inset-0 transition-all transform duration-300 ease-in-out ${
                    openModal
                      ? 'rotate-90 opacity-100 fill-hoverOrange'
                      : 'rotate-0 opacity-0 fill-hoverOrange'
                  }`}
                >
                  {icons.closeBtn}
                </span>
                <span
                  className={`absolute inset-0 transition-all transform duration-300 ease-in-out ${
                    openModal ? 'rotate-0 opacity-0' : 'rotate-0 opacity-100'
                  }`}
                >
                  {icons.spinnerBars}
                </span>
              </div>
              <span
                className={`${
                  openModal ? 'text-hoverOrange' : 'text-darkColor'
                } text-[16px] leading-4 font-opensans duration-500 ease-in-out`}
              >
                Меню
              </span>
            </button>
          </div>

          <div className="flex justify-center gap-[30px] md:gap-[40px]">
            <Sheet className="bg-opacityBackground">
              <SheetTrigger className="focus:outline-none">
                <div
                  className="indicator focus:outline-none"
                  onClick={closeMenu}
                >
                  <Badge badgeContent={numberOfStore} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </div>
              </SheetTrigger>

              <SheetContent className="md:w-[500px] w-full">
                <Cart />
              </SheetContent>
            </Sheet>

            <Link
              to={'/admin'}
              className="translate-y-[5px]"
              onClick={closeMenu}
            >
              {icons.user}
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleMenu}
        ></div>
      )}

      <div
        className={`fixed left-0 top-17 bg-white w-full transition-max-height duration-500 ease-in-out overflow-hidden border-t border-gray-300 z-50 overflow-y-hidden ${
          isOpen ? 'max-h-auto opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div
          className={`bg-white ${styles.pageContainer} flex justify-between flex-col items-start gap-4 divide-y md:divide-y-0 md:flex-row md:items-center`}
        >
          <div className="flex items-center justify-start gap-[100px]">
            {menuBar.map((item) => {
              return (
                <div key={item.id}>
                  <Link
                    to={item.url}
                    className="flex delay-75 duration-150 ease-in-out fill-black hover:fill-hoverOrange stroke-black hover:stroke-hoverOrange hover:text-hoverOrange flex-row gap-3 md:gap-5 text-black items-center justify-start md:flex-col md:items-start "
                  >
                    <span>{item.logo}</span>
                    <span className="text-[18px] leading-[30px] font-bold font-roboto">
                      {item.name}
                    </span>
                  </Link>

                  <p className="text-[13px] leading-[25px] font-opensans text-grayColor mt-2 md:mt-0">
                    {item.num} модели
                  </p>
                </div>
              );
            })}
          </div>

          <span className="h-[150px] w-[1px] hidden md:block bg-slate-300"></span>

          <div className="flex items-center gap-[100px] pt-4 w-full md:pt-0 ">
            <ul className="flex flex-col gap-1">
              {linkNavBar.map((item) => {
                return (
                  <li key={item.id}>
                    <Link
                      className="text-[13px] text-textBlack leading-[20px] font-opensans hover:text-hoverOrange"
                      to={item.slug}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col gap-2">
              <p className="text-[13px] leading-[17px] font-opensans text-grayColor">
                Единая справочная
              </p>
              <a
                href="tel:+88007751050"
                className="text-[18px] leading-[25px] font-bold text-textBlack hover:text-hoverOrange"
              >
                8 800 775-10-50
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
