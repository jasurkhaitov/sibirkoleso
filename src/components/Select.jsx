import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";

const Select = ({ name, options, onChange, resetTrigger }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null);

  useEffect(() => {
    setSelectedOptions([]);
  }, [resetTrigger]);

  const handleSelect = (option) => {
    let updatedSelections;

    if (selectedOptions.includes(option)) {
      updatedSelections = selectedOptions.filter((item) => item !== option);
    } else {
      updatedSelections = [...selectedOptions, option];
    }

    setSelectedOptions(updatedSelections);
    onChange(updatedSelections, name);
  };

  return (
    <div className="w-full bg-white border h-[300px] mb-5 overflow-auto rounded-b-md ">
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            className={`flex items-center text-[#666666] py-4 cursor-pointer ${
              selectedOptions.includes(option)
                ? "bg-[#FF5200] hover:bg-[#ff7636]"
                : "hover:bg-[#e1e1e1]"
            }`}
            onClick={() => handleSelect(option)}
            onMouseEnter={() => setHoveredOption(option)}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <label
              htmlFor={`${name}-${option}`}
              className="text-[13px] ml-3 cursor-pointer flex-grow"
            >
              {option}
            </label>
            {selectedOptions.includes(option) && (
              hoveredOption === option ? (
                <RxCross1 size={16} className="text-white mr-2 font-normal" />
              ) : (
                <FaCheck size={16} className="text-white mr-2 font-normal" />
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;