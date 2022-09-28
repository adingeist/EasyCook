import {
  allMassTypes,
  AllMassTypes,
  allVolumeTypes,
  AllVolumeTypes,
  getUnitMeasuringType,
  Measurement,
} from './convert';
import { change, getLabelUnit } from './change';

export type { Nutrients } from './change';
export type {
  Measurement,
  AllMassTypes,
  AllVolumeTypes,
  LongMassTypes,
  LongVolumeTypes,
} from './convert';

const convert = (qty: number, unit: AllVolumeTypes | AllMassTypes) =>
  new Measurement(qty, unit);

export const EasyCook = {
  convert,
  change,
  getUnitMeasuringType,
  getLabelUnit,
  allVolumeTypes,
  allMassTypes,
};
