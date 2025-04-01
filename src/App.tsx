import { FormEvent, useEffect, useState } from "react";

import { Config, ConfigItem, Data, Part, Pipe, Plate, Result } from "./types";

import CustomInput from "./components/CustomInput";
import Dropdown from "./components/Dropdown";
import getData from "./utils/api";
import {
  calculateArea,
  calculateCellSize,
  calculateFixAmount,
  calculatePipeAmount,
  calculatePlateAmount,
  calculateTotalPipeCost,
  calculateTotalFixCost,
  calculateTotalPlateCost,
} from "./utils/calculations";
import { configUrl, dataUrl } from "./utils/constants";

function App() {
  const [data, setData] = useState<Data | null>(null);
  const [config, setConfig] = useState<Config | null>(null);

  const [plate, setplate] = useState<Plate | null>(null);
  const [pipe, setPipe] = useState<Pipe | null>(null);
  const [frameWidth, setFrameWidth] = useState(0);
  const [frameLength, setFrameLength] = useState(0);
  const [durability, setDurability] = useState<Part | null>(null);

  const [result, setResult] = useState<Result | null>(null);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!plate || !pipe || !durability || !frameWidth || !frameLength) return;

    const totalArea = calculateArea(frameWidth, frameLength);
    const cellSize = calculateCellSize();

    const plateAmount = calculatePlateAmount(totalArea, plate.width);
    const totalPlateCost = calculateTotalPlateCost(
      plateAmount,
      plate.price as number
    );

    const result: Result = {
      names: {
        plate: plate.name,
        pipe: pipe.name,
        fix: "Саморез",
      },
      totalArea,
      cellSize,
      plateAmount,
      totalPlateCost,
      pipeAmount: calculatePipeAmount(),
      totalPipeCost: calculateTotalPipeCost(),
      fixAmount: calculateFixAmount(),
      totalFixCost: calculateTotalFixCost(),
    };

    setResult(result);
  };

  useEffect(() => {
    getData(dataUrl).then((data) => {
      setData(data as Data);
    });

    getData(configUrl).then((config) => {
      setConfig(config as Config);
    });
  }, []);

  return (
    <>
      <main className="w-full p-10 max-w-130 h-dvh m-auto bg-main-900">
        <section className="text-center mb-10">
          <h2 className="mb-4">Ввод</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 grid-rows-2 items-center gap-2">
              <Dropdown
                data={
                  data &&
                  data.filter((item): item is Plate => item.type === "list")
                }
                value={plate}
                setValue={setplate}
                placeholder="Листы..."
              />
              <Dropdown
                data={
                  data &&
                  data.filter((item): item is Pipe => item.type === "pipe")
                }
                value={pipe}
                setValue={setPipe}
                placeholder="Трубы..."
              />

              <div className="flex gap-1">
                <CustomInput
                  config={
                    config && config.find((item) => item.name === "Ширина")
                  }
                  value={frameWidth}
                  setValue={setFrameWidth}
                  placeholder="Ширина"
                />
                <CustomInput
                  config={
                    config && config.find((item) => item.name === "Длина")
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

        {result && (
          <section className="text-center">
            <h2 className="">Результат</h2>

            <h3>
              Площадь изделия - <strong>{result.totalArea}</strong> м
              <sup>2</sup>
            </h3>
            <h3>
              Расчетный размер ячейки - <strong>{result.cellSize}</strong>
            </h3>

            <table>
              <tbody>
                <tr>
                  <th>Наименование</th>
                  <th>ед.</th>
                  <th>кол-во</th>
                  <th>сумма</th>
                </tr>
                <tr>
                  <td>{result.names.plate}</td>
                  <td>
                    м<sup>2</sup>
                  </td>
                  <td>{result.plateAmount}</td>
                  <td>{result.totalPlateCost}</td>
                </tr>
                <tr>
                  <td>{result.names.pipe}</td>
                  <td>мп</td>
                  <td>{result.pipeAmount}</td>
                  <td>{result.totalPipeCost}</td>
                </tr>
                <tr>
                  <td>{result.names.fix}</td>
                  <td>шт</td>
                  <td>{result.fixAmount}</td>
                  <td>{result.totalFixCost}</td>
                </tr>
              </tbody>
            </table>

            <h3>Итого:</h3>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
