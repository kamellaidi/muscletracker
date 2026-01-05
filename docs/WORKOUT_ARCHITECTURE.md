# Architecture de la page Workout

Ce document explique l'architecture refactorisée de la page de gestion des séances d'entraînement.

## Vue d'ensemble

La page Workout a été refactorisée pour améliorer :
- **Séparation des responsabilités** : Chaque composant a un rôle clairement défini
- **Réutilisabilité** : Les hooks et composants peuvent être réutilisés ailleurs
- **Maintenabilité** : Le code est mieux organisé et documenté
- **Performance** : Utilisation de `useMemo` et `useCallback` pour optimiser les rendus

## Structure des fichiers

```
muscletracker/
├── app/(tabs)/
│   └── workout.tsx                    # Page principale (orchestrateur)
├── src/
│   ├── components/
│   │   ├── workout/
│   │   │   ├── DateSelector.tsx       # Sélection et navigation de dates
│   │   │   ├── WorkoutSummary.tsx     # Résumé statistique de la séance
│   │   │   ├── WorkoutList.tsx        # Liste des exercices
│   │   │   └── WorkoutFormModal.tsx   # Modal d'ajout d'exercice
│   │   ├── Button.tsx                 # Composant bouton réutilisable
│   │   └── Input.tsx                  # Composant input réutilisable
│   ├── hooks/
│   │   ├── useDateNavigation.ts       # Gestion de la navigation de dates
│   │   └── useWorkoutForm.ts          # Gestion du formulaire d'exercice
│   ├── constants/
│   │   ├── dates.ts                   # Constantes et utilitaires de dates
│   │   └── messages.ts                # Messages et labels centralisés
│   └── services/
│       └── StorageService.ts          # Service de stockage AsyncStorage
```

## Composants

### 1. `workout.tsx` - Page principale

**Rôle** : Orchestrateur de la page, gère l'état global et coordonne les composants enfants.

**Responsabilités** :
- Utilise les hooks `useDateNavigation` et `useWorkoutForm`
- Charge les données depuis le StorageService
- Passe les props aux composants enfants
- Gère l'affichage du modal

**État géré** :
- `exercises` : Liste des exercices disponibles
- `todayWorkouts` : Liste des exercices de la séance
- `showModal` : Visibilité du modal

### 2. `DateSelector.tsx`

**Rôle** : Permet de sélectionner et naviguer entre les dates.

