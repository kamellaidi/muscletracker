// Base de données des exercices de musculation
// Source: Docteur Fitness (https://www.docteur-fitness.com)

export interface ExerciseCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Exercise {
  id: string;
  name: string;
  group: string;
  category: 'strength' | 'cardio';
  equipment?: string;
  infoUrl?: string; // URL vers la page détaillée de l'exercice
}

// Catégories de groupes musculaires avec couleurs distinctes
export const MUSCLE_GROUPS: ExerciseCategory[] = [
  { id: 'epaules', name: 'Épaules', icon: '💪', color: '#FF6B6B' },
  { id: 'pectoraux', name: 'Pectoraux', icon: '💪', color: '#4ECDC4' },
  { id: 'dos', name: 'Dos', icon: '💪', color: '#45B7D1' },
  { id: 'biceps', name: 'Biceps', icon: '💪', color: '#96CEB4' },
  { id: 'triceps', name: 'Triceps', icon: '💪', color: '#FFEAA7' },
  { id: 'abdominaux', name: 'Abdominaux', icon: '🔥', color: '#DFE6E9' },
  { id: 'quadriceps', name: 'Quadriceps', icon: '🦵', color: '#74B9FF' },
  { id: 'ischios', name: 'Ischio-jambiers', icon: '🦵', color: '#A29BFE' },
  { id: 'fessiers', name: 'Fessiers', icon: '🍑', color: '#FD79A8' },
  { id: 'mollets', name: 'Mollets', icon: '🦵', color: '#FDCB6E' },
];

