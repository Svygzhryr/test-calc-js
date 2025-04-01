import { FC, FormEvent } from "react";
import { Plate, Pipe, ConfigItem, Result, InputProps } from "../types";
import {
  calculateArea,
  calculateCellSize,
  calculatePlateAmount,
  calculateTotalPlateCost,
  calculatePipeAmount,
  calculateTotalPipeCost,
  calculateFixAmount,
  calculateTotalFixCost,
} from "../utils/calculations";
import CustomInput from "./CustomInput";
import Dropdown from "./Dropdown";

const Input: FC<InputProps> = ({ ...props }) => {
  const {
    data,
    config,
    plate,
    setPlate,
    pipe,
    setPipe,
    frameLength,
    setFrameLength,
    frameWidth,
    setFrameWidth,
    durability,
    setDurability,
    setResult,
  } = props;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!plate || !pipe || !durability || !frameWidth || !frameLength) return;

    const totalArea = calculateArea(frameWidth, frameLength);
    const cellSize = calculateCellSize(durability.step);
    const plateAmount = calculatePlateAmount(totalArea, plate.width);
    const totalPlateCost = calculateTotalPlateCost(plateAmount, plate.price);

    const pipeAmount = calculatePipeAmount(
      frameWidth,
      length,
      cellSize,
      pipe.width
    );
    const totalPipeCost = calculateTotalPipeCost(pipeAmount, pipe.price);

    const fixAmount = calculateFixAmount(totalArea, plate.material, config!);
    const fixPrice = data?.find((item) => item.type === "fix")?.price || 0;
    const totalFixCost = calculateTotalFixCost(fixAmount, fixPrice as number);

    const formattedCellSize = `${cellSize.toFixed(2)}х${cellSize.toFixed(2)}м`;

    const result: Result = {
      names: {
        plate: plate.name,
        pipe: pipe.name,
        fix: "Саморез",
      },
      totalArea,
      cellSize: formattedCellSize,
      plateAmount,
      totalPlateCost,
      pipeAmount,
      totalPipeCost,
      fixAmount,
      totalFixCost,
      totalCost: totalPlateCost + totalPipeCost + totalFixCost,
    };

    setResult(result);
  };

  return (
    <section className="text-center mb-10">
      <h2 className="mb-4">Ввод</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-2 grid-rows-2 items-center gap-2">
          <Dropdown
            data={
              data && data.filter((item): item is Plate => item.type === "list")
            }
            value={plate}
            setValue={setPlate}
            placeholder="Листы..."
          />
          <Dropdown
            data={
              data && data.filter((item): item is Pipe => item.type === "pipe")
            }
            value={pipe}
            setValue={setPipe}
            placeholder="Трубы..."
          />

          <div className="flex gap-1">
            <CustomInput
              config={
                (config &&
                  (config.find(
                    (item) => item.name === "Ширина"
                  ) as ConfigItem)) ||
                undefined
              }
              value={frameWidth}
              setValue={setFrameWidth}
              placeholder="Ширина"
            />
            <CustomInput
              config={
                (config &&
                  (config.find(
                    (item) => item.name === "Длина"
                  ) as ConfigItem)) ||
                undefined
              }
              value={frameLength}
              setValue={setFrameLength}
              placeholder="Длина"
            />
          </div>

          <Dropdown
            data={config && config.filter((item) => item.type === "frame")}
            value={durability}
            setValue={setDurability}
            placeholder="Прочность..."
          />
        </div>

        <button
          disabled={
            !plate || !pipe || !durability || !frameWidth || !frameLength
          }
          type="submit"
          className="mt-4 px-4 py-2 bg-main-700 hover:cursor-pointer hover:bg-main-400 transition-all disabled:pointer-events-none disabled:opacity-50"
        >
          Рассчитать
        </button>
      </form>
    </section>
  );
};

export default Input;
