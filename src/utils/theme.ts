/**
 * Thème de l'application - Design moderne 2026
 *
 * Palette inspirée des apps de fitness modernes avec :
 * - Couleurs vives et énergiques pour la motivation
 * - Dégradés subtils pour la profondeur
 * - Contraste élevé pour la lisibilité
 * - Mode sombre ready (fondations)
 */

export const COLORS = {
  // Couleurs principales - Palette énergique
  primary: '#6366F1',        // Indigo vif - CTA et éléments interactifs
  primaryDark: '#4F46E5',    // Indigo foncé - Hover states
  primaryLight: '#818CF8',   // Indigo clair - Backgrounds subtils

  // Couleurs secondaires
  secondary: '#EC4899',      // Rose vif - Accents et badges
  success: '#10B981',        // Vert - Succès et validation
  warning: '#F59E0B',        // Ambre - Avertissements
  error: '#EF4444',          // Rouge - Erreurs
  info: '#3B82F6',           // Bleu - Informations

  // Backgrounds
  background: '#F8FAFC',     // Gris très clair - Fond principal
  surface: '#FFFFFF',        // Blanc - Cartes et surfaces
  surfaceElevated: '#FFFFFF',// Blanc - Surfaces surélevées (avec shadow)

  // Texte
  text: '#0F172A',           // Slate 900 - Texte principal
  textSecondary: '#64748B',  // Slate 500 - Texte secondaire
  textTertiary: '#94A3B8',   // Slate 400 - Texte tertiaire
  textInverse: '#FFFFFF',    // Blanc - Texte sur fond sombre

  // Borders et dividers
  border: '#E2E8F0',         // Slate 200 - Bordures
  divider: '#F1F5F9',        // Slate 100 - Séparateurs

  // Overlays
  overlay: 'rgba(15, 23, 42, 0.5)',  // Overlay sombre
  overlayLight: 'rgba(248, 250, 252, 0.9)', // Overlay clair

  // États
  disabled: '#CBD5E1',       // Slate 300 - Éléments désactivés
  placeholder: '#94A3B8',    // Slate 400 - Placeholders

  // Dégradés (utiliser avec LinearGradient si nécessaire)
  gradientPrimary: ['#6366F1', '#8B5CF6'], // Indigo vers Purple
  gradientSecondary: ['#EC4899', '#F43F5E'], // Pink vers Rose
  gradientSuccess: ['#10B981', '#059669'], // Green
};

export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};

export const TYPOGRAPHY = {
  // Tailles de police
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
  },

  // Poids de police
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const RADIUS = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
};

export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};