**Fonctionnalités** :
- Boutons de navigation rapide (jour précédent/suivant, aujourd'hui)
- Pickers pour sélectionner jour/mois/année
- Affichage formaté de la date ("Aujourd'hui", "Hier", ou date complète)

**Props principales** :
- `selectedDay/Month/Year` : Composants de la date
- `selectedDateString` : Date au format ISO
- `onDayChange/MonthChange/YearChange` : Callbacks de changement
- `onPreviousDay/NextDay/Today` : Callbacks de navigation

### 3. `WorkoutSummary.tsx`

**Rôle** : Affiche un résumé statistique de la séance.

**Fonctionnalités** :
- Calcul du nombre d'exercices
- Calcul du nombre total de séries
- Calcul du nombre total de répétitions
- **Optimisation** : Utilise `useMemo` pour éviter les recalculs inutiles

**Logique conditionnelle** :
- Ne s'affiche que si des exercices existent

### 4. `WorkoutList.tsx`

**Rôle** : Affiche la liste des exercices de la séance.

**Fonctionnalités** :
- Affichage d'un état vide si aucun exercice
- Carte pour chaque exercice avec :
  - Nom de l'exercice
  - Détails (séries × reps × poids)
  - Volume total (si poids utilisé)

### 5. `WorkoutFormModal.tsx`

**Rôle** : Modal de formulaire pour ajouter un exercice.

**Fonctionnalités** :
- Sélection d'un exercice parmi la liste disponible
- Saisie des séries et répétitions
- Switch pour activer/désactiver le poids
- Champ poids conditionnel
- Bouton de soumission (désactivé si formulaire invalide)

## Hooks personnalisés

### 1. `useDateNavigation`

**Rôle** : Encapsule toute la logique de navigation de dates.

**État géré** :
- `selectedDay/Month/Year` : Composants de la date
- `selectedDateString` : Date au format ISO
- `isToday` : Booléen indiquant si la date est aujourd'hui

**Fonctions exposées** :
- `goToToday()` : Navigue vers aujourd'hui
- `goToPreviousDay()` : Navigue vers le jour précédent
- `goToNextDay()` : Navigue vers le jour suivant

**Avantages** :
- Logique de date centralisée
- Synchronisation automatique entre les états
- Réutilisable dans d'autres pages

### 2. `useWorkoutForm`

**Rôle** : Encapsule toute la logique du formulaire d'ajout d'exercice.

**Paramètres** :
- `selectedDateString` : Date de la séance
- `onWorkoutAdded` : Callback appelé après ajout

**État géré** :
- `selectedExercise` : Exercice sélectionné
- `sets/reps/weight` : Valeurs du formulaire
- `useWeight` : Booléen pour le poids

**Fonctions exposées** :
- `isFormValid()` : Valide le formulaire
- `resetForm()` : Réinitialise le formulaire
- `handleSubmit()` : Soumet le formulaire

**Avantages** :
- Validation centralisée
- Messages d'erreur gérés dans le hook
- Logique de soumission isolée

## Constantes

### 1. `dates.ts`

**Contenu** :
- `MONTHS` : Liste des mois en français
- `generateDays()` : Génère un tableau de jours (1-31)
- `generateYears()` : Génère un tableau d'années
- `formatDateForDisplay()` : Formate une date ISO en français
- `toISODateString()` : Convertit jour/mois/année en ISO
- `getTodayISOString()` : Retourne la date actuelle en ISO

### 2. `messages.ts`

**Contenu** :
- `ERRORS` : Messages d'erreur de validation
- `SUCCESS` : Messages de succès
- `LABELS` : Labels et titres de l'interface
- `FORM` : Labels et placeholders du formulaire
- `SUMMARY` : Labels du résumé

**Avantages** :
- Centralisation des textes pour faciliter la traduction
- Cohérence des messages dans toute l'app
- Facilite les modifications de texte

## Optimisations

### 1. Performance

- **`useMemo`** dans `WorkoutSummary` : Évite de recalculer les stats à chaque render
- **`useCallback`** : Tous les handlers de fonctions sont mémorisés
- **Mise à jour optimiste** : Ajout d'exercice sans recharger depuis le storage

### 2. Validation

- Validation stricte du formulaire avant soumission
- Bouton désactivé si formulaire invalide
- Messages d'erreur clairs et précis

### 3. Expérience utilisateur

- Navigation rapide entre les dates
- Affichage contextuel ("Aujourd'hui", "Hier")
- Switch pour poids optionnel
- État vide informatif

## Flux de données

```
workout.tsx (État principal)
    ↓
    ├─→ useDateNavigation (Hook)
    │   └─→ DateSelector (Composant)
    │
    ├─→ useWorkoutForm (Hook)
    │   └─→ WorkoutFormModal (Composant)
    │
    ├─→ WorkoutSummary (Composant)
    │   └─→ useMemo pour calculs
    │
    └─→ WorkoutList (Composant)
        └─→ WorkoutCard (Sous-composant)
```

## Améliorations futures possibles

1. **Tests unitaires** : Ajouter des tests pour les hooks et composants
2. **Gestion d'erreur globale** : Context pour gérer les erreurs
3. **Internationalisation** : i18n pour supporter plusieurs langues
4. **Animation** : Transitions lors de l'ajout/suppression d'exercices
5. **Édition/Suppression** : Permettre de modifier ou supprimer des exercices
6. **Filtres** : Filtrer les exercices par groupe musculaire dans le modal

## Bonnes pratiques appliquées

✅ Séparation des responsabilités (SRP)
✅ Composants réutilisables et modulaires
✅ Hooks personnalisés pour la logique métier
✅ Constantes centralisées
✅ Documentation JSDoc
✅ TypeScript strict
✅ Optimisations de performance
✅ Validation robuste
✅ État immutable (pas de mutations directes)
