import _, { trim } from "lodash";
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
