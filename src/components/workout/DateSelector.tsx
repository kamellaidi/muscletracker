import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../Button';
import { COLORS, SPACING } from '../../utils/theme';
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
  const days = generateDays();
  const years = generateYears();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{WORKOUT_MESSAGES.LABELS.DATE_SECTION}</Text>

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
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Jour</Text>
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
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Mois</Text>
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
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Année</Text>
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
      <View style={styles.datePreviewContainer}>
        <Text style={styles.datePreview}>📅 {formatDateForDisplay(selectedDateString)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
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
    backgroundColor: COLORS.background,
    borderRadius: 8,
    overflow: 'hidden',
  },
  pickerLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 2,
    textAlign: 'center',
    fontWeight: '500',
  },
  picker: {
    height: 50,
  },
  datePreviewContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: SPACING.sm,
  },
  datePreview: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
});
