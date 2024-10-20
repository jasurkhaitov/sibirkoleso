import { PaymentData } from '@/util/data'
import React from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

export default function InformationPage() {
  return (
    <div className="w-full mx-auto p-6">
      {PaymentData.contentData.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{section.title}</h2>
          {section.content.map((paragraph, paraIndex) => (
            <p key={paraIndex} className="text-sm mb-2">
              {paragraph}
            </p>
          ))}
        </div>
      ))}

      <div className="return-instructions mt-6">
        <h2 className="text-xl font-bold mb-4">Возврат дисков</h2>
        {PaymentData.contentData[2].content.map((instruction, index) => (
          <p key={index} className="flex items-start gap-2 mb-2 text-sm">
            <IoMdCheckmarkCircleOutline className="text-green-500" />
            {instruction}
          </p>
        ))}
      </div>
    </div>
  );
}