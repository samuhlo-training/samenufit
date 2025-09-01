import type { Recipe, IngredientCategory } from './types';

// He creado una pequeña función de ayuda para asignar categorías y evitar la repetición
const getCategory = (name: string): IngredientCategory => {
  const lowerName = name.toLowerCase();
  if (
    lowerName.includes('carne') ||
    lowerName.includes('pollo') ||
    lowerName.includes('atún') ||
    lowerName.includes('bistec') ||
    lowerName.includes('ternera') ||
    lowerName.includes('gambas') ||
    lowerName.includes('langostinos') ||
    lowerName.includes('camarones') ||
    lowerName.includes('hamburguesa')
  )
    return 'Proteína';
  if (
    lowerName.includes('arroz') ||
    lowerName.includes('taco') ||
    lowerName.includes('wrap') ||
    lowerName.includes('patatas') ||
    lowerName.includes('pasta')
  )
    return 'Carbohidrato';
  if (
    lowerName.includes('calabacín') ||
    lowerName.includes('lechuga') ||
    lowerName.includes('calabaza')
  )
    return 'Verdura';
  if (
    lowerName.includes('aceite') ||
    lowerName.includes('mantequilla') ||
    lowerName.includes('aguacate')
  )
    return 'Grasa';
  if (lowerName.includes('leche') || lowerName.includes('yogur') || lowerName.includes('queso'))
    return 'Lacteos';
  return 'Otro';
};

