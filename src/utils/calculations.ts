import { Config } from "../types";

export const calculateArea = (width: number, length: number): number => {
  return width * length;
};

export const calculateCellSize = (durabilityStep: number): number => {
  return durabilityStep;
};

export const calculatePlateAmount = (
  totalArea: number,
  plateWidth: number
): number => {
  const plateArea = plateWidth * 1;
  return Math.ceil(totalArea / plateArea);
};

export const calculatePipeAmount = (
  frameWidth: number,
  frameLength: number,
  cellSize: number,
  pipeWidthMm: number
): number => {
  const pipeWidthM = pipeWidthMm / 1000;

  const pipesAlongWidth = Math.ceil(frameWidth / (cellSize + pipeWidthM)) + 1;
  const lengthAlongWidth = pipesAlongWidth * frameLength;

  const pipesAlongLength = Math.ceil(frameLength / (cellSize + pipeWidthM)) + 1;
  const lengthAlongLength = pipesAlongLength * frameWidth;

  return lengthAlongWidth + lengthAlongLength;
};

export const calculateFixAmount = (
  totalArea: number,
  plateMaterial: string,
  config: Config
): number => {
  const fixConfig = config.find(
    (item) => item.type === "fix" && item.key === plateMaterial
  );
  const screwsPerSqM =
    fixConfig && "value" in fixConfig ? (fixConfig.value as number) : 0;

  return Math.ceil(totalArea * screwsPerSqM);
};

export const calculateTotalPlateCost = (
  amount: number,
  price: number
): number => {
  return amount * price;
};

export const calculateTotalPipeCost = (
  amount: number,
  price: number
): number => {
  return amount * price;
};

export const calculateTotalFixCost = (
  amount: number,
  price: number
): number => {
  return amount * price;
};
