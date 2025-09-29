import { useState } from 'react';
import { 
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';

import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //login function
  const handleLogin = async () => {
    if (!username || !password) {
        Alert.alert('Erro', 'Preencha todos os campos de usuário e senha.');
        return;
    }
    
    setIsLoading(true);

    try {
        //verifica usuarios
        const userResponse = await axios.get('https://fakestoreapi.com/users');
        const users = await userResponse.data;

        const userExists = users.find(user => user.username === username);

        if (!userExists) {
            throw new Error('Usuário não encontrado.');
        }

        await axios.post('https://fakestoreapi.com/auth/login', {
            username: username,
            password: password,
        });
        
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.replace('Home');

    } catch (error) {
        let errorMessage = 'Ocorreu um erro. Tente novamente.';

        //servidor respondeu com um erro
        if (error.response && error.response.data) {
            errorMessage = error.response.data;
        } else if (error.request) {
            errorMessage = 'Não foi possível conectar ao servidor. Verifique sua internet.';
        } else {
            errorMessage = error.message;
        }
        
        Alert.alert('Erro no Login', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça seu Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

