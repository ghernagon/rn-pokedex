import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getImageColors} from '../helpers/getImageColors';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

const windowWidth = Dimensions.get('window').width;

type Props = {
  pokemon: SimplePokemon;
};

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (pokemon) {
      getPokemonColors(pokemon.picture);
    }

    // This function will be triggered when component is dismounted
    return () => {
      isMounted.current = false;
    };
  }, []);

  const getPokemonColors = async (uri: string) => {
    if (!isMounted.current) return;
    const [primaryColor] = await getImageColors(uri);
    setBgColor(primaryColor);
  };

  const onPress = () => {
    navigation.navigate('PokemonScreen', {
      simplePokemon: pokemon,
      color: bgColor,
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{...styles.container, backgroundColor: bgColor}}>
        <Text style={styles.name}>
          {pokemon.name}
          {'\n#' + pokemon.id}
        </Text>
        <View style={styles.pokeballContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokeball}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: 120,
    width: windowWidth * 0.4,
    marginBottom: 25,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokeballContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.5,
    overflow: 'hidden',
  },
  pokeball: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -25,
    right: -25,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -8,
    bottom: -8,
  },
});
