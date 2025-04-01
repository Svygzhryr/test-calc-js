import { Dispatch } from "react";

export interface Fix {
  type: string;
  name: string;
  unit: string;
  price: number;
}

export interface Plate {
  type: string;
  name: string;
  material: string;
  unit: string;
  width: number;
  price: number;
}

export interface Pipe {
  type: string;
  name: string;
  unit: string;
  width: number;
  price: number;
}

export interface Durability {
  type: string;
  key: string;
  name: string;
  step: number;
}

export type Part = Plate | Pipe | Fix;
export type Data = Part[];

export interface CustomInputProps {
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

export interface DropdownProps {
  value: Part | null;
  setValue: Dispatch<React.SetStateAction<Part | null>>;
  placeholder: string;
  data: Plate[] | null;
}