// Base de données complète des exercices
export const EXERCISES_DATABASE: Exercise[] = [
  // ============================================
  // ÉPAULES (43 exercices disponibles sur le site)
  // ============================================
  {
    id: 'ex_epaules_1',
    name: 'Développé militaire',
    group: 'Épaules',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/developpe-militaire'
  },
  {
    id: 'ex_epaules_2',
    name: 'Développé Arnold',
    group: 'Épaules',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/developpe-arnold'
  },
  {
    id: 'ex_epaules_3',
    name: 'Élévations latérales',
    group: 'Épaules',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/elevations-laterales'
  },
  {
    id: 'ex_epaules_4',
    name: 'Élévations frontales',
    group: 'Épaules',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/elevations-frontales'
  },
  {
    id: 'ex_epaules_5',
    name: 'Face pull',
    group: 'Épaules',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/face-pull'
  },
  {
    id: 'ex_epaules_6',
    name: 'Développé épaules avec haltères',
    group: 'Épaules',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/developpe-epaules-avec-halteres'
  },
  {
    id: 'ex_epaules_7',
    name: 'Presse à épaules inclinée',
    group: 'Épaules',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/presse-a-epaules-inclinee'
  },
  {
    id: 'ex_epaules_8',
    name: 'Oiseau (élévations buste penché)',
    group: 'Épaules',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/oiseau-assis-sur-un-banc'
  },
  {
    id: 'ex_epaules_9',
    name: 'Pec deck inversé',
    group: 'Épaules',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/pec-deck-inverse'
  },
  {
    id: 'ex_epaules_10',
    name: 'Pompes piquées (Pike push-up)',
    group: 'Épaules',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/pompes-piquees'
  },
  {
    id: 'ex_epaules_11',
    name: 'Handstand push-up',
    group: 'Épaules',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/handstand-push-up'
  },
  {
    id: 'ex_epaules_12',
    name: 'Élévations latérales à la poulie',
    group: 'Épaules',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/elevations-laterales-a-la-poulie'
  },
  {
    id: 'ex_epaules_13',
    name: 'Développé épaules à la machine',
    group: 'Épaules',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/developpe-epaules-a-la-machine'
  },
  {
    id: 'ex_epaules_14',
    name: 'Rotation externe épaule (coiffe)',
    group: 'Épaules',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/rotation-externe-de-lepaule-a-la-poulie'
  },

  // ============================================
  // PECTORAUX
  // ============================================
  {
    id: 'ex_pecto_1',
    name: 'Développé couché',
    group: 'Pectoraux',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/comment-faire-developpe-couche'
  },
  {
    id: 'ex_pecto_2',
    name: 'Pompes',
    group: 'Pectoraux',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/pourquoi-devrait-on-faire-des-pompes-plus-souvent'
  },
  {
    id: 'ex_pecto_3',
    name: 'Développé incliné haltères',
    group: 'Pectoraux',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-pectoraux'
  },
  {
    id: 'ex_pecto_4',
    name: 'Écarté couché haltères',
    group: 'Pectoraux',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-pectoraux'
  },
  {
    id: 'ex_pecto_5',
    name: 'Dips',
    group: 'Pectoraux',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-pectoraux'
  },
  {
    id: 'ex_pecto_6',
    name: 'Pull-over',
    group: 'Pectoraux',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-pectoraux'
  },
  {
    id: 'ex_pecto_7',
    name: 'Pec deck (Butterfly)',
    group: 'Pectoraux',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-pectoraux'
  },
  {
    id: 'ex_pecto_8',
    name: 'Développé incliné barre',
    group: 'Pectoraux',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-pectoraux'
  },
  {
    id: 'ex_pecto_9',
    name: 'Écarté à la poulie vis-à-vis',
    group: 'Pectoraux',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/exercices-pectoraux'
  },
  {
    id: 'ex_pecto_10',
    name: 'Pompes inclinées',
    group: 'Pectoraux',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-pectoraux'
  },

  // ============================================
  // DOS
  // ============================================
  {
    id: 'ex_dos_1',
    name: 'Tractions',
    group: 'Dos',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/traction'
  },
  {
    id: 'ex_dos_2',
    name: 'Soulevé de terre',
    group: 'Dos',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/souleve-de-terre'
  },
  {
    id: 'ex_dos_3',
    name: 'Rowing barre',
    group: 'Dos',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-dos'
  },
  {
    id: 'ex_dos_4',
    name: 'Tirage vertical',
    group: 'Dos',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/exercices-dos'
  },
  {
    id: 'ex_dos_5',
    name: 'Rowing haltère unilatéral',
    group: 'Dos',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-dos'
  },
  {
    id: 'ex_dos_6',
    name: 'Tirage horizontal',
    group: 'Dos',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/exercices-dos'
  },
  {
    id: 'ex_dos_7',
    name: 'Pull-over poulie',
    group: 'Dos',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/exercices-dos'
  },
  {
    id: 'ex_dos_8',
    name: 'Rowing machine',
    group: 'Dos',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-dos'
  },
  {
    id: 'ex_dos_9',
    name: 'Face pull',
    group: 'Dos',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/face-pull'
  },
  {
    id: 'ex_dos_10',
    name: 'Shrugs (haussements épaules)',
    group: 'Dos',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-dos'
  },

  // ============================================
  // BICEPS
  // ============================================
  {
    id: 'ex_biceps_1',
    name: 'Curl barre',
    group: 'Biceps',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-biceps'
  },
  {
    id: 'ex_biceps_2',
    name: 'Curl haltères',
    group: 'Biceps',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-biceps'
  },
  {
    id: 'ex_biceps_3',
    name: 'Curl marteau',
    group: 'Biceps',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-biceps'
  },
  {
    id: 'ex_biceps_4',
    name: 'Curl pupitre (Larry Scott)',
    group: 'Biceps',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-biceps'
  },
  {
    id: 'ex_biceps_5',
    name: 'Curl à la poulie basse',
    group: 'Biceps',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/exercices-biceps'
  },
  {
    id: 'ex_biceps_6',
    name: 'Curl incliné haltères',
    group: 'Biceps',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-biceps'
  },
  {
    id: 'ex_biceps_7',
    name: 'Curl concentré',
    group: 'Biceps',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-biceps'
  },
  {
    id: 'ex_biceps_8',
    name: 'Curl barre EZ',
    group: 'Biceps',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-biceps'
  },

  // ============================================
  // TRICEPS
  // ============================================
  {
    id: 'ex_triceps_1',
    name: 'Dips',
    group: 'Triceps',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-triceps'
  },
  {
    id: 'ex_triceps_2',
    name: 'Extension triceps poulie haute',
    group: 'Triceps',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/exercices-triceps'
  },
  {
    id: 'ex_triceps_3',
    name: 'Extension nuque haltère',
    group: 'Triceps',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-triceps'
  },
  {
    id: 'ex_triceps_4',
    name: 'Barre au front',
    group: 'Triceps',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-triceps'
  },
  {
    id: 'ex_triceps_5',
    name: 'Kickback haltères',
    group: 'Triceps',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-triceps'
  },
  {
    id: 'ex_triceps_6',
    name: 'Développé couché prise serrée',
    group: 'Triceps',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-triceps'
  },
  {
    id: 'ex_triceps_7',
    name: 'Extension triceps à la corde',
    group: 'Triceps',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/exercices-triceps'
  },
  {
    id: 'ex_triceps_8',
    name: 'Pompes diamant',
    group: 'Triceps',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-triceps'
  },

  // ============================================
  // ABDOMINAUX
  // ============================================
  {
    id: 'ex_abdos_1',
    name: 'Crunch au sol',
    group: 'Abdominaux',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/crunch-au-sol'
  },
  {
    id: 'ex_abdos_2',
    name: 'Planche (gainage)',
    group: 'Abdominaux',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-abdominaux'
  },
  {
    id: 'ex_abdos_3',
    name: 'Relevé de jambes suspendu',
    group: 'Abdominaux',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-abdominaux'
  },
  {
    id: 'ex_abdos_4',
    name: 'Russian twist',
    group: 'Abdominaux',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-abdominaux'
  },
  {
    id: 'ex_abdos_5',
    name: 'Mountain climbers',
    group: 'Abdominaux',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-abdominaux'
  },
  {
    id: 'ex_abdos_6',
    name: 'Crunch à la poulie',
    group: 'Abdominaux',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/exercices-abdominaux'
  },
  {
    id: 'ex_abdos_7',
    name: 'Planche latérale',
    group: 'Abdominaux',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-abdominaux'
  },
  {
    id: 'ex_abdos_8',
    name: 'Relevé de jambes au sol',
    group: 'Abdominaux',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-abdominaux'
  },
  {
    id: 'ex_abdos_9',
    name: 'Ab wheel (roue abdominale)',
    group: 'Abdominaux',
    category: 'strength',
    equipment: 'materiel',
    infoUrl: 'https://www.docteur-fitness.com/exercices-abdominaux'
  },
  {
    id: 'ex_abdos_10',
    name: 'Bicycle crunch',
    group: 'Abdominaux',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-abdominaux'
  },

  // ============================================
  // QUADRICEPS
  // ============================================
  {
    id: 'ex_quadri_1',
    name: 'Squat',
    group: 'Quadriceps',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/squat'
  },
  {
    id: 'ex_quadri_2',
    name: 'Presse à cuisses',
    group: 'Quadriceps',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-quadriceps'
  },
  {
    id: 'ex_quadri_3',
    name: 'Leg extension',
    group: 'Quadriceps',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-quadriceps'
  },
  {
    id: 'ex_quadri_4',
    name: 'Fentes avant',
    group: 'Quadriceps',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-quadriceps'
  },
  {
    id: 'ex_quadri_5',
    name: 'Front squat',
    group: 'Quadriceps',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-quadriceps'
  },
  {
    id: 'ex_quadri_6',
    name: 'Hack squat',
    group: 'Quadriceps',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-quadriceps'
  },
  {
    id: 'ex_quadri_7',
    name: 'Squat bulgare',
    group: 'Quadriceps',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-quadriceps'
  },
  {
    id: 'ex_quadri_8',
    name: 'Squat sumo',
    group: 'Quadriceps',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-quadriceps'
  },
  {
    id: 'ex_quadri_9',
    name: 'Sissy squat',
    group: 'Quadriceps',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-quadriceps'
  },
  {
    id: 'ex_quadri_10',
    name: 'Step-up',
    group: 'Quadriceps',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-quadriceps'
  },

  // ============================================
  // ISCHIO-JAMBIERS
  // ============================================
  {
    id: 'ex_ischios_1',
    name: 'Soulevé de terre',
    group: 'Ischio-jambiers',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/souleve-de-terre'
  },
  {
    id: 'ex_ischios_2',
    name: 'Leg curl couché',
    group: 'Ischio-jambiers',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-ischio-jambiers'
  },
  {
    id: 'ex_ischios_3',
    name: 'Leg curl assis',
    group: 'Ischio-jambiers',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-ischio-jambiers'
  },
  {
    id: 'ex_ischios_4',
    name: 'Soulevé de terre roumain',
    group: 'Ischio-jambiers',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-ischio-jambiers'
  },
  {
    id: 'ex_ischios_5',
    name: 'Good morning',
    group: 'Ischio-jambiers',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-ischio-jambiers'
  },
  {
    id: 'ex_ischios_6',
    name: 'Nordic curl',
    group: 'Ischio-jambiers',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-ischio-jambiers'
  },
  {
    id: 'ex_ischios_7',
    name: 'Leg curl debout',
    group: 'Ischio-jambiers',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-ischio-jambiers'
  },
  {
    id: 'ex_ischios_8',
    name: 'Soulevé de terre jambes tendues',
    group: 'Ischio-jambiers',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-ischio-jambiers'
  },

  // ============================================
  // FESSIERS
  // ============================================
  {
    id: 'ex_fessiers_1',
    name: 'Hip thrust',
    group: 'Fessiers',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-fessiers'
  },
  {
    id: 'ex_fessiers_2',
    name: 'Squat sumo',
    group: 'Fessiers',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-fessiers'
  },
  {
    id: 'ex_fessiers_3',
    name: 'Fentes arrière',
    group: 'Fessiers',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-fessiers'
  },
  {
    id: 'ex_fessiers_4',
    name: 'Kickback à la poulie',
    group: 'Fessiers',
    category: 'strength',
    equipment: 'poulie',
    infoUrl: 'https://www.docteur-fitness.com/exercices-fessiers'
  },
  {
    id: 'ex_fessiers_5',
    name: 'Abduction hanche machine',
    group: 'Fessiers',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-fessiers'
  },
  {
    id: 'ex_fessiers_6',
    name: 'Pont fessier',
    group: 'Fessiers',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-fessiers'
  },
  {
    id: 'ex_fessiers_7',
    name: 'Donkey kicks',
    group: 'Fessiers',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-fessiers'
  },
  {
    id: 'ex_fessiers_8',
    name: 'Fire hydrant',
    group: 'Fessiers',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-fessiers'
  },
  {
    id: 'ex_fessiers_9',
    name: 'Squat bulgare',
    group: 'Fessiers',
    category: 'strength',
    equipment: 'halteres',
    infoUrl: 'https://www.docteur-fitness.com/exercices-fessiers'
  },

  // ============================================
  // MOLLETS
  // ============================================
  {
    id: 'ex_mollets_1',
    name: 'Extension mollets debout barre',
    group: 'Mollets',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-mollets'
  },
  {
    id: 'ex_mollets_2',
    name: 'Extension mollets à la barre debout',
    group: 'Mollets',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-mollets'
  },
  {
    id: 'ex_mollets_3',
    name: 'Extensions mollets assis avec barre',
    group: 'Mollets',
    category: 'strength',
    equipment: 'barre',
    infoUrl: 'https://www.docteur-fitness.com/exercices-mollets'
  },
  {
    id: 'ex_mollets_4',
    name: 'Élévations mollets au Donkey',
    group: 'Mollets',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-mollets'
  },
  {
    id: 'ex_mollets_5',
    name: 'Extensions mollets au hack-squat',
    group: 'Mollets',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-mollets'
  },
  {
    id: 'ex_mollets_6',
    name: 'Extension mollets assis Smith machine',
    group: 'Mollets',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-mollets'
  },
  {
    id: 'ex_mollets_7',
    name: 'Extensions mollets debout Smith machine',
    group: 'Mollets',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-mollets'
  },
  {
    id: 'ex_mollets_8',
    name: 'Élévations mollets debout machine',
    group: 'Mollets',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-mollets'
  },
  {
    id: 'ex_mollets_9',
    name: 'Extensions mollets sur marche',
    group: 'Mollets',
    category: 'strength',
    equipment: 'poids_corps',
    infoUrl: 'https://www.docteur-fitness.com/exercices-mollets'
  },
  {
    id: 'ex_mollets_10',
    name: 'Extension mollets assis machine',
    group: 'Mollets',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-mollets'
  },
  {
    id: 'ex_mollets_11',
    name: 'Extension mollets à la presse',
    group: 'Mollets',
    category: 'strength',
    equipment: 'machine',
    infoUrl: 'https://www.docteur-fitness.com/exercices-mollets'
  },
];

