# Muscle Tracker

Application mobile de suivi d'entraînement de musculation développée avec React Native et Expo. Cette application permet de suivre vos séances d'entraînement, gérer une bibliothèque d'exercices, visualiser vos statistiques et consulter votre historique d'entraînement.

## Table des matières

- [Démarrage rapide](#démarrage-rapide)
- [Architecture du projet](#architecture-du-projet)
- [Structure des dossiers](#structure-des-dossiers)
- [Dépendances principales](#dépendances-principales)
- [Fonctionnalités](#fonctionnalités)

## Démarrage rapide

### Installation

```bash
npm install
```

### Lancement de l'application

```bash
npx expo start
```

Dans le terminal, vous trouverez des options pour ouvrir l'application dans :
- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

### Scripts disponibles

- `npm start` - Lance le serveur de développement Expo
- `npm run android` - Lance l'application sur Android
- `npm run ios` - Lance l'application sur iOS
- `npm run web` - Lance l'application sur le web
- `npm run lint` - Vérifie le code avec ESLint
- `npm run reset-project` - Réinitialise le projet

## Architecture du projet

L'application utilise une architecture moderne basée sur React Native et Expo avec les principes suivants :

### Patterns architecturaux

- **File-based routing** : Utilisation d'Expo Router pour la navigation basée sur la structure des fichiers
- **Context API** : Gestion de l'état global (thème) avec React Context
- **Component-based** : Architecture orientée composants réutilisables
- **TypeScript** : Typage statique pour améliorer la maintenabilité
- **Local Storage** : Persistance des données avec AsyncStorage

### Navigation

L'application utilise une navigation par onglets (`tabs`) avec 4 écrans principaux :
1. **Dashboard** (`index.tsx`) - Vue d'ensemble et accueil
2. **Exercises** (`exercises.tsx`) - Bibliothèque d'exercices
3. **Workout** (`workout.tsx`) - Enregistrement de séances
4. **History** (`history.tsx`) - Historique des entraînements

## Structure des dossiers

```
muscletracker/
├── app/                          # Navigation et écrans (Expo Router)
│   ├── (tabs)/                   # Écrans avec navigation par onglets
│   │   ├── _layout.tsx           # Configuration de la navigation par onglets
│   │   ├── index.tsx             # Dashboard / Accueil
│   │   ├── exercises.tsx         # Bibliothèque d'exercices
│   │   ├── workout.tsx           # Enregistrement de séances
│   │   └── history.tsx           # Historique des entraînements
│   ├── _layout.tsx               # Configuration racine de l'application
│   └── +not-found.tsx            # Page 404
│
├── src/                          # Code source principal
│   ├── components/               # Composants React réutilisables
│   │   ├── Button.tsx            # Composant bouton personnalisé
│   │   ├── Input.tsx             # Composant input personnalisé
│   │   ├── dashboard/            # Composants spécifiques au dashboard
│   │   ├── library/              # Composants de la bibliothèque d'exercices
│   │   ├── stats/                # Composants de statistiques
│   │   ├── workout/              # Composants d'entraînement
│   │   ├── settings/             # Composants de paramètres
│   │   └── shared/               # Composants partagés
│   │
│   ├── contexts/                 # Context API React
│   │   └── ThemeContext.tsx      # Gestion du thème (dark/light mode)
│   │
│   ├── data/                     # Données et bases de données locales
│   │   └── exercisesDatabase.ts  # Base de données d'exercices pré-définis
│   │
│   ├── services/                 # Services et logique métier
│   │   └── StorageService.ts     # Service de persistance (AsyncStorage)
│   │
│   ├── types/                    # Définitions TypeScript
│   │   └── index.ts              # Types: Exercise, WorkoutEntry, etc.
│   │
│   ├── hooks/                    # Custom React Hooks
│   │
│   ├── utils/                    # Fonctions utilitaires
│   │
│   └── constants/                # Constantes de l'application
│
├── assets/                       # Ressources statiques
│   ├── fonts/                    # Polices personnalisées (SpaceMono)
│   └── images/                   # Images et icônes
│
├── components/                   # Composants UI génériques (deprecated, utiliser src/components/)
│   └── ui/                       # Composants d'interface utilisateur
│
├── constants/                    # Constantes globales (deprecated, utiliser src/constants/)
│
├── hooks/                        # Hooks globaux
│   └── useColorScheme.ts         # Hook pour détection du thème système
│
├── scripts/                      # Scripts utilitaires
│   └── reset-project.js          # Script de réinitialisation
│
├── docs/                         # Documentation
│
└── .expo/                        # Configuration Expo (généré automatiquement)
```

### Rôle des principaux dossiers

#### `/app` - Navigation et Écrans
Contient tous les écrans de l'application organisés selon le système de file-based routing d'Expo Router. Chaque fichier `.tsx` représente une route de l'application.

#### `/src/components` - Composants
Composants React organisés par fonctionnalité :
- Composants UI génériques (`Button`, `Input`)
- Composants métier par feature (`dashboard`, `library`, `stats`, `workout`)
- Composants partagés entre plusieurs features (`shared`)

#### `/src/contexts` - État Global
Gestion de l'état global avec React Context :
- `ThemeContext.tsx` : Gestion du mode sombre/clair avec persistance

#### `/src/data` - Données
Base de données locale et fixtures :
- `exercisesDatabase.ts` : Base d'exercices pré-définis avec nom, groupe musculaire et catégorie

#### `/src/services` - Services
Couche de services pour la logique métier :
- `StorageService.ts` : Abstraction du stockage local (AsyncStorage) pour sauvegarder/charger les données

#### `/src/types` - Types TypeScript
Définitions des interfaces et types :
- `Exercise` : Exercice avec id, nom, groupe musculaire, catégorie
- `WorkoutEntry` : Entrée d'entraînement avec date, exercice, séries, répétitions, poids, notes

#### `/assets` - Ressources
Fichiers statiques (images, polices, etc.) utilisés dans l'application

## Dépendances principales

### Framework et Navigation

| Dépendance | Version | But |
|------------|---------|-----|
| **expo** | ^54.0.0 | Framework principal pour le développement React Native |
| **react-native** | 0.79.3 | Framework mobile cross-platform |
| **expo-router** | ~5.1.0 | Navigation basée sur le système de fichiers (file-based routing) |
| **@react-navigation/native** | ^7.1.10 | Bibliothèque de navigation core |
| **@react-navigation/bottom-tabs** | ^7.3.14 | Navigation par onglets en bas d'écran |

### UI et Expérience Utilisateur

| Dépendance | Version | But |
|------------|---------|-----|
| **@expo/vector-icons** | ^14.1.0 | Large collection d'icônes (Ionicons, MaterialIcons, FontAwesome, etc.) |
| **expo-linear-gradient** | ~14.1.5 | Gradients linéaires pour les backgrounds |
| **expo-blur** | ~14.1.5 | Effet de flou pour les composants |
| **expo-haptics** | ~14.1.4 | Retour haptique (vibrations) pour améliorer l'UX |
| **react-native-reanimated** | ~3.17.4 | Animations performantes et fluides |
| **react-native-gesture-handler** | ~2.24.0 | Gestion avancée des gestes tactiles |

### Stockage et Données

| Dépendance | Version | But |
|------------|---------|-----|
| **@react-native-async-storage/async-storage** | 2.1.2 | Stockage persistant clé-valeur local (entraînements, paramètres) |

### Composants de Formulaires

| Dépendance | Version | But |
|------------|---------|-----|
| **@react-native-community/datetimepicker** | 8.4.1 | Sélecteur de date et heure natif |
| **@react-native-picker/picker** | ^2.11.1 | Sélecteur déroulant (exercices, catégories) |

### Utilitaires Expo

| Dépendance | Version | But |
|------------|---------|-----|
| **expo-font** | ~13.3.1 | Chargement de polices personnalisées (SpaceMono) |
| **expo-status-bar** | ~2.2.3 | Configuration de la barre d'état (couleur, style) |
| **expo-system-ui** | ~5.0.8 | Gestion du thème système (dark/light mode) |
| **expo-constants** | ~17.1.6 | Accès aux constantes système et configuration |
| **expo-splash-screen** | ~0.30.9 | Écran de démarrage personnalisé |
| **expo-image** | ~2.3.0 | Composant d'image optimisé |

### Développement

| Dépendance | Version | But |
|------------|---------|-----|
| **typescript** | ~5.8.3 | Typage statique pour améliorer la qualité du code |
| **@types/react** | ~19.0.10 | Types TypeScript pour React |
| **eslint** | ^9.25.0 | Linter pour maintenir la qualité du code |
| **eslint-config-expo** | ~9.2.0 | Configuration ESLint optimisée pour Expo |

## Fonctionnalités

### Gestion d'exercices
- Bibliothèque complète d'exercices pré-définis
- Classement par groupe musculaire
- Catégorisation (strength/cardio)

### Suivi d'entraînement
- Enregistrement de séances avec date
- Suivi des séries, répétitions et poids
- Ajout de notes par exercice

### Historique et Statistiques
- Consultation de l'historique des entraînements
- Visualisation des statistiques de progression
- Dashboard avec vue d'ensemble

### Interface et Thème
- Mode sombre / clair avec détection automatique du thème système
- Interface intuitive avec navigation par onglets
- Animations fluides et retours haptiques

## Ressources

- [Documentation Expo](https://docs.expo.dev/)
- [Documentation React Native](https://reactnative.dev/)
- [Documentation Expo Router](https://docs.expo.dev/router/introduction/)
