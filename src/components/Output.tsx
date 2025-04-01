import { FC } from "react";
import { OutputProps } from "../types";

const Output: FC<OutputProps> = ({ result }) => {
  return (
    <>
      {result && (
        <section className="text-center">
          <h2 className="mb-4">Результат</h2>

          <div className="mb-4">
            <h3>
              Площадь изделия - <strong>{result.totalArea}</strong> м
              <sup>2</sup>
            </h3>
            <h3>
              Расчетный размер ячейки - <strong>{result.cellSize}</strong>
            </h3>
          </div>

          <table className="w-full max-w-md mx-auto border-collapse border border-main-50">
            <thead>
              <tr className="bg-main-600">
                <th className="border-2 border-main-50 p-2">Наименование</th>
                <th className="border-2 border-main-50 p-2">ед.</th>
                <th className="border-2 border-main-50 p-2">кол-во</th>
                <th className="border-2 border-main-50 p-2">сумма</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-main-50 p-2">
                  {result.names.plate}
                </td>
                <td className="border-2 border-main-50 p-2">
                  м<sup>2</sup>
                </td>
                <td className="border-2 border-main-50 p-2">
                  {result.plateAmount}
                </td>
                <td className="border-2 border-main-50 p-2">
                  {result.totalPlateCost.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="border-2 border-main-50 p-2">
                  {result.names.pipe}
                </td>
                <td className="border-2 border-main-50 p-2">мп</td>
                <td className="border-2 border-main-50 p-2">
                  {result.pipeAmount.toFixed(2)}
                </td>
                <td className="border-2 border-main-50 p-2">
                  {result.totalPipeCost.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="border-2 border-main-50 p-2">
                  {result.names.fix}
                </td>
                <td className="border-2 border-main-50 p-2">шт</td>
                <td className="border-2 border-main-50 p-2">
                  {result.fixAmount}
                </td>
                <td className="border-2 border-main-50 p-2">
                  {result.totalFixCost.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4">
            <h3 className="text-lg font-bold">
              Итого: {result.totalCost.toFixed(2)}.
            </h3>
          </div>
        </section>
      )}
    </>
  );
};

export default Output;
