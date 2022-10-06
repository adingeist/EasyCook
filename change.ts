const NUTRIENT_DVS = {
  'Added Sugars': 50, // 50g
  'Dietary Fiber': 28, // 28g
  'Folic Acid': 400e-6, // 400mcg
  'Pantothenic Acid': 5e-3, // 5mg
  'Saturated Fat': 20, // 20g
  'Trans Fat': 0, // 0g
  'Monounsaturated Fat': 0, // 0g
  'Polyunsaturated Fat': 0, // 0g
  'Total Carbohydrates': 275, // 275g
  'Vitamin A': 900e-6, // 900mcg
  'Vitamin B12': 2.4e-6, // 2.4mcg
  'Vitamin B6': 1.7e-3, // 1.7mg
  'Vitamin C': 90e-3, // 90mg
  'Vitamin D': 20e-6, // 20mcg
  'Vitamin E': 15e-3, // 15mg
  'Vitamin K': 120e-6, // 120mcg
  'Total Sugars': -1, // not given by FDA
  'Sugar Alcohols': -1, // not given by FDA
  Calories: 2000, // 2000 kcal
  Caffeine: 400e-3, // 400 mg
  Biotin: 30e-6, // 30mcg
  Calcium: 1300e-3, // 1300mg
  Chloride: 2300e-3, // 2300mg
  Cholesterol: 300e-3, // 300mg
  Choline: 550e-3, // 550mg
  Chromium: 35e-6, // 35mcg
  Copper: 0.9e-3, // 0.9mg
  Fat: 78, // 78g
  Iodine: 150e-6, // 150mcg
  Iron: 18e-3, // 18mg
  Magnesium: 420e-3, // 420mg
  Manganese: 2.3e-3, // 2.3mg
  Molybdenum: 45e-6, // 45mcg
  Niacin: 16e-3, // 16mg
  Phosphorus: 1250e-3, // 1250mg
  Potassium: 4700e-3, // 4700mg
  Protein: 50, // 50g
  Riboflavin: 1.3e-3, // 1.3mg
  Selenium: 55e-6, // 55mcg
  Sodium: 2300e-3, // 2300mg
  Thiamin: 1.2e-3, // 1.2mg
  Zinc: 11e-3, // 11mg
};

const NUTRIENT_UNITS: Record<Nutrients, number> = {
  Calcium: 1e-3, // mg
  'Dietary Fiber': 1, // g
  Fat: 1, // g
  Magnesium: 1e-3, // mg
  Manganese: 1e-3, // mg
  Phosphorus: 1e-3, // mg
  Potassium: 1e-3, // mg
  'Vitamin A': 1e-6, // mcg
  'Vitamin C': 1e-3, // mg
  'Vitamin D': 1e-6, // mcg
  'Vitamin K': 1e-6, // mcg
  Biotin: 1e-6, // mcg
  Chloride: 1e-3, // mg
  Chromium: 1e-6, // mcg
  Copper: 1e-3, // mg
  'Folic Acid': 1e-6, // mcg
  Molybdenum: 1e-6, // mcg
  Niacin: 1e-3, // mg
  'Pantothenic Acid': 1e-3, // mg
  Riboflavin: 1e-3, // mg
  Selenium: 1e-6, // mcg
  Sodium: 1e-3, // mg
  Thiamin: 1e-3, // mg
  'Total Carbohydrates': 1, // 275g
  'Vitamin B6': 1e-3, // mg
  'Vitamin B12': 1e-6, // mcg
  'Vitamin E': 1e-3, // mg
  Zinc: 1e-3, // mg
  Cholesterol: 1e-3, // mg
  Iodine: 1e-6, // mcg
  Iron: 1e-3, // mg
  Protein: 1, // g
  'Saturated Fat': 1, // g
  'Added Sugars': 1, // g
  Choline: 1e-3, // mg
  Caffeine: 1e-3, // mg
  Calories: 1, // kcal
  'Trans Fat': 1, // g
  'Monounsaturated Fat': 1, // g
  'Polyunsaturated Fat': 1, // g
  'Sugar Alcohols': 1, // g
  'Total Sugars': 1, // g
};

export const getLabelUnit = (nutrient: Nutrients) => {
  switch (nutrient) {
    case 'Calories':
      return 'kcal';

    default:
      break;
  }

  switch (NUTRIENT_UNITS[nutrient]) {
    case 1:
      return 'g';
    case 1e-3:
      return 'mg';
    case 1e-6:
      return 'μg';
    default:
      return '';
  }
};

export type Nutrients = keyof typeof NUTRIENT_DVS;

const gramsToPercentDV = (grams: number, nutrient: Nutrients) => {
  if (NUTRIENT_DVS[nutrient] === 0) {
    return 100;
  }
  return (grams * 100) / NUTRIENT_DVS[nutrient];
};

const percentDVToGrams = (percent: number, nutrient: Nutrients) =>
  Math.round((percent / 100) * NUTRIENT_DVS[nutrient]);

const gramsToLabelUnit = (grams: number, nutrient: Nutrients) => {
  return grams / NUTRIENT_UNITS[nutrient];
};

const percentToLabelUnit = (percent: number, nutrient: Nutrients) =>
  percentDVToGrams(percent, nutrient) / NUTRIENT_UNITS[nutrient];

const labelUnitToGrams = (
  labelUnitQty: number,
  nutrient: Nutrients
) => labelUnitQty * NUTRIENT_UNITS[nutrient];

const labelUnitToPercentDV = (
  labelUnitQty: number,
  nutrient: Nutrients
) => {
  const grams = labelUnitToGrams(labelUnitQty, nutrient);
  return Math.round(gramsToPercentDV(grams, nutrient));
};

export const change = (qty: number) => ({
  percentDV: (nutrient: Nutrients) => ({
    toGrams: () => percentDVToGrams(qty, nutrient),
    toLabelUnit: () => percentToLabelUnit(qty, nutrient),
  }),

  labelUnit: (nutrient: Nutrients) => ({
    toPercentDV: () => labelUnitToPercentDV(qty, nutrient),
    toGrams: () => labelUnitToGrams(qty, nutrient),
  }),

  grams: (nutrient: Nutrients) => ({
    toPercentDV: () => gramsToPercentDV(qty, nutrient),
    toLabelUnit: () => gramsToLabelUnit(qty, nutrient),
  }),
});
