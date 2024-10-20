import { styles } from '@/util/constant';
import React, { useEffect, useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [contactMethod, setContactMethod] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmitRequest = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.priceValue * item.quantity,
    0
  );

  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="bg-gray-100">
      <div className={`p-8 min-h-screen ${styles.pageContainer}`}>
        <h1 className="text-3xl font-bold mb-6 px-5">Оформление заказа</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-xl font-semibold mb-4">Детали клиента</h2>

            <form className="space-y-5" onSubmit={handleSubmitRequest}>
              <div className="flex items-center border-b border-gray-300 pb-2">
                <FaUser className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Фамилия"
                  className="w-full bg-transparent outline-none"
                />
              </div>

              <div className="flex items-center border-b border-gray-300 pb-2">
                <FaUser className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Имя"
                  className="w-full bg-transparent outline-none"
                />
              </div>

              <div className="flex items-center border-b border-gray-300 pb-2">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent outline-none"
                />
              </div>

              <div className="flex items-center border-b border-gray-300 pb-2">
                <FaPhone className="text-gray-400 mr-3" />
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  className="w-full bg-transparent outline-none"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-gray-600">
                  Telegram или Whatsapp:
                </label>

                <div className="flex gap-5">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="telegram"
                      checked={contactMethod === 'telegram'}
                      onChange={(e) => setContactMethod(e.target.value)}
                      className="mr-2"
                    />
                    <FaTelegram className="text-gray-500 mr-2" /> Telegram
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="whatsapp"
                      checked={contactMethod === 'whatsapp'}
                      onChange={(e) => setContactMethod(e.target.value)}
                      className="mr-2"
                    />
                    <FaWhatsapp className="text-gray-500 mr-2" /> Whatsapp
                  </label>
                </div>

                {contactMethod && (
                  <div className="flex items-center border-b border-gray-300 pb-2 mt-4">
                    <FaPhone className="text-gray-400 mr-3" />
                    <input
                      type="tel"
                      placeholder={`Номер телефона для ${
                        contactMethod === 'telegram' ? 'Telegram' : 'Whatsapp'
                      }`}
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-5">
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition"
                >
                  Оставить заявку
                </button>

                <a
                  href="https://wa.me/9988880751610"
                  className="w-full flex items-center justify-center gap-1 border text-center border-orange-600 text-orange-600 py-3 rounded-md transition"
                >
                  <FaUser className="text-orange-600 md:mr-3" />
                  Mенеджером
                </a>
              </div>
            </form>
          </div>

          <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-xl font-semibold mb-4">Ваши товары</h2>

            <ul className="space-y-4 itemScroll overflow-y-scroll h-[300px] px-5">
              {cartItems.length === 0 ? (
                <p>Корзина пуста</p>
              ) : (
                cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between border-b border-gray-300"
                  >
                    <div>
                      <p className="font-semibold">{item.brand}</p>
                      <p className="text-gray-500">{item.type}</p>
                      <p className="text-gray-500">{item.quantity} шт.</p>
                    </div>
                    <p>{item.priceValue * item.quantity} ₽</p>
                  </li>
                ))
              )}
            </ul>

            <div className="border-t mt-4 pt-4 flex justify-between font-bold">
              <p>Итог:</p>
              <p>{totalPrice} ₽</p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="text-[20px] text-center font-semibold tracking-wide mb-3 leading-[20px] text-green-700 font-mono border-l-[5px] border-green-600 bg-green-300 p-3 rounded">
              *Ваша заявка принята
            </p>
            <p className="text-md mb-4">Пожалуйста, ждите звонка менеджера !</p>
            <button
              onClick={closeModal}
              className="bg-orange-600 text-white py-2 px-5 rounded-md hover:bg-orange-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
