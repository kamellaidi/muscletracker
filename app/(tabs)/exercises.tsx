import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, Alert } from 'react-native';
import { COLORS, SPACING } from '../../src/utils/theme';
import StorageService from '../../src/services/StorageService';
import { Exercise } from '../../src/types';
import Button from '../../src/components/Button';
import Input from '../../src/components/Input';

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // États du formulaire
  const [newName, setNewName] = useState('');
  const [newGroup, setNewGroup] = useState('');

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const data = await StorageService.getExercises();
      setExercises(data);
    } catch (error) {
      console.error('Error loading exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExercise = async () => {
    if (!newName.trim() || !newGroup.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      await StorageService.addExercise({
        name: newName.trim(),
        group: newGroup.trim(),
        category: 'strength',
      });

      // Recharger la liste
      await loadExercises();
      
      // Réinitialiser le formulaire
      setNewName('');
      setNewGroup('');
      setShowModal(false);
      
      Alert.alert('Succès', 'Exercice ajouté !');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'ajouter l\'exercice');
    }
  };

  const renderExercise = ({ item }: { item: Exercise }) => (
    <View style={styles.exerciseCard}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.exerciseGroup}>{item.group}</Text>
      <Text style={styles.exerciseCategory}>{item.category}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Exercices ({exercises.length})</Text>
        <Button
          title="+ Ajouter"
          onPress={() => setShowModal(true)}
          style={styles.addButton}
        />
      </View>
      
      <FlatList
        data={exercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal d'ajout */}
      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nouvel exercice</Text>
            <Button
              title="Fermer"
              onPress={() => setShowModal(false)}
              variant="secondary"
              style={styles.closeButton}
            />
          </View>

          <View style={styles.modalContent}>
            <Input
              label="Nom de l'exercice"
              value={newName}
              onChangeText={setNewName}
              placeholder="Ex: Squat bulgare"
            />

            <Input
              label="Groupe musculaire"
              value={newGroup}
              onChangeText={setNewGroup}
              placeholder="Ex: Jambes"
            />

            <Button
              title="Ajouter l'exercice"
              onPress={handleAddExercise}
              style={styles.submitButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  listContainer: {
    paddingBottom: SPACING.lg,
  },
  exerciseCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  exerciseGroup: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  exerciseCategory: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
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
    padding: SPACING.lg,
  },
  submitButton: {
    marginTop: SPACING.lg,
  },
});