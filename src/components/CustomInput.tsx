import { ChangeEvent, FC } from "react";
import { CustomInputProps } from "../types";

const CustomInput: FC<CustomInputProps> = ({
  value,
  setValue,
  placeholder,
}) => {
  const handleOnChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  return (
    <input
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
      className="w-1/2 border-main-0 border-solid border-2 p-2 focus:outline-none focus:border-main-200 focus:placeholder:text-main-100 transition-all placeholder:text-main-text"
    />
  );
};

export default CustomInput;
