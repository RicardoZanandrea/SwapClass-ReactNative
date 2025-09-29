import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../pages/LoginScreen';
import HomeScreen from '../pages/HomeScreen';
import InfoScreen from '../pages/InfoScreen';
import ProductDetailScreen from '../pages/ProductDetailScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }} // Esconde o header na tela de login
        />

        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Produtos', // Titulo no centro
            headerTitleAlign: 'center',
            headerBackVisible: false, 

            // Botao de Logout 
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.replace('Login')}
              >
                <Text style={styles.headerButton}>Sair</Text>
              </TouchableOpacity>
            ),

            // Botao de Informacoes
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Info')}
              >
                <Text style={styles.headerButton}>Info</Text>
              </TouchableOpacity>
            ),
          })}
        />

        {/* Tela Info */}
        <Stack.Screen 
          name="Info" 
          component={InfoScreen}
          options={{ title: 'Informações do Grupo' }}
        />

        {/* Tela ProductDetail */}
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen}
          options={{ title: 'Detalhes do Produto' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    color: '#007bff',
    fontSize: 16,
    marginHorizontal: 10,
  }
});

