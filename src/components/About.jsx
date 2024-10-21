import React from 'react';
import AboutImage from '../assets/img/about.webp';
import { styles } from '@/util/constant';
import { aboutData, settings } from '@/util/data';

export default function About() {
  return (
    <div className={`${styles.pageContainer} mt-4`}>
      <hr className="border mb-5  w-[16%] md:w-[6%] border-tt border-black md:mb-12" />

      <h2 className="text-lg mt-10 md:text-3xl font-bold mb-6">О компании</h2>

      <p className="mb-6 md:mt-10 text-xs text-gray-600 md:w-[70%] md:m-auto md:text-sm">
        {aboutData.descriptionOne}
      </p>

      <div className="grid grid-cols-1 md:mt-10 md:grid-cols-2 gap-5 w-full xl:w-[90%] m-auto">
        {aboutData.content.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-white p-6 border border-gray-300 rounded-sm  cursor-pointer"
            >
              <h2 className="text-md md:text-lg font-semibold mb-4">
                {item.title}
              </h2>
              <p className="text-xs md:text-sm">{item.desc}</p>
            </div>
          );
        })}
      </div>

      <p className="mb-6 mt-6 md:mt-10 text-xs text-gray-600 md:w-[70%] md:m-auto  md:text-sm">
        {aboutData.descriptionTwo}
      </p>

      <div className="md:flex grid md:mb-[150px] mb-12 h-auto md:flex-row md:justify-center md:my-6">
        <div className="md:w-[75%] flex justify-center">
          <img
            src={AboutImage}
            alt="Store Interior"
            className="md:w-[900px] md:h-[500px] rounded-xl"
          />
        </div>

        <div className="md:w-[400px] border border-gray-400 rounded-md bg-white md:bg-gray-50 p-5 md:p-7 flex flex-col md:absolute right-24 md:mt-96 mt-10 justify-center items-start">
          <hr className="border h-auto w-[100%] border-tt border-gray-300 md:mb-7 mb-5" />
          <p className="mb-4 text-xs md:text-sm text-gray-700">
            Мы всегда готовы выслушать ваши пожелания и замечания по работе
            нашего магазина, для этого вам нужно позвонить по телефону:
          </p>
          <a
            href={`tel:+${settings.phoneNumber}`}
            className="text-[18px] leading-[25px] font-bold text-textBlack hover:text-hoverOrange"
          >
            {settings.phoneNumberText}
          </a>
          <p className="text-xs md:text-xs  text-gray-600">
            (звонок бесплатный)
          </p>
        </div>
      </div>
    </div>
  );
}
