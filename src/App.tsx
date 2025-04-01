import { useEffect, useState } from "react";
import CustomInput from "./components/CustomInput";
import Dropdown from "./components/Dropdown";
import getData from "./utils/api";
import { configUrl, dataUrl } from "./utils/constants";
import { Data, Durability, Pipe, Plate } from "./types";

function App() {
  const [data, setData] = useState<Data | null>(null);
  // const [config, setConfig] = useState<Data | null>(null);

  const [plateMaterial, setPlateMaterial] = useState<Plate | null>(null);
  const [pipe, setPipe] = useState<Pipe | null>(null);
  const [frameWidth, setFrameWidth] = useState("");
  const [frameLength, setFrameLength] = useState("");
  const [durability, setDurability] = useState<Durability | null>(null);

  const handleFormSubmit = () => {};

  useEffect(() => {
    getData(dataUrl).then((data) => {
      setData(data);
    });

    // getData(configUrl).then((config) => {
    // setConfig(config);
    // });
  }, []);

  return (
    <>
      <main className="w-full p-10 max-w-130 h-dvh m-auto bg-main-900">
        <section className="text-center mb-50">
          <h2 className="mb-4">Ввод</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 grid-rows-2 items-center gap-2">
              <Dropdown
                data={data && data.filter((item) => item.type === "list")}
                value={plateMaterial}
                setValue={setPlateMaterial}
                placeholder="Листы..."
              />
              <Dropdown
                data={data && data.filter((item) => item.type === "pipe")}
                value={pipe}
                setValue={setPipe}
                placeholder="Трубы..."
              />

              <div className="flex gap-1">
                <CustomInput
                  value={frameWidth}
                  setValue={setFrameWidth}
                  placeholder="Ширина"
                />
                <CustomInput
                  value={frameLength}
                  setValue={setFrameLength}
                  placeholder="Длина"
                />
              </div>

              <Dropdown
                data={data}
                value={durability}
                setValue={setDurability}
                placeholder="Прочность..."
              />
            </div>

            <button className="mt-4 px-4 py-2 bg-main-700 hover:cursor-pointer hover:bg-main-400 transition-all">
              Рассчитать
            </button>
          </form>
        </section>

        <section className="text-center">
          <h2 className="">Результат</h2>
        </section>
      </main>
    </>
  );
}

export default App;
