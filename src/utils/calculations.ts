const calculateArea = (width: number, length: number): number =>
  +(width * length).toFixed(2);

const calculateCellSize = () => {
  return 0;
};

const calculatePlateAmount = (totalArea: number, plateWidth: number) => {
  const plateLength = 1;

  return Math.ceil(totalArea / (plateLength * plateWidth));
};

const calculateTotalPlateCost = (quantity: number, cost: number) => {
  return +(quantity * cost).toFixed(2);
};

const calculatePipeAmount = () => {
  return 0;
};

const calculateTotalPipeCost = () => {
  return 0;
};

const calculateFixAmount = () => {
  return 0;
};

const calculateTotalFixCost = () => {
  return 0;
};

export {
  calculateArea,
  calculateCellSize,
  calculateFixAmount,
  calculatePipeAmount,
  calculatePlateAmount,
  calculateTotalFixCost,
  calculateTotalPipeCost,
  calculateTotalPlateCost,
};
