import { advantageItems, styles } from '@/util/constant';
import React from 'react';

export default function Advantages() {
  return (
    <div className="bg-white pt-[50px] pb-[100px]">
      <div className={`${styles.pageContainer} flex flex-col gap-10`}>
        <div className="md:px-[50px] ">
          <h2 className="md:text-[30px] md:mb-3 mb-5 font-bold font-opensans text-textBlack leading-[32px] text-[24px]">
            {advantageItems.title}
          </h2>
          <p className="text-[13px] leading-[20px] font-opensans text-grayColor">
            {advantageItems.describtionOfComponent}
          </p>
        </div>

        <div className="flex gap-[25px] items-center flex-col md:flex-row">
          {advantageItems.data.map((items) => {
            return (
              <div
                key={items.id}
                className="border-[0.5px] border-hoverGray rounded-[10px] hover:border-black delay-75 duration-500 ease-linear md:p-[30px] flex flex-col items-start p-[20px]"
              >
                <span>{items.logo}</span>

                <h3
                  className="mt-[25px] mb-[15px] text-[20px] font-bold
									 leading-[20px] font-opensans text-black"
                >
                  {items.paraph}
                </h3>
                <p className="text-[13px] leading-[20px] font-opensans text-grayColor">
                  {items.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
