import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView
} from 'react-native';
import axios from 'axios';

//REcebe 'route' para pegar os parametros e 'navigation' para customizar o header
export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //useEffect para buscar os dados do produto
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); 

  //useLayoutEffect para mudar o titulo do header dinamicamente
  useLayoutEffect(() => {
    if (product) {
      navigation.setOptions({ title: product.title });
    }
  }, [navigation, product]); //Roda sempre que o produto for carregado

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  //Renderizaçao condicional para loading e erro
  if (isLoading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#007bff" /></View>;
  }

  if (error) {
    return <View style={styles.centered}><Text>Erro ao carregar o produto: {error}</Text></View>;
  }

  if (!product) {
    return <View style={styles.centered}><Text>Produto não encontrado.</Text></View>;
  }

  //Renderizacao principal com os detalhes do produto
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.detailsContainer}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.descriptionLabel}>Descrição:</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#fff' },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
  },
  detailsContainer: {
    padding: 20,
  },
  category: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 16,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#343a40',
  },
});
