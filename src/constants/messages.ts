/**
 * Messages de validation et d'erreur pour l'application
 */

export const WORKOUT_MESSAGES = {
  // Messages d'erreur de validation
  ERRORS: {
    NO_EXERCISE: 'Veuillez sélectionner un exercice',
    INVALID_SETS: 'Veuillez saisir un nombre de séries valide (> 0)',
    INVALID_REPS: 'Veuillez saisir un nombre de répétitions valide (> 0)',
    INVALID_WEIGHT: 'Veuillez saisir un poids valide (> 0) ou décocher "Avec poids"',
    ADD_FAILED: "Impossible d'ajouter l'exercice",
    LOAD_FAILED: 'Impossible de charger les données',
  },

  // Messages de succès
  SUCCESS: {
    WORKOUT_ADDED: 'Exercice ajouté à votre séance !',
  },

  // Labels et titres
  LABELS: {
    DATE_SECTION: 'Date de la séance',
    PREVIOUS_DAY: '← Jour précédent',
    TODAY: "Aujourd'hui",
    NEXT_DAY: 'Jour suivant →',
    ADD_EXERCISE: '+ Ajouter un exercice',
    EXERCISES_COUNT: 'Exercices du jour',
    NO_EXERCISES: 'Aucun exercice enregistré',
    NO_EXERCISES_SUBTITLE: 'Ajoutez votre premier exercice pour cette journée !',
    SUMMARY_TITLE: 'Résumé de la séance',
    MODAL_TITLE: 'Ajouter un exercice',
    SELECT_EXERCISE: 'Choisir un exercice :',
    EXERCISE_SELECTED: '✓ Exercice sélectionné:',
    WITH_WEIGHT: 'Avec poids ?',
    SUBMIT: 'Ajouter à la séance',
  },

  // Labels de formulaire
  FORM: {
    SETS: 'Séries *',
    REPS: 'Répétitions *',
    WEIGHT: 'Poids (kg) *',
    PLACEHOLDER_SETS: '3',
    PLACEHOLDER_REPS: '12',
    PLACEHOLDER_WEIGHT: '50',
  },

  // Labels pour le résumé
  SUMMARY: {
    EXERCISES: 'Exercices',
    SETS: 'Séries',
    REPS: 'Répétitions',
  },
};
