export const beautifyAddress = (
  address: string | null | undefined,
  start: number,
  end: number
) => {
  let first = address?.substring(0, start);
  let second = address?.substring(address.length - end, address.length);
  return first + "..." + second;
};
