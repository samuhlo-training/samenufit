import { ref, computed } from 'vue';

// Unit conversion types
export type WeightUnit = 'g' | 'kg' | 'oz' | 'lb';
export type VolumeUnit = 'ml' | 'l' | 'cup' | 'tbsp' | 'tsp' | 'fl-oz';
export type TemperatureUnit = 'C' | 'F';

export const useUnitConversions = () => {
  
  // Weight conversions (all to grams base)
  const weightConversions = {
    g: 1,
    kg: 1000,
    oz: 28.3495,
    lb: 453.592,
  };

  // Volume conversions (all to milliliters base)
  const volumeConversions = {
    ml: 1,
    l: 1000,
    cup: 236.588,
    tbsp: 14.7868,
    tsp: 4.92892,
    'fl-oz': 29.5735,
  };

  // Convert weight units
  const convertWeight = (
    value: number,
    fromUnit: WeightUnit,
    toUnit: WeightUnit
  ): number => {
    const grams = value * weightConversions[fromUnit];
    return parseFloat((grams / weightConversions[toUnit]).toFixed(3));
  };

  // Convert volume units
  const convertVolume = (
    value: number,
    fromUnit: VolumeUnit,
    toUnit: VolumeUnit
  ): number => {
    const milliliters = value * volumeConversions[fromUnit];
    return parseFloat((milliliters / volumeConversions[toUnit]).toFixed(3));
  };

  // Convert temperature
  const convertTemperature = (
    value: number,
    fromUnit: TemperatureUnit,
    toUnit: TemperatureUnit
  ): number => {
    if (fromUnit === toUnit) return value;
    
    if (fromUnit === 'C' && toUnit === 'F') {
      return parseFloat(((value * 9/5) + 32).toFixed(1));
    }
    
    if (fromUnit === 'F' && toUnit === 'C') {
      return parseFloat(((value - 32) * 5/9).toFixed(1));
    }
    
    return value;
  };

  // Common cooking conversions
  const commonConversions = {
    // Sugar conversions (approximate)
    sugarCupToGrams: (cups: number) => cups * 200,
    sugarGramsToCups: (grams: number) => parseFloat((grams / 200).toFixed(3)),
    
    // Flour conversions (approximate)
    flourCupToGrams: (cups: number) => cups * 125,
    flourGramsToCups: (grams: number) => parseFloat((grams / 125).toFixed(3)),
    
    // Butter conversions (approximate)
    butterCupToGrams: (cups: number) => cups * 227,
    butterGramsToCups: (grams: number) => parseFloat((grams / 227).toFixed(3)),
  };

  // Reactive converter state
  const converterState = ref({
    weightValue: 0,
    weightFromUnit: 'g' as WeightUnit,
    weightToUnit: 'kg' as WeightUnit,
    volumeValue: 0,
    volumeFromUnit: 'ml' as VolumeUnit,
    volumeToUnit: 'cup' as VolumeUnit,
    temperatureValue: 0,
    temperatureFromUnit: 'C' as TemperatureUnit,
    temperatureToUnit: 'F' as TemperatureUnit,
  });

  // Computed conversions
  const convertedWeight = computed(() =>
    convertWeight(
      converterState.value.weightValue,
      converterState.value.weightFromUnit,
      converterState.value.weightToUnit
    )
  );

  const convertedVolume = computed(() =>
    convertVolume(
      converterState.value.volumeValue,
      converterState.value.volumeFromUnit,
      converterState.value.volumeToUnit
    )
  );

  const convertedTemperature = computed(() =>
    convertTemperature(
      converterState.value.temperatureValue,
      converterState.value.temperatureFromUnit,
      converterState.value.temperatureToUnit
    )
  );

  // Get unit labels
  const getUnitLabel = (unit: string): string => {
    const labels: Record<string, string> = {
      g: 'gramos',
      kg: 'kilogramos',
      oz: 'onzas',
      lb: 'libras',
      ml: 'mililitros',
      l: 'litros',
      cup: 'tazas',
      tbsp: 'cucharadas',
      tsp: 'cucharaditas',
      'fl-oz': 'onzas fluidas',
      C: 'Celsius',
      F: 'Fahrenheit',
    };
    return labels[unit] || unit;
  };

  return {
    // Basic conversions
    convertWeight,
    convertVolume,
    convertTemperature,
    
    // Common cooking conversions
    commonConversions,
    
    // Reactive state
    converterState,
    convertedWeight,
    convertedVolume,
    convertedTemperature,
    
    // Utilities
    getUnitLabel,
    
    // Available units
    weightUnits: Object.keys(weightConversions) as WeightUnit[],
    volumeUnits: Object.keys(volumeConversions) as VolumeUnit[],
    temperatureUnits: ['C', 'F'] as TemperatureUnit[],
  };
};