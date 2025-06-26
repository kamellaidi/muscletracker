import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, ScrollView, StyleSheet, Alert, Modal } from 'react-native';
import { COLORS, SPACING } from '../../src/utils/theme';
import StorageService from '../../src/services/StorageService';
import { Exercise, WorkoutEntry } from '../../src/types';
import Button from '../../src/components/Button';
import Input from '../../src/components/Input';

export default function WorkoutPage() {
  // États pour la séance
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [todayWorkouts, setTodayWorkouts] = useState<WorkoutEntry[]>([]);
  
  // États pour le formulaire
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);


  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const loadData = async () => {
    try {
      const [exercisesData, workoutsData] = await Promise.all([
        StorageService.getExercises(),
        StorageService.getWorkoutsByDate(selectedDate),
      ]);
      
      setExercises(exercisesData);
      setTodayWorkouts(workoutsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleAddWorkout = async () => {
    // Validation stricte
    if (!selectedExercise) {
      Alert.alert('Erreur', 'Veuillez sélectionner un exercice');
      return;
    }
    
    if (!sets.trim() || parseInt(sets) <= 0) {
      Alert.alert('Erreur', 'Veuillez saisir un nombre de séries valide (> 0)');
      return;
    }
    
    if (!reps.trim() || parseInt(reps) <= 0) {
      Alert.alert('Erreur', 'Veuillez saisir un nombre de répétitions valide (> 0)');
      return;
    }
    
    if (!weight.trim() || parseFloat(weight) <= 0) {
      Alert.alert('Erreur', 'Veuillez saisir un poids valide (> 0)');
      return;
    }

    try {
      await StorageService.addWorkout({
        date: selectedDate,
        exerciseId: selectedExercise.id,
        exerciseName: selectedExercise.name,
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseFloat(weight),
      });

      // Recharger les workouts du jour
      const updatedWorkouts = await StorageService.getWorkoutsByDate(selectedDate);
      setTodayWorkouts(updatedWorkouts);
      
      // Réinitialiser le formulaire
      setSelectedExercise(null);
      setSets('3');
      setReps('');
      setWeight('');
      setShowModal(false);
      
      Alert.alert('Succès', 'Exercice ajouté à votre séance !');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'ajouter l\'exercice');
    }
  };


const formatDateForDisplay = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (dateString === today) return "Aujourd'hui";
  if (dateString === yesterdayStr) return "Hier";
  
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric', 
    month: 'long'
  });
};

const handleDateChange = (event: any, selectedDate?: Date) => {
  setShowDatePicker(false);
  if (selectedDate) {
    setSelectedDate(selectedDate.toISOString().split('T')[0]);
  }
};

  return (
    <ScrollView style={styles.container}>

{/* Section date */}
<View style={styles.dateSection}>
  <Text style={styles.dateLabel}>Date de la séance</Text>
  
  <Button
    title={`📅 ${formatDateForDisplay(selectedDate)}`}
    onPress={() => setShowDatePicker(true)}
    variant="secondary"
    style={styles.datePickerButton}
  />
</View>
        

      {/* Résumé de la séance */}
      {todayWorkouts.length > 0 && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Résumé</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{todayWorkouts.length}</Text>
              <Text style={styles.summaryLabel}>Exercices</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                {todayWorkouts.reduce((total, w) => total + w.sets, 0)}
              </Text>
              <Text style={styles.summaryLabel}>Séries</Text>
            </View>
          </View>
        </View>
      )}

      {/* Bouton d'ajout */}
      <Button
        title="+ Ajouter un exercice"
        onPress={() => setShowModal(true)}
        style={styles.addButton}
      />

      {/* Liste des exercices de la séance */}
      <View style={styles.workoutsList}>
        <Text style={styles.sectionTitle}>
          Exercices du jour ({todayWorkouts.length})
        </Text>
        
        {todayWorkouts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Aucun exercice enregistré</Text>
            <Text style={styles.emptySubtext}>Ajoutez votre premier exercice !</Text>
          </View>
        ) : (
          todayWorkouts.map((workout) => (
            <View key={workout.id} style={styles.workoutCard}>
              <Text style={styles.workoutName}>{workout.exerciseName}</Text>
              <Text style={styles.workoutDetails}>
                {workout.sets} série{workout.sets > 1 ? 's' : ''} × {workout.reps} rép × {workout.weight}kg
              </Text>
            </View>
          ))
        )}
      </View>

      {/* Modal d'ajout d'exercice */}
      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Ajouter un exercice</Text>
            <Button
              title="Fermer"
              onPress={() => setShowModal(false)}
              variant="secondary"
              style={styles.closeButton}
            />
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Sélection d'exercice */}
            <Text style={styles.sectionLabel}>Choisir un exercice :</Text>
            <ScrollView style={styles.exercisesList} showsVerticalScrollIndicator={false}>
              {exercises.map((exercise) => (
                <Button
                  key={exercise.id}
                  title={`${exercise.name} (${exercise.group})`}
                  onPress={() => setSelectedExercise(exercise)}
                  variant={selectedExercise?.id === exercise.id ? 'primary' : 'secondary'}
                  style={styles.exerciseButton}
                />
              ))}
            </ScrollView>

            {/* Formulaire si exercice sélectionné */}
            {selectedExercise && (
              <View style={styles.form}>
                <Text style={styles.selectedExercise}>
                  Exercice sélectionné: {selectedExercise.name}
                </Text>
                
                <View style={styles.formRow}>
                  <Input
                    label="Séries *"
                    value={sets}
                    onChangeText={setSets}
                    placeholder="3"
                    style={styles.formInput}
                  />
                  
                  <Input
                    label="Répétitions *"
                    value={reps}
                    onChangeText={setReps}
                    placeholder="12"
                    style={styles.formInput}
                  />
                </View>

                <Input
                  label="Poids (kg) *"
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="50"
                />

                <Button
                  title="Ajouter à la séance"
                  onPress={handleAddWorkout}
                  style={styles.submitButton}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
      {/* DatePicker */}
{/* DatePicker */}
{showDatePicker && (
  <DateTimePicker
    value={new Date(selectedDate)}
    mode="date"
    display="default"
    onChange={handleDateChange}
  />
)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  dateSection: {
  padding: SPACING.md,
  backgroundColor: COLORS.surface,
  borderBottomWidth: 1,
  borderBottomColor: COLORS.border,
},
dateLabel: {
  fontSize: 18,
  fontWeight: '600',
  color: COLORS.text,
  marginBottom: SPACING.md,
},
datePickerButton: {
  justifyContent: 'flex-start',
  paddingVertical: SPACING.md,
},
  summaryCard: {
    backgroundColor: COLORS.surface,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  addButton: {
    margin: SPACING.md,
  },
  workoutsList: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  workoutCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  workoutDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  modalContent: {
    flex: 1,
    padding: SPACING.md,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  exercisesList: {
    maxHeight: 200,
    marginBottom: SPACING.lg,
  },
  exerciseButton: {
    marginBottom: SPACING.sm,
  },
  form: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.lg,
  },
  selectedExercise: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  formRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  formInput: {
    flex: 1,
  },
  submitButton: {
    marginTop: SPACING.lg,
  },
});