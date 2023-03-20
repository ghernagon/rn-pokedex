import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {styles as globalStyles} from '../theme/appTheme';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [filteredPokemon, setFilteredPokemon] = useState<SimplePokemon[]>([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    if (term.length === 0) return setFilteredPokemon([]);

    // Check if is not a number so we can filter by string term (name)
    if (isNaN(Number(term))) {
      setFilteredPokemon(
        simplePokemonList.filter(pokemon =>
          pokemon.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    } else {
      // Check if is a number, then find the ID
      const pokemonById = simplePokemonList.find(
        pokemon => pokemon.id === term,
      );
      setFilteredPokemon(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    // Dismiss keyboard when click outsise keyboard
    <KeyboardAvoidingView behavior="height" style={styles.keyboardContainer}>
      <View
        style={{
          ...styles.container,
        }}>
        <SearchInput
          onDebounce={value => setTerm(value)}
          style={{
            ...styles.searchInput,
            top: Platform.OS === 'ios' ? top : top + 30,
          }}
        />

        <FlatList
          data={filteredPokemon}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          // Header
          ListHeaderComponent={
            <Text
              style={{
                ...globalStyles.title,
                ...globalStyles.globalMargin,
                ...styles.listHeader,
                marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
              }}>
              {term}
            </Text>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          keyboardDismissMode={'on-drag'} // Dismiss keyboard when scroll
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 60,
  },
  keyboardContainer: {
    flex: 1,
  },
  searchInput: {
    position: 'absolute',
    zIndex: 999,
    width: screenWidth - 40,
  },
  listHeader: {
    paddingBottom: 10,
  },
});
