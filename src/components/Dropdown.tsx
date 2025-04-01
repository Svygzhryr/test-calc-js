import { FC, MouseEvent, useEffect, useState } from "react";
import { DropdownProps } from "../types";

const Dropdown: FC<DropdownProps> = ({
  value,
  setValue,
  placeholder,
  data,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleInputFocus = () => {
    setIsActive(true);
  };

  const handleButtonClick = (e: MouseEvent, item: typeof value) => {
    e.preventDefault();

    setIsActive(false);

    setValue(item);
  };

  return (
    <div>
      <input
        className="w-full focus:outline-none hover:cursor-pointer hover:border-main-100 border-2 border-main-0 transition-all p-2 placeholder:text-main-text hover:placeholder:text-main-100 focus:placeholder:text-main-100"
        onFocus={handleInputFocus}
        placeholder={placeholder}
        value={value ? value.name : placeholder}
      />
      {isActive && (
        <ul className="absolute z-2 max-h-40 border-2 border-main-0 bg-main-900 overflow-auto">
          {data
            ? data.map((item) => (
                <li className="text-left pl-2 hover:bg-main-400">
                  <button onClick={(e) => handleButtonClick(e, item)}>
                    {item.name}
                  </button>
                </li>
              ))
            : "Loading.."}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
