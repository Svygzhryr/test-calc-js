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

export interface ConfigItem {
  type: string;
  key: string;
  name: string;
  min: number;
  max: number;
  step: number;
}

export type Part = Plate | Pipe | Fix;
export type Data = Part[];
export type Config = (ConfigItem | Durability)[];

export interface CustomInputProps {
  value: number;
  setValue: Dispatch<React.SetStateAction<number>>;
  placeholder: string;
  config: ConfigItem | undefined;
}
export interface DropdownProps<T> {
  value: T | null;
  setValue: Dispatch<React.SetStateAction<T | null>>;
  placeholder: string;
  data: T[] | null;
}

export interface DimensionConfig extends ConfigItem {
  name: "Ширина" | "Длина";
}

export type ResultNames = Record<string, string>;

export interface Result {
  names: ResultNames;
  totalArea: number;
  cellSize: number;
  plateAmount: number;
  totalPlateCost: number;
  pipeAmount: number;
  totalPipeCost: number;
  fixAmount: number;
  totalFixCost: number;
}
