import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InfoScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Desenvolvedores do App</Text>
        <Text style={styles.description}>
          Aplicativo desenvolvido para a disciplina de React Native.
        </Text>

        <View style={styles.memberCard}>
          <Text style={styles.memberName}>Augusto de Oliveira Godoy</Text>
          <Text style={styles.memberRA}>RA: 1136630</Text>
        </View>

        <View style={styles.memberCard}>
          <Text style={styles.memberName}>Bento Martins</Text>
          <Text style={styles.memberRA}>RA: 1125095</Text>
        </View>
        
        <View style={styles.memberCard}>
          <Text style={styles.memberName}>Gabriel Portelinha Rico</Text>
          <Text style={styles.memberRA}>RA: 1136215</Text>
        </View>
        
        <View style={styles.memberCard}>
          <Text style={styles.memberName}>Ricardo Zanandrea</Text>
          <Text style={styles.memberRA}>RA: 1136748</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6c757d',
    marginBottom: 32,
    lineHeight: 24,
  },
  memberCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  memberName: {
    fontSize: 18,
    fontWeight: '600',
  },
  memberRA: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 4,
  },
});

