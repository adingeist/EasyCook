import { getUnitMeasuringType, Measurement } from './convert';
import { change } from './change';
import { AllMassTypes, AllVolumeTypes } from 'easy-cook';

const convert = (qty: number, unit: AllVolumeTypes | AllMassTypes) =>
  new Measurement(qty, unit);

const EasyCook = {
  convert,
  change,
  getUnitMeasuringType,
};

export default EasyCook;
