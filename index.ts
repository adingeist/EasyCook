import { getUnitMeasuringType, Measurement } from './convert';
import { AllMassTypes, AllVolumeTypes } from 'easy-cook';

const convert = (qty: number, unit: AllVolumeTypes | AllMassTypes) =>
  new Measurement(qty, unit);

export default {
  convert,
  getUnitMeasuringType,
};
