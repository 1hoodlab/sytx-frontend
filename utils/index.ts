import _, { find, reject, trim } from "lodash";
import second, { split } from "lodash";
export const beautifyAddress = (
  address: string | null | undefined,
  start: number,
  end: number
) => {
  let first = address?.substring(0, start);
  let second = address?.substring(address.length - end, address.length);
  return first + "..." + second;
};

export function transformEvent(event: string) {
  const pattern = /^(\w+)\s*?\(\s*([^)]+?)\s*\)/i;
  let regexValue = pattern.exec(event);
  if (regexValue) {
    let functionName = regexValue[1];
    let paramRaws = regexValue[2].split(",");
    let params = _.map(paramRaws, trim);
    return {
      name: functionName,
      params: params,
    };
  }
  return undefined;
}

export const STORAGE_KEY = "sytx_storage";

export function insertDataStorage(key: string, value: string) {
  let currentData;
  let currentDataRaw = localStorage.getItem(STORAGE_KEY);
  if (!currentDataRaw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ [key]: value }]));
  } else {
    currentData = JSON.parse(currentDataRaw);
    console.log(currentData);
    console.log(find(currentData, key));
    if (find(currentData, key)) currentData = reject(currentData, key);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...currentData, { [key]: value }])
    );
  }
}
export function getDataStorage() {
  let currentDataRaw = localStorage.getItem(STORAGE_KEY);
  if (!currentDataRaw) return [];
  const currentData = JSON.parse(currentDataRaw)
  
}
