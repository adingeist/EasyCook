export type LongVolumeTypes =
  | 'liter'
  | 'milliliter'
  | 'nip'
  | 'smidgen'
  | 'pinch'
  | 'dash'
  | 'tad'
  | 'teaspoon'
  | 'tablespoon'
  | 'fluid ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon';

export type AllVolumeTypes =
  | 'liter'
  | 'liters'
  | 'l'
  | 'L'
  | 'milliliter'
  | 'milliliters'
  | 'mL'
  | 'nip'
  | 'nips'
  | 'drop'
  | 'drops'
  | 'smidgen'
  | 'smidgens'
  | 'shake'
  | 'shakes'
  | 'pinch'
  | 'pinches'
  | 'dash'
  | 'dashes'
  | 'tad'
  | 'tads'
  | 'teaspoon'
  | 'teaspoons'
  | 'tsp'
  | 't'
  | 'tablespoon'
  | 'tablespoons'
  | 'tbs'
  | 'tbsp'
  | 'T'
  | 'TB'
  | 'fluid ounce'
  | 'fluid ounces'
  | 'fl oz'
  | 'cup'
  | 'cups'
  | 'C'
  | 'c'
  | 'pint'
  | 'pints'
  | 'pt'
  | 'quart'
  | 'quarts'
  | 'qt'
  | 'gallon'
  | 'gallons'
  | 'gal';

export type LongMassTypes = 'gram' | 'kilogram' | 'ounce' | 'pound';

export type AllMassTypes =
  | 'gram'
  | 'grams'
  | 'g'
  | 'kilogram'
  | 'kilograms'
  | 'kg'
  | 'ounce'
  | 'ounces'
  | 'oz'
  | 'pound'
  | 'pounds'
  | 'lb'
  | '#';

export type VolumeTable = Record<
  LongVolumeTypes,
  Record<LongVolumeTypes, number>
>;

export type MassTable = Record<LongMassTypes, Record<LongMassTypes, number>>;