// Fonction helper pour obtenir les exercices par groupe
export const getExercisesByGroup = (groupId: string): Exercise[] => {
  const groupName = MUSCLE_GROUPS.find(g => g.id === groupId)?.name;
  if (!groupName) return [];
  return EXERCISES_DATABASE.filter(ex => ex.group === groupName);
};

// Fonction helper pour obtenir un groupe musculaire par ID
export const getMuscleGroupById = (groupId: string): ExerciseCategory | undefined => {
  return MUSCLE_GROUPS.find(g => g.id === groupId);
};

// Fonction helper pour obtenir un exercice par ID
export const getExerciseById = (exerciseId: string): Exercise | undefined => {
  return EXERCISES_DATABASE.find(ex => ex.id === exerciseId);
};

// Statistiques
export const DATABASE_STATS = {
  totalExercises: EXERCISES_DATABASE.length,
  exercicesByGroup: {
    epaules: getExercisesByGroup('epaules').length,
    pectoraux: getExercisesByGroup('pectoraux').length,
    dos: getExercisesByGroup('dos').length,
    biceps: getExercisesByGroup('biceps').length,
    triceps: getExercisesByGroup('triceps').length,
    abdominaux: getExercisesByGroup('abdominaux').length,
    quadriceps: getExercisesByGroup('quadriceps').length,
    ischios: getExercisesByGroup('ischios').length,
    fessiers: getExercisesByGroup('fessiers').length,
    mollets: getExercisesByGroup('mollets').length,
  },
  source: 'Docteur Fitness',
  lastUpdated: '2026-01-04',
};