import { getUnitMeasuringType, Measurement } from './convert';
import { change, getLabelUnit } from './change';
import { AllMassTypes, AllVolumeTypes } from 'easy-cook';

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
