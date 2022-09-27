const NUTRIENT_DVS = {
  Calcium: 1300e-3, // 1300mg
  'Dietary Fiber': 28, // 28g
  Fat: 78, // 78g
  Magnesium: 420e-3, // 420mg
  Manganese: 2.3e-3, // 2.3mg
  Phosphorus: 1250e-3, // 1250mg
  Potassium: 4700e-3, // 4700mg
  'Vitamin A': 900e-6, // 900mcg
  'Vitamin C': 90e-3, // 90mg
  'Vitamin D': 20e-6, // 20mcg
  'Vitamin K': 120e-6, // 120mcg
  Biotin: 30e-6, // 30mcg
  Chloride: 2300e-3, // 2300mg
  Chromium: 35e-6, // 35mcg
  Copper: 0.9e-3, // 0.9mg
  'Folic Acid': 400e-6, // 400mcg
  Molybdenum: 45e-6, // 45mcg
  Niacin: 16e-3, // 16mg
  'Pantothenic Acid': 5e-3, // 5mg
  Riboflavin: 1.3e-3, // 1.3mg
  Selenium: 55e-6, // 55mcg
  Sodium: 2300e-3, // 2300mg
  Thiamin: 1.2e-3, // 1.2mg
  'Total carbohydrate': 275, // 275g
  'Vitamin B6': 1.7e-3, // 1.7mg
  'Vitamin B12': 2.4e-6, // 2.4mcg
  'Vitamin E': 15e-3, // 15mg
  Zinc: 11e-3, // 11mg
  Cholesterol: 300e-3, // 300mg
  Iodine: 150e-6, // 150mcg
  Iron: 18e-3, // 18mg
  Protein: 50, // 50g
  'Saturated Fat': 20, // 20g
  'Added Sugars': 50, // 50g
  Choline: 550e-3, // 550mg
};

type Nutrients = keyof typeof NUTRIENT_DVS;

export const change = (qty: number, nutrient: Nutrients) => {
  const toPercentDailyValue = () =>
    (qty / 100) * NUTRIENT_DVS[nutrient];

  const toGrams = () => (qty * 100) / NUTRIENT_DVS[nutrient];

  return {
    toPercentDailyValue,
    toGrams,
  };
};
