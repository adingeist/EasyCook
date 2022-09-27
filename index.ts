import {
  AllMassTypes,
  AllVolumeTypes,
  getUnitMeasuringType,
  Measurement,
} from './convert';
import { change, getLabelUnit } from './change';

export type { Nutrients } from './change';
export type { Measurement } from './convert';

const convert = (qty: number, unit: AllVolumeTypes | AllMassTypes) =>
  new Measurement(qty, unit);

export const EasyCook = {
  convert,
  change,
  getUnitMeasuringType,
  getLabelUnit,
};
