import type { Variant, OptionWithValues, OptionWithValue } from "@utils/types/shopify";

export const findOptionIndexCaseInsensitive = (option: string, optionsWithValues: OptionWithValues[]) => optionsWithValues.findIndex(
  optionWithValues => optionWithValues.name.toLowerCase() === option.toLowerCase()
);

export const findVariantByOptions = (variants: Variant[], optionsWithValue: (OptionWithValue | undefined)[]) => {
  const variant = variants.find((variant) => {
    return optionsWithValue.every(optionWithValue => {
      if (optionWithValue === undefined) { return false; }
      return variant.options[optionWithValue.position - 1] === optionWithValue.value;
    });
  });
  return variant;
};

export const getSelectedOptions = (
  optionsWithValues: OptionWithValues[],
  selectedOptions: Record<string, OptionWithValue | undefined> = {}
): Record<string, OptionWithValue | undefined> => {
  return optionsWithValues.reduce(
    (acc, option) => {
      if (option.name.toLowerCase() === "color") {
        return {
          ...acc,
          [option.name]: {
            name: option.name,
            position: option.position,
            value: option.values[0] // should be one color per product
          }
        };
      }

      return {
        ...acc,
        [option.name]: selectedOptions[option.name]
      };
    },
    {}
  );
};
