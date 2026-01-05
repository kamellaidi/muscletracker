import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Exercise, getMuscleGroupById } from '../../data/exercisesDatabase';
import { SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../utils/theme';
import { useTheme } from '../../contexts/ThemeContext';

interface ExerciseDetailModalProps {
  visible: boolean;
  exercise: Exercise | null;
  onClose: () => void;
}

/**
 * Modal affichant les détails complets d'un exercice
 *
 * Fonctionnalités :
 * - Infos complètes sur l'exercice
 * - Lien vers la page Docteur Fitness
 * - Design moderne avec grands titres et espacement aéré
 */
export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  visible,
  exercise,
  onClose,
}) => {
  const { colors } = useTheme();

  if (!exercise) return null;

  const group = getMuscleGroupById(getGroupId(exercise.group));
  const equipmentLabel = getEquipmentLabel(exercise.equipment);

  /**
   * Ouvre l'URL Docteur Fitness dans le navigateur
   */
  const handleOpenInfo = async () => {
    if (!exercise.infoUrl) {
      Alert.alert('Info', 'Aucune information disponible pour cet exercice');
      return;
    }

    try {
      const supported = await Linking.canOpenURL(exercise.infoUrl);
      if (supported) {
        await Linking.openURL(exercise.infoUrl);
      } else {
        Alert.alert('Erreur', 'Impossible d\'ouvrir le lien');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'ouvrir le lien');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header avec bouton fermer */}
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={[styles.closeIcon, { color: colors.textSecondary }]}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Badge du groupe musculaire */}
          {group && (
            <View style={[styles.groupBadge, { backgroundColor: group.color }]}>
              <Text style={styles.groupIcon}>{group.icon}</Text>
              <Text style={[styles.groupName, { color: colors.textInverse }]}>{group.name}</Text>
            </View>
          )}

          {/* Nom de l'exercice */}
          <Text style={[styles.exerciseName, { color: colors.text }]}>{exercise.name}</Text>

          {/* Informations */}
          <View style={styles.infoSection}>
            <InfoRow icon="🏋️" label="Équipement" value={equipmentLabel || 'Non spécifié'} />
            <InfoRow
              icon="⚡"
              label="Catégorie"
              value={exercise.category === 'strength' ? 'Musculation' : 'Cardio'}
            />
            <InfoRow icon="💪" label="Groupe musculaire" value={exercise.group} />
          </View>

          {/* Bouton En savoir plus */}
          {exercise.infoUrl && (
            <TouchableOpacity style={[styles.learnMoreButton, { backgroundColor: colors.primary }]} onPress={handleOpenInfo}>
              <Text style={styles.learnMoreIcon}>📚</Text>
              <View style={styles.learnMoreContent}>
                <Text style={[styles.learnMoreTitle, { color: colors.textInverse }]}>En savoir plus</Text>
                <Text style={[styles.learnMoreSubtitle, { color: colors.textInverse }]}>
                  Voir l'exécution détaillée sur Docteur Fitness
                </Text>
              </View>
              <Text style={[styles.learnMoreArrow, { color: colors.textInverse }]}>›</Text>
            </TouchableOpacity>
          )}

          {/* Info complémentaire */}
          <View style={[styles.footerInfo, { backgroundColor: colors.surface, borderLeftColor: colors.info }]}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              💡 Consultez toujours un professionnel avant de commencer un nouvel exercice
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

/**
 * Composant pour afficher une ligne d'information
 */
const InfoRow: React.FC<{ icon: string; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.infoRow, { backgroundColor: colors.surface }]}>
      <View style={[styles.infoIconContainer, { backgroundColor: colors.background }]}>
        <Text style={styles.infoIcon}>{icon}</Text>
      </View>
      <View style={styles.infoTextContainer}>
        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
        <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
      </View>
    </View>
  );
};

/**
 * Convertit le nom du groupe en ID
 */
const getGroupId = (groupName: string): string => {
  const mapping: Record<string, string> = {
    'Épaules': 'epaules',
    'Pectoraux': 'pectoraux',
    'Dos': 'dos',
    'Biceps': 'biceps',
    'Triceps': 'triceps',
    'Abdominaux': 'abdominaux',
    'Quadriceps': 'quadriceps',
    'Ischio-jambiers': 'ischios',
    'Fessiers': 'fessiers',
    'Mollets': 'mollets',
  };
  return mapping[groupName] || 'epaules';
};

/**
 * Convertit le code d'équipement en label français
 */
const getEquipmentLabel = (equipment?: string): string | null => {
  if (!equipment) return null;

  const labels: Record<string, string> = {
    barre: 'Barre',
    halteres: 'Haltères',
    poulie: 'Poulie',
    machine: 'Machine',
    poids_corps: 'Poids de corps',
    materiel: 'Matériel',
  };
  return labels[equipment] || equipment;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  closeIcon: {
    fontSize: 28,
    fontWeight: TYPOGRAPHY.weights.regular,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  groupBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.lg,
  },
  groupIcon: {
    fontSize: 20,
    marginRight: SPACING.xs,
  },
  groupName: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  exerciseName: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xl,
    lineHeight: TYPOGRAPHY.sizes.xxxl * TYPOGRAPHY.lineHeights.tight,
  },
  infoSection: {
    marginBottom: SPACING.xl,
  },
  infoRow: {
    flexDirection: 'row',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    marginBottom: SPACING.xxs,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
    ...SHADOWS.md,
  },
  learnMoreIcon: {
    fontSize: 28,
    marginRight: SPACING.md,
  },
  learnMoreContent: {
    flex: 1,
  },
  learnMoreTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xxs,
  },
  learnMoreSubtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    opacity: 0.9,
  },
  learnMoreArrow: {
    fontSize: 32,
    marginLeft: SPACING.sm,
  },
  footerInfo: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderLeftWidth: 4,
  },
  footerText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    lineHeight: TYPOGRAPHY.sizes.sm * TYPOGRAPHY.lineHeights.relaxed,
  },
});
