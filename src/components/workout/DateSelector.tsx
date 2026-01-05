import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../Button';
import { SPACING } from '../../utils/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { MONTHS, generateDays, generateYears, formatDateForDisplay } from '../../constants/dates';
import { WORKOUT_MESSAGES } from '../../constants/messages';

interface DateSelectorProps {
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
  selectedDateString: string;
  isToday: boolean;
  onDayChange: (day: number) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

/**
 * Composant de sélection de date pour les séances d'entraînement
 *
 * Permet de naviguer entre les dates via des boutons rapides ou des pickers
 */
export const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDay,
  selectedMonth,
  selectedYear,
  selectedDateString,
  isToday,
  onDayChange,
  onMonthChange,
  onYearChange,
  onPreviousDay,
  onNextDay,
  onToday,
}) => {
  const { colors } = useTheme();
  const days = generateDays();
  const years = generateYears();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
      <Text style={[styles.label, { color: colors.text }]}>{WORKOUT_MESSAGES.LABELS.DATE_SECTION}</Text>

      {/* Navigation rapide */}
      <View style={styles.quickNavigation}>
        <Button
          title={WORKOUT_MESSAGES.LABELS.PREVIOUS_DAY}
          onPress={onPreviousDay}
          variant="secondary"
          style={styles.navButton}
        />
        {!isToday && (
          <Button
            title={WORKOUT_MESSAGES.LABELS.TODAY}
            onPress={onToday}
            variant="primary"
            style={styles.navButton}
          />
        )}
        <Button
          title={WORKOUT_MESSAGES.LABELS.NEXT_DAY}
          onPress={onNextDay}
          variant="secondary"
          style={styles.navButton}
        />
      </View>

      {/* Pickers de date */}
      <View style={styles.pickersRow}>
        {/* Picker Jour */}
        <View style={[styles.pickerContainer, { backgroundColor: colors.background }]}>
          <Text style={[styles.pickerLabel, { color: colors.textSecondary }]}>Jour</Text>
          <Picker selectedValue={selectedDay} onValueChange={onDayChange} style={styles.picker}>
            {days.map((day) => (
              <Picker.Item
                key={day}
                label={day.toString().padStart(2, '0')}
                value={day}
              />
            ))}
          </Picker>
        </View>

        {/* Picker Mois */}
        <View style={[styles.pickerContainer, { backgroundColor: colors.background }]}>
          <Text style={[styles.pickerLabel, { color: colors.textSecondary }]}>Mois</Text>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={onMonthChange}
            style={styles.picker}
          >
            {MONTHS.map((month) => (
              <Picker.Item key={month.value} label={month.label} value={month.value} />
            ))}
          </Picker>
        </View>

        {/* Picker Année */}
        <View style={[styles.pickerContainer, { backgroundColor: colors.background }]}>
          <Text style={[styles.pickerLabel, { color: colors.textSecondary }]}>Année</Text>
          <Picker
            selectedValue={selectedYear}
            onValueChange={onYearChange}
            style={styles.picker}
          >
            {years.map((year) => (
              <Picker.Item key={year} label={year.toString()} value={year} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Affichage de la date sélectionnée */}
      <View style={[styles.datePreviewContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.datePreview, { color: colors.primary }]}>📅 {formatDateForDisplay(selectedDateString)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  quickNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  navButton: {
    flex: 1,
    paddingVertical: SPACING.xs,
  },
  pickersRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  pickerContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  pickerLabel: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 2,
    textAlign: 'center',
    fontWeight: '500',
  },
  picker: {
    height: 50,
  },
  datePreviewContainer: {
    borderRadius: 8,
    padding: SPACING.sm,
  },
  datePreview: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
