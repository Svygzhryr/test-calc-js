import { MouseEvent, useState } from "react";
import { DropdownProps } from "../types";

const Dropdown = <T extends { name: string }>({
  value,
  setValue,
  placeholder,
  data,
}: DropdownProps<T>) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  const handleButtonClick = (e: MouseEvent, item: typeof value) => {
    e.preventDefault();

    setIsActive(false);

    setValue(item);
  };

  return (
    <div>
      <h3
        className="w-full focus:outline-none hover:cursor-pointer hover:border-main-100 border-2 border-main-0 transition-all p-2 placeholder:text-main-700 hover:placeholder:text-main-100 focus:placeholder:text-main-100"
        onClick={handleClick}
      >
        {value ? value.name : placeholder}
      </h3>
      {isActive && (
        <ul className="absolute z-2 max-h-40 border-2 border-main-0 bg-main-900 overflow-auto">
          {data
            ? data.map((item) => (
                <li
                  key={item.name}
                  className="text-left px-2 hover:bg-main-400"
                >
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
