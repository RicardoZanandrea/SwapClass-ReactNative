import React, { useState, useEffect} from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import axios from 'axios';


export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  

useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data); //Armazena as categorias no estado
      } catch (err) {
        //Em caso de erro na busca de categorias registrar no console.
        console.error("Erro ao buscar categorias:", err);
      }
    };
    fetchCategories();
  }, []); //O array vazio garante que rode so uma vez.

  //Roda uma vez no inicio e toda vez que `selectedCategory` mudar
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); 
      setError(null);     
      
      //Define o endpoint da API baseado na categoria
      const endpoint = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : 'https://fakestoreapi.com/products';

      try {
        const response = await axios.get(endpoint);
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);


  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  //Funcao para renderizar os botoes de filtro
  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Botao para Limpar o Filtro */}
        <TouchableOpacity
          style={[styles.chip, !selectedCategory ? styles.chipActive : null]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={styles.chipText}>Todos</Text>
        </TouchableOpacity>

        {/* Mapeia as categorias */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.chip, selectedCategory === category ? styles.chipActive : null]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.chipText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
    </TouchableOpacity>
  );
  

  // Se houver um erro, mostra a mensagem de erro
  if (error && !isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Ocorreu um erro:</Text>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Renderiza os botoes de filtro no topo da tela */}
      {renderFilterButtons()}

      {/* Se estiver carregando mostra o loading, caso contrario, mostra a lista */}
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  filterContainer: {
    paddingVertical: 10,
    paddingBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  chip: {
    backgroundColor: '#e9ecef',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  chipActive: {
    backgroundColor: '#007bff',
  },
  chipText: {
    color: '#000',
    textTransform: 'capitalize',
  },
});

