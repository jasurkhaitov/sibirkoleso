import React, { useContext, useState, useEffect } from 'react';
import { wheels } from '@/util/data';
import { Link, useParams } from 'react-router-dom';
import { icons, styles } from '@/util/constant';
import { useCart } from '@/hooks/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Badge from '@mui/material/Badge';
import { ShoppingCartIcon } from 'lucide-react';
import Cart from '@/components/Cart';
import { MyContext } from '@/hooks/Context';

export default function WheelItems() {
  const { numberOfStore } = useContext(MyContext);
  const { id } = useParams();
  const { state, dispatch } = useCart();
  const { cartItems } = state;
  const wheelItem = wheels.find((itm) => itm.id == id);

  const [added, setAdded] = useState(false);

  useEffect(() => {
    const isItemInCart = cartItems.some(
      (item) => item.id == id && item.typeCheck === 'wheel'
    );
    setAdded(isItemInCart);
  }, [cartItems, id]);

  const addToCart = () => {
    if (!added) {
      const updatedCartItem = { ...wheelItem, typeCheck: 'wheel', quantity: 1 };

      dispatch({
        type: 'ADD_TO_CART',
        payload: updatedCartItem,
      });

      const updatedCart = [...cartItems, updatedCartItem];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));

      setAdded(true);
    }
  };

  return (
    <div
      className={`${styles.pageContainer} h-screen flex items-center justify-center`}
    >
      <Link className="fixed top-5 right-10" to={'/wheels'}>
        {icons.closePage}
      </Link>

      <div className="flex items-center justify-center gap-[75px] w-full">
        <img
          src={'https://sibirkoleso.ru' + wheelItem.picture}
          alt={wheelItem.name}
          className="w-auto h-[500px] object-cover"
        />

        <div className="flex flex-col justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            {wheelItem.brand}
          </h2>
          <h2 className="text-2xl my-2 font-bold text-gray-900">
            {wheelItem.name}
          </h2>
          <p className="text-2xl mb-5 font-medium">{wheelItem.type}</p>
          <p className="text-[15px] leading-[20px] font-opensans">{`Диаметр: ${wheelItem.diametr}`}</p>
          <p className="text-[15px] leading-[20px] font-opensans mb-5">{`Ширина: ${wheelItem.width}`}</p>
          <p className="text-3xl font-bold flex flex-col text-black mb-5">
            <span className="text-black text-xs font-light">
              Цена (при заказе на сайте):
            </span>
            {wheelItem.price} Rubl
          </p>

          <div className="flex items-center gap-5">
            <button
              onClick={addToCart}
              className={`${
                !added
                  ? 'bg-[#FF5601] hover:bg-[#e04f00] cursor-pointer'
                  : 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed'
              } px-5 w-[200px] py-3 text-sm text-white rounded transition duration-300`}
              disabled={added}
            >
              {!added ? 'Добавить в корзину' : 'Уже в корзине'}
            </button>

            <Sheet className="bg-opacityBackground">
              <SheetTrigger className="focus:outline-none">
                <div className="bg-white px-3 py-2 rounded-sm border border-gray-500 hover:border-hoverOrange">
                  <Badge badgeContent={numberOfStore} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </div>
              </SheetTrigger>

              <SheetContent side={'right'} className="md:w-[500px] w-full">
                <Cart />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
