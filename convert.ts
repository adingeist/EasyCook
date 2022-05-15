import {
  AllMassTypes,
  AllVolumeTypes,
  LongMassTypes,
  LongVolumeTypes,
} from 'easy-cook';
import { MASS_RATIOS, VOLUME_RATIOS } from './conversionTables';

const NAME_MAPS: Record<
  AllVolumeTypes | AllMassTypes,
  LongVolumeTypes | LongMassTypes
> = {
  liter: 'liter',
  liters: 'liter',
  l: 'liter',
  L: 'liter',
  milliliter: 'milliliter',
  milliliters: 'milliliter',
  mL: 'milliliter',
  nip: 'nip',
  nips: 'nip',
  drop: 'nip',
  drops: 'nip',
  smidgen: 'smidgen',
  smidgens: 'smidgen',
  shake: 'smidgen',
  shakes: 'smidgen',
  pinch: 'pinch',
  pinches: 'pinch',
  dash: 'dash',
  dashes: 'dash',
  tad: 'tad',
  tads: 'tad',
  teaspoon: 'teaspoon',
  teaspoons: 'teaspoon',
  tsp: 'teaspoon',
  t: 'teaspoon',
  tablespoon: 'tablespoon',
  tablespoons: 'tablespoon',
  tbs: 'tablespoon',
  tbsp: 'tablespoon',
  T: 'tablespoon',
  TB: 'tablespoon',
  'fluid ounce': 'fluid ounce',
  'fluid ounces': 'fluid ounce',
  'fl oz': 'fluid ounce',
  cup: 'cup',
  cups: 'cup',
  C: 'cup',
  c: 'cup',
  pint: 'cup',
  pints: 'cup',
  pt: 'cup',
  quart: 'quart',
  quarts: 'quart',
  qt: 'quart',
  gallon: 'gallon',
  gallons: 'gallon',
  gal: 'gallon',

  gram: 'gram',
  grams: 'gram',
  g: 'gram',
  kilogram: 'kilogram',
  kilograms: 'kilogram',
  kg: 'kilogram',
  ounce: 'ounce',
  ounces: 'ounce',
  oz: 'ounce',
  pound: 'pound',
  pounds: 'pound',
  lb: 'pound',
  '#': 'pound',
};

const getFullUnitName = (
  unit: AllVolumeTypes | AllMassTypes
): LongMassTypes | LongVolumeTypes => {
  return NAME_MAPS[unit];
};

export const getUnitMeasuringType = (
  unitAbv: AllVolumeTypes | AllMassTypes
): 'volume' | 'mass' => {
  const unit = getFullUnitName(unitAbv);

  const volUnits = [
    'liter',
    'milliliter',
    'nip',
    'smidgen',
    'pinch',
    'dash',
    'tad',
    'teaspoon',
    'tablespoon',
    'fluid ounce',
    'cup',
    'pint',
    'quart',
    'gallon',
  ];

  const massUnits = ['gram', 'kilogram', 'ounce', 'pound'];

  if (volUnits.includes(unitAbv)) return 'volume';
  else if (massUnits.includes(unitAbv)) return 'mass';
  else throw new Error(`Unexpected unit, ${unit}`);
};

const ingredient = {
  units: [
    { unit: 'g', mass: 1 },
    { unit: 'bar', mass: 60 },
    { unit: 'box', mass: 240 },
  ],
};

export class Measurement {
  private qty: number;
  private unit: LongVolumeTypes | LongMassTypes;
  private density: number | undefined; //  g / mL

  constructor(qty: number, unit: AllVolumeTypes | AllMassTypes) {
    this.qty = qty;
    this.unit = getFullUnitName(unit);
  }

  withDensity(
    mass: number,
    massUnit: AllMassTypes,
    volume: number,
    volumeUnit: AllVolumeTypes
  ) {
    if (getUnitMeasuringType(massUnit) !== 'mass')
      throw new Error(`Mass unit ${massUnit} can't measure mass.`);

    if (getUnitMeasuringType(volumeUnit) !== 'volume')
      throw new Error(`Mass unit ${volumeUnit} can't measure volume.`);

    const convert = (qty: number, unit: AllVolumeTypes | AllMassTypes) =>
      new Measurement(qty, unit);

    this.density =
      convert(mass, massUnit).to('g') / convert(volume, volumeUnit).to('mL');

    return this;
  }

  to(targetUnitAbv: AllVolumeTypes | AllMassTypes) {
    const targetUnit = getFullUnitName(targetUnitAbv);

    const unitMeasure = getUnitMeasuringType(this.unit);
    const targetMeasure = getUnitMeasuringType(targetUnit);

    if (unitMeasure === 'volume' && targetMeasure == 'volume') {
      // 'volume' --> 'volume'
      return (
        this.qty *
        VOLUME_RATIOS[this.unit as LongVolumeTypes][
          targetUnit as LongVolumeTypes
        ]
      );
    } else if (unitMeasure === 'mass' && targetMeasure === 'mass') {
      // 'mass' --> 'mass'
      return (
        this.qty *
        MASS_RATIOS[this.unit as LongMassTypes][targetUnit as LongMassTypes]
      );
    } else if (
      // 'mass' --> 'volume' : can be solved with density
      this.density &&
      unitMeasure === 'mass' &&
      targetMeasure === 'volume'
    ) {
      const unitInGrams =
        this.qty * MASS_RATIOS[this.unit as LongMassTypes].gram; // g
      const qtyInMl = unitInGrams / this.density; // g / (g/mL)  = mL
      return qtyInMl * VOLUME_RATIOS.milliliter[targetUnit as LongVolumeTypes]; // mL * (mL/tsp)
    } else if (
      // 'mass' --> 'volume' : can be solved with density
      this.density &&
      unitMeasure === 'volume' &&
      targetMeasure === 'mass'
    ) {
      const unitInMl =
        this.qty * VOLUME_RATIOS[this.unit as LongVolumeTypes].milliliter;
      const qtyInG = unitInMl * this.density;
      return qtyInG * MASS_RATIOS.gram[targetUnit as LongMassTypes];
    } else if (
      !this.density &&
      ((unitMeasure === 'mass' && targetMeasure === 'volume') ||
        (unitMeasure === 'volume' && targetMeasure === 'mass'))
    ) {
      // 'mass / volume' --> 'volume / mass' : Can't be solved! No density!
      throw new Error(
        `Can't convert from ${unitMeasure} and ${targetMeasure} because density was never set.
         If the density of the object is known call convert().withDensity().to()`
      );
    } else {
      return 0;
    }
  }
}
