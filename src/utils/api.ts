import { Data } from "../types";

const getData = async (url: string): Promise<Data | null> => {
  try {
    const result = await fetch(url);
    return result.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default getData;
