# EasyCook

A cooking utility library that easily lets you convert between cooking units.

# Installation

```shell
npm i easy-cook
```

# Usage

### EasyCook reads like English!

Supports singular, plural, and abbreviation forms of units.

```javascript
const EasyCook = require('easy-cook');

console.log(EasyCook.convert(3, 'tsp').to('tbsp')); // 1
console.log(EasyCook.convert(2, 'cups').to('mL')); // 473.176473
console.log(EasyCook.convert(1, 'pint').to('cups')); // 1
console.log(EasyCook.convert(5, 'liters').to('kilograms')); // ERROR! Density required.
```

### Converts bidirectionally between mass and volume.

```javascript
console.log(
  EasyCook.convert(1, 'cup').withDensity(0.87, 'g', 1, 'mL').to('g')
); // 205.831765755

console.log(
  EasyCook.convert(1, 'g')
    .withDensity(2, 'kilogram', 3, 'liter')
    .to('mL')
); // 1.5
```

### Check if an ingredient is used for measuring mass, volume, or something else...

```javascript
console.log(EasyCook.getUnitMeasuringType('mL')); // 'volume'
console.log(EasyCook.getUnitMeasuringType('teaspoon')); // 'volume'

console.log(EasyCook.getUnitMeasuringType('gram')); // 'mass'
console.log(EasyCook.getUnitMeasuringType('#')); // 'mass'

console.log(EasyCook.getUnitMeasuringType('box')); // 'unknown'
console.log(EasyCook.getUnitMeasuringType('cans')); // 'unknown'
```
