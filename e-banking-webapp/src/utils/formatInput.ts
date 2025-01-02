export const handleInputChange = (
  value: string,
  setRawValue: (value: string) => void,
  onChange: (value: string) => void,
) => {
  const inputValue = value.replace(/,/g, '');
  if (/^\d*\.?\d*$/.test(inputValue)) {
    setRawValue(inputValue);
    onChange(inputValue);
  }
};
