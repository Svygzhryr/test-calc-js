import { useEffect, useState } from "react";

import { Config, Data, Durability, Pipe, Plate, Result } from "./types";

import getData from "./utils/api";
import { configUrl, dataUrl } from "./utils/constants";
import Output from "./components/Output";
import Input from "./components/Input";

function App() {
  const [data, setData] = useState<Data | null>(null);
  const [config, setConfig] = useState<Config | null>(null);

  const [plate, setPlate] = useState<Plate | null>(null);
  const [pipe, setPipe] = useState<Pipe | null>(null);
  const [frameWidth, setFrameWidth] = useState(0);
  const [frameLength, setFrameLength] = useState(0);
  const [durability, setDurability] = useState<Durability | null>(null);

  const [result, setResult] = useState<Result | null>(null);

  const inputProps = {
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
        <Input {...inputProps} />
        <Output result={result} />
      </main>
    </>
  );
}

export default App;
