import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

type Props = {
  pokemon: PokemonFull;
};

export const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
      showsVerticalScrollIndicator={false}>
      {/* Types */}
      <View style={styles.container}>
        <Text style={styles.title}>Types</Text>
        <View style={styles.row}>
          {pokemon.types.map(({type}) => (
            <Text
              key={type.name}
              style={{...styles.regularText, marginRight: 10}}>
              {type.name}
            </Text>
          ))}
        </View>

        {/* Weight */}
        <Text style={{...styles.title, ...styles.section}}>Weight</Text>
        <Text style={styles.regularText}>{pokemon.weight} kg.</Text>
      </View>

      {/* Sprites */}
      <View style={{...styles.container, ...styles.section}}>
        <Text style={styles.title}>Sprites</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginHorizontal: -20}}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemon.sprites.back_default}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemon.sprites.front_shiny}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemon.sprites.back_shiny}
            style={styles.basicSprite}
          />
        </ScrollView>
      </View>

      {/* Skills */}
      <View style={{...styles.container, ...styles.section}}>
        <Text style={styles.title}>Base Skills</Text>
        <View style={styles.row}>
          {pokemon.abilities.map(({ability}) => (
            <Text
              key={ability.name}
              style={{...styles.regularText, marginRight: 10}}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Moves */}
      <View style={{...styles.container, ...styles.section}}>
        <Text style={styles.title}>Moves</Text>
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {pokemon.moves.map(({move}) => (
            <Text
              key={move.name}
              style={{...styles.regularText, marginRight: 10}}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={{...styles.container, ...styles.section}}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map((stat, i) => (
            <View key={stat.stat.name + i} style={styles.row}>
              <Text
                style={{...styles.regularText, marginRight: 10, width: 150}}>
                {stat.stat.name}
              </Text>
              <Text style={{...styles.regularText, fontWeight: 'bold'}}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Final Sprite */}
      <View style={{...styles.section, marginBottom: 20, alignItems: 'center'}}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 380,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  regularText: {
    fontSize: 19,
  },
  row: {
    flexDirection: 'row',
  },
  section: {
    marginTop: 20,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