export const initialRecipes: Recipe[] = [
  // --- Desayunos ---
  {
    id: 'tortilla-claras-tostadas',
    name: 'Tortilla de Claras con Tostadas',
    type: 'Desayuno',
    description:
      'Comida alta en proteínas, ideal para construir músculo y perder grasa, ofreciendo gran saciedad y un impulso al metabolismo.',
    instructions: [
      'Bate las claras y el huevo entero. Añade la leche si lo deseas.',
      'Rocía una sartén antiadherente con el aceite y calienta a fuego medio.',
      'Vierte la mezcla de huevo y cocina, doblando la tortilla para que quede esponjosa.',
      'Tuesta las rebanadas de pan.',
      'Una vez tostado el pan, puedes untar el queso bajo en grasa.',
      'Coloca la tortilla sobre las tostadas.',
      'Añade las especias y la cebolleta fresca por encima.',
    ],
    ingredients: [
      {
        id: 'claras-huevo',
        name: 'Claras de huevo',
        quantity: 7,
        unit: 'unidad(es)',
        category: getCategory('claras'),
      },
      {
        id: 'huevo-entero',
        name: 'Huevo entero',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('huevo'),
      },
      {
        id: 'pan-integral',
        name: 'Pan integral',
        quantity: 4,
        unit: 'unidad(es)',
        category: getCategory('pan'),
      },
      {
        id: 'queso-bajo-grasa',
        name: 'Queso bajo en grasa',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('queso'),
      }, // Cantidad estimada
      {
        id: 'cebolleta',
        name: 'Cebolleta',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('cebolleta'),
      },
    ],
    macros: { calories: 547, protein: 49, carbs: 54, fat: 15 },
  },
  {
    id: 'tostada-huevos-duros-atun',
    name: 'Tostada de Huevos Duros y Atún',
    type: 'Desayuno',
    description: 'Opción portátil, fácil de preparar y alta en proteínas.',
    instructions: [
      'Escurre bien el atún.',
      'Pela los huevos duros. Retira 3 de las 4 yemas para reducir la grasa.',
      'Pica las claras y el huevo entero.',
      'Combina el huevo picado, el atún, el yogur griego y la cebolleta. Mezcla hasta formar una pasta.',
      'Tuesta el pan y extiende la mezcla por encima.',
    ],
    ingredients: [
      {
        id: 'huevo-duro',
        name: 'Huevos duros',
        quantity: 4,
        unit: 'unidad(es)',
        category: getCategory('huevo'),
      },
      {
        id: 'atun-natural',
        name: 'Atún al natural',
        quantity: 50,
        unit: 'g',
        category: getCategory('atún'),
      },
      {
        id: 'yogur-griego-natural',
        name: 'Yogur griego natural sin grasa',
        quantity: 50,
        unit: 'g',
        category: getCategory('yogur'),
      },
      {
        id: 'pan-integral',
        name: 'Pan integral',
        quantity: 4,
        unit: 'unidad(es)',
        category: getCategory('pan'),
      },
    ],
    macros: { calories: 650, protein: 45, carbs: 68, fat: 20 },
  },
  {
    id: 'panqueques-proteina',
    name: 'Panqueques de Proteína',
    type: 'Desayuno',
    description: 'Desayuno dulce, rápido, alto en proteínas y bajo en grasas.',
    instructions: [
      'Combina todos los ingredientes en una licuadora hasta obtener una masa homogénea.',
      'Rocía una sartén con el aceite y cocina los panqueques a fuego medio.',
      'Sirve con los toppings que prefieras.',
    ],
    ingredients: [
      {
        id: 'claras-huevo',
        name: 'Claras de huevo',
        quantity: 250,
        unit: 'g',
        category: getCategory('claras'),
      },
      {
        id: 'proteina-polvo',
        name: 'Proteína en polvo',
        quantity: 35,
        unit: 'g',
        category: getCategory('proteína'),
      },
      {
        id: 'avena-copos',
        name: 'Copos de avena',
        quantity: 60,
        unit: 'g',
        category: getCategory('avena'),
      },
      {
        id: 'banana',
        name: 'Media banana',
        quantity: 0.5,
        unit: 'unidad(es)',
        category: getCategory('banana'),
      },
    ],
    macros: { calories: 603, protein: 58, carbs: 76, fat: 7 },
  },
  {
    id: 'batido-arandanos',
    name: 'Batido de Arándanos',
    type: 'Desayuno',
    description: 'Batido rápido y versátil para ajustar macros fácilmente.',
    instructions: [
      'Combina todos los ingredientes en una licuadora.',
      'Licúa hasta obtener una mezcla suave.',
    ],
    ingredients: [
      {
        id: 'arandanos',
        name: 'Arándanos',
        quantity: 100,
        unit: 'g',
        category: getCategory('arándanos'),
      },
      {
        id: 'leche-desnatada',
        name: 'Leche desnatada',
        quantity: 200,
        unit: 'ml',
        category: getCategory('leche'),
      },
      {
        id: 'proteina-polvo',
        name: 'Proteína en polvo',
        quantity: 50,
        unit: 'g',
        category: getCategory('proteína'),
      },
    ],
    macros: { calories: 316, protein: 50, carbs: 20, fat: 4 },
  },
  {
    id: 'avena-alta-proteinas',
    name: 'Avena Alta en Proteínas',
    type: 'Desayuno',
    description: 'Desayuno muy saciante, popular en el mundo del fitness.',
    instructions: [
      'Vierte la avena en un tazón y añade agua hasta cubrirla.',
      'Cocina en el microondas 3 minutos.',
      'Remueve, añade la leche y cocina 1 minuto más.',
      'Agrega la proteína en polvo y mezcla enérgicamente hasta que se integre.',
    ],
    ingredients: [
      {
        id: 'avena-copos',
        name: 'Copos de avena',
        quantity: 60,
        unit: 'g',
        category: getCategory('avena'),
      },
      {
        id: 'proteina-suero',
        name: 'Proteína de suero',
        quantity: 1.5,
        unit: 'unidad(es)',
        category: getCategory('proteína'),
      }, // Usando scoops como unidad
    ],
    macros: { calories: 470, protein: 51, carbs: 44, fat: 8.5 },
  },

  // --- Cenas ---
  {
    id: 'bolonesa-calabacin',
    name: 'Boloñesa de Calabacín',
    type: 'Cena',
    description: 'Cena baja en carbohidratos, alta en proteínas y muy voluminosa.',
    instructions: [
      'Sofríe las verduras opcionales (cebolla, pimiento).',
      'Añade la carne picada y cocina hasta que esté dorada.',
      'Incorpora la salsa de tomate y las especias. Cocina a fuego lento.',
      'Saltea los fideos de calabacín en una sartén aparte durante 2-3 minutos.',
      'Sirve la boloñesa sobre los fideos.',
    ],
    ingredients: [
      {
        id: 'fideos-calabacin',
        name: 'Fideos de calabacín',
        quantity: 1000,
        unit: 'g',
        category: getCategory('calabacín'),
      },
      {
        id: 'carne-picada-magra',
        name: 'Carne picada magra',
        quantity: 150,
        unit: 'g',
        category: getCategory('carne'),
      },
      {
        id: 'salsa-tomate-natural',
        name: 'Salsa de tomate natural',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('tomate'),
      },
    ],
    macros: { calories: 511, protein: 57, carbs: 37, fat: 15 },
  },
  {
    id: 'bistec-falsas-patatas',
    name: 'Bistec con "Falsas" Patatas Fritas',
    type: 'Cena',
    description: 'Comida saciante que no se siente como si estuvieras a dieta.',
    instructions: [
      'Corta las patatas en bastones. Sazónalas con especias y una mínima cantidad de aceite.',
      'Cocínalas en la freidora de aire hasta que estén doradas y crujientes.',
      'Sazona el bistec.',
      'Cocina el bistec a la plancha al punto deseado.',
    ],
    ingredients: [
      {
        id: 'ternera-magra',
        name: 'Corte magro de ternera',
        quantity: 250,
        unit: 'g',
        category: getCategory('ternera'),
      },
      {
        id: 'patata',
        name: 'Patatas',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('patata'),
      }, // Cantidad no especificada
      {
        id: 'salsa-bbq-sin-azucar',
        name: 'Salsa barbacoa sin azúcar',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('salsa'),
      },
    ],
    macros: { calories: 655, protein: 63, carbs: 58, fat: 11 },
  },
  {
    id: 'ensalada-pasta-camarones',
    name: 'Ensalada de Pasta y Camarones',
    type: 'Cena',
    description: 'Ensalada completa y versátil.',
    instructions: [
      'Cuece la pasta integral según las instrucciones y enfríala.',
      'Monta una base con las hojas verdes y el resto de vegetales cortados.',
      'Añade la pasta y los camarones.',
      'Prepara el aderezo mezclando sus ingredientes y aliña la ensalada.',
    ],
    ingredients: [
      {
        id: 'camarones-cocidos',
        name: 'Camarones cocidos',
        quantity: 100,
        unit: 'g',
        category: getCategory('camarones'),
      },
      {
        id: 'pasta-integral',
        name: 'Pasta integral',
        quantity: 65,
        unit: 'g',
        category: getCategory('pasta'),
      }, // Promedio de 60-70g
      {
        id: 'hojas-verdes',
        name: 'Base de hojas verdes',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('verdes'),
      },
      {
        id: 'tomates-cherry',
        name: 'Tomates cherry',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('tomate'),
      },
      {
        id: 'aderezo-yogur',
        name: 'Aderezo de yogur',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('yogur'),
      },
    ],
    macros: { calories: 500, protein: 30, carbs: 70, fat: 10 },
  },
  {
    id: 'tacos-altos-proteinas',
    name: 'Tacos Altos en Proteínas',
    type: 'Cena',
    description: 'Opción divertida, alta en proteínas y personalizable.',
    instructions: [
      'Cocina la carne picada. Añade el sazonador y un poco de salsa de tomate.',
      'Calienta las tortillas.',
      'Rellena cada tortilla con la carne y añade los vegetales frescos.',
      'Termina con la salsa de yogur.',
    ],
    ingredients: [
      {
        id: 'carne-picada-magra',
        name: 'Carne picada magra',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('carne'),
      }, // Cantidad no especificada
      {
        id: 'tortillas-maiz',
        name: 'Tortillas de maíz',
        quantity: 3,
        unit: 'unidad(es)',
        category: getCategory('tortilla'),
      },
      {
        id: 'lechuga',
        name: 'Lechuga',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('lechuga'),
      },
      {
        id: 'tomate',
        name: 'Tomate picado',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('tomate'),
      },
    ],
    macros: { calories: 522, protein: 54, carbs: 25, fat: 20 },
  },
  {
    id: 'lettuce-burger',
    name: 'Hamburguesa en Hoja de Lechuga',
    type: 'Cena',
    description: 'Hamburguesa sin pan, muy baja en carbohidratos.',
    instructions: [
      'Forma las hamburguesas con la carne y cocínalas a la plancha.',
      'Monta la hamburguesa usando las hojas de lechuga como si fueran el pan.',
    ],
    ingredients: [
      {
        id: 'carne-picada-95-5',
        name: 'Carne picada magra (95/5)',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('carne'),
      }, // Cantidad no especificada
      {
        id: 'queso-bajo-grasa',
        name: 'Queso bajo en grasa',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('queso'),
      },
      {
        id: 'lechuga-iceberg',
        name: 'Hojas de lechuga iceberg',
        quantity: 2,
        unit: 'unidad(es)',
        category: getCategory('lechuga'),
      },
    ],
    macros: { calories: 354, protein: 49, carbs: 5, fat: 14.5 },
  },

  // --- Almuerzos ---
  {
    id: 'beef-rice-bowl',
    name: 'Tazón de Arroz con Carne',
    type: 'Almuerzo',
    description: 'Comida base muy versátil para ajustar macros.',
    instructions: [
      'Cocina el arroz de tu elección.',
      'Sofríe la cebolla, añade la carne y cocina. Sazona con especias y la salsa.',
      'Combina todos los ingredientes en un tazón.',
    ],
    ingredients: [
      {
        id: 'arroz',
        name: 'Arroz blanco o integral',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('arroz'),
      }, // Cantidad no especificada
      {
        id: 'carne-picada-magra',
        name: 'Carne picada magra',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('carne'),
      },
      {
        id: 'cebolla',
        name: 'Cebolla',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('cebolla'),
      },
    ],
    macros: { calories: 594, protein: 51, carbs: 70, fat: 12 },
  },
  {
    id: 'dr-mikes-mac',
    name: 'La "Dr. Mike\'s Mac"',
    type: 'Almuerzo',
    description: 'Alternativa saludable a una hamburguesa tipo Big Mac.',
    instructions: [
      'Forma y cocina la hamburguesa.',
      'Tuesta ligeramente el pan.',
      'Monta la hamburguesa con todos los ingredientes.',
    ],
    ingredients: [
      {
        id: 'carne-picada-magra',
        name: 'Carne picada magra',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('carne'),
      },
      {
        id: 'pan-hamburguesa',
        name: 'Pan de hamburguesa integral',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('pan'),
      },
      {
        id: 'queso-bajo-grasa',
        name: 'Queso bajo en grasa',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('queso'),
      },
    ],
    macros: { calories: 483, protein: 46, carbs: 34, fat: 17 },
  },
  {
    id: 'wrap-pollo',
    name: 'Wrap de Pollo',
    type: 'Almuerzo',
    description: 'Opción fácil, ideal para preparar con antelación (meal prep).',
    instructions: [
      'Corta el pollo en tiras, sazona y cocina.',
      'Unta la tortilla con el queso crema o hummus.',
      'Añade las verduras y el pollo cocido.',
      'Enrolla el wrap.',
    ],
    ingredients: [
      {
        id: 'pechuga-pollo',
        name: 'Pechuga de pollo',
        quantity: 200,
        unit: 'g',
        category: getCategory('pollo'),
      },
      {
        id: 'tortilla-trigo-integral',
        name: 'Tortillas de trigo integral',
        quantity: 2,
        unit: 'unidad(es)',
        category: getCategory('tortilla'),
      },
      {
        id: 'queso-crema-light',
        name: 'Queso crema bajo en grasa',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('queso'),
      },
    ],
    macros: { calories: 587, protein: 54, carbs: 55, fat: 16 },
  },
  {
    id: 'ensalada-big-mac',
    name: 'Ensalada Big Mac',
    type: 'Almuerzo',
    description: 'Comida baja en carbohidratos con el sabor de una hamburguesa.',
    instructions: [
      'Cocina la carne picada.',
      'Prepara la base de ensalada con todos los vegetales.',
      'Añade la carne y el queso.',
      'Mezcla los ingredientes del aderezo y aliña.',
    ],
    ingredients: [
      {
        id: 'carne-picada-magra',
        name: 'Carne picada magra',
        quantity: 130,
        unit: 'g',
        category: getCategory('carne'),
      },
      {
        id: 'lechuga-iceberg',
        name: 'Base de lechuga iceberg',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('lechuga'),
      },
      {
        id: 'queso-bajo-grasa',
        name: 'Queso bajo en grasa en dados',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('queso'),
      },
    ],
    macros: { calories: 350, protein: 45, carbs: 18, fat: 17 }, // NOTE: Macros corregidos
  },
  {
    id: 'comida-calabaza-carne',
    name: 'Comida de Calabaza con Carne',
    type: 'Almuerzo',
    description: 'Comida alta en fibra y muy saciante.',
    instructions: [
      'Asa o cuece la calabaza hasta que esté tierna.',
      'Cocina el bistec a la plancha con la cebolla.',
      'Combina todo en un tazón.',
    ],
    ingredients: [
      {
        id: 'bistec-ternera',
        name: 'Bistec de ternera magra',
        quantity: 220,
        unit: 'g',
        category: getCategory('ternera'),
      },
      {
        id: 'calabaza',
        name: 'Calabaza asada o cocida',
        quantity: 600,
        unit: 'g',
        category: getCategory('calabaza'),
      },
    ],
    macros: { calories: 576, protein: 51, carbs: 80, fat: 5 }, // NOTE: Macros corregidos
  },
  // --- Snacks ---
  {
    id: 'postre-gelatina-yogur',
    name: 'Postre de Gelatina y Yogur',
    type: 'Snack',
    description: 'Postre dulce, saciante, bajo en calorías y alto en proteínas.',
    instructions: [
      'Prepara la gelatina y refrigera hasta que cuaje.',
      'Una vez lista, cubre con el yogur o queso batido.',
      'Añade las frutas por encima.',
    ],
    ingredients: [
      {
        id: 'gelatina-sin-azucar',
        name: 'Gelatina sin azúcar',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('gelatina'),
      },
      {
        id: 'yogur-griego-proteinas',
        name: 'Yogur griego alto en proteínas',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('yogur'),
      },
      { id: 'fresas', name: 'Fresas', quantity: 50, unit: 'g', category: getCategory('fresas') },
    ],
    macros: { calories: 177, protein: 23, carbs: 7, fat: 0.3 },
  },
  {
    id: 'tortilla-tortitas-arroz',
    name: 'Tortilla sobre Tortitas de Arroz',
    type: 'Snack',
    description: 'Snack salado, rápido y equilibrado.',
    instructions: [
      'Haz una tortilla con los huevos.',
      'Unta el queso sobre las tortitas de arroz.',
      'Coloca la tortilla encima y añade los toppings.',
    ],
    ingredients: [
      {
        id: 'claras-huevo',
        name: 'Claras de huevo',
        quantity: 3,
        unit: 'unidad(es)',
        category: getCategory('claras'),
      },
      {
        id: 'huevo-entero',
        name: 'Huevo entero',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('huevo'),
      },
      {
        id: 'tortitas-arroz-integral',
        name: 'Tortitas de arroz integral',
        quantity: 4,
        unit: 'unidad(es)',
        category: getCategory('arroz'),
      },
      {
        id: 'queso-fresco-untar',
        name: 'Queso fresco para untar bajo en grasa',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('queso'),
      },
    ],
    macros: { calories: 320, protein: 27, carbs: 30, fat: 10 },
  },
  {
    id: 'sandwich-tostadas-huevo',
    name: 'Sándwich de Tostadas con Huevo',
    type: 'Snack',
    description: 'Sándwich saludable, rápido y con un buen aporte de micronutrientes.',
    instructions: [
      'Haz una tortilla francesa con los huevos y las verduras picadas.',
      'Tuesta el pan.',
      'Monta el sándwich: unta el aguacate en una rebanada, añade el jamón, la tortilla y el queso.',
    ],
    ingredients: [
      {
        id: 'claras-huevo',
        name: 'Claras de huevo',
        quantity: 3,
        unit: 'unidad(es)',
        category: getCategory('claras'),
      },
      {
        id: 'huevo-entero',
        name: 'Huevo entero',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('huevo'),
      },
      {
        id: 'pan-integral',
        name: 'Pan integral',
        quantity: 2,
        unit: 'unidad(es)',
        category: getCategory('pan'),
      },
      {
        id: 'aguacate',
        name: 'Aguacate',
        quantity: 0.25,
        unit: 'unidad(es)',
        category: getCategory('aguacate'),
      },
      {
        id: 'jamon-serrano',
        name: 'Jamón serrano sin grasa',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('jamón'),
      },
    ],
    macros: { calories: 399, protein: 27, carbs: 38, fat: 13 },
  },
  {
    id: 'helado-proteinas-casero',
    name: 'Helado de Proteínas Casero',
    type: 'Snack',
    description: 'Helado saludable para satisfacer antojos.',
    instructions: [
      'Mezcla la leche y la proteína.',
      'Congela la mezcla (en una cubitera o en el recipiente de la máquina).',
      'Procesa en la máquina específica (Ninja Creami) o tritura con una batidora potente.',
    ],
    ingredients: [
      {
        id: 'leche-desnatada',
        name: 'Leche desnatada',
        quantity: 200,
        unit: 'ml',
        category: getCategory('leche'),
      },
      {
        id: 'proteina-polvo',
        name: 'Proteína en polvo',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('proteína'),
      }, // 1 scoop
    ],
    macros: { calories: 195, protein: 30, carbs: 12, fat: 3 },
  },
  {
    id: 'egg-bites',
    name: 'Bocaditos de Huevo (Egg Bites)',
    type: 'Snack',
    description: 'Snack proteico, bajo en carbohidratos, ideal para preparar en lote.',
    instructions: [
      'Mezcla todos los ingredientes (excepto el queso).',
      'Vierte la mezcla en los moldes de muffins previamente engrasados.',
      'Hornea o cocina en freidora de aire hasta que estén cuajados.',
    ],
    ingredients: [
      {
        id: 'claras-huevo',
        name: 'Claras de huevo',
        quantity: 5,
        unit: 'unidad(es)',
        category: getCategory('claras'),
      },
      {
        id: 'huevo-entero',
        name: 'Huevo entero',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('huevo'),
      },
      {
        id: 'jamon-pavo',
        name: 'Jamón de pavo o pollo en dados',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('pavo'),
      },
      {
        id: 'queso-bajo-grasa',
        name: 'Queso bajo en grasa',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('queso'),
      },
    ],
    macros: { calories: 298, protein: 40, carbs: 10, fat: 9 },
  },
  {
    id: 'nuggets-pollo-proteicos',
    name: 'Nuggets de Pollo Altos en Proteínas',
    type: 'Snack',
    description: 'Versión casera y saludable de los nuggets.',
    instructions: [
      'Mezcla el pollo molido con las especias y la mostaza.',
      'Forma los nuggets con las manos húmedas.',
      'Pasa cada nugget por el rebozado triturado.',
      'Cocina en la freidora de aire hasta que estén dorados y cocidos por dentro.',
    ],
    ingredients: [
      {
        id: 'pechuga-pollo-molida',
        name: 'Pechuga de pollo molida',
        quantity: 200,
        unit: 'g',
        category: getCategory('pollo'),
      },
      {
        id: 'copos-maiz-sin-azucar',
        name: 'Copos de maíz sin azúcar triturados',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('maíz'),
      },
      {
        id: 'mostaza-dijon',
        name: 'Mostaza de Dijon',
        quantity: 1,
        unit: 'unidad(es)',
        category: getCategory('mostaza'),
      },
    ],
    macros: { calories: 290, protein: 49, carbs: 18, fat: 3 },
  },
];
