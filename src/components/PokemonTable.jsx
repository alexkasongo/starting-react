import React, { useContext } from 'react';
import PokemonContext from '../PokemonContext';
import PokemonRow from './PokemonRow';

const PokemonTable = () => {
    const { pokemon, filter, selectedPokemonSet } = useContext(PokemonContext);

    return (
        <table width="100%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                </tr>
            </thead>
            {/* .includes is case sensitive so use toLowerCase */}
            <tbody>
                {pokemon
                    .filter((pokemon) => pokemon.name.english
                        .toLowerCase()
                        .includes(filter.toLowerCase())
                    )
                    .slice(0, 20)
                    .map((pokemon) => (
                        <PokemonRow
                            key={pokemon.id}
                            pokemon={pokemon}
                            onClick={(pokemon) => {
                                selectedPokemonSet(pokemon)
                            }}
                        />
                    ))}
            </tbody>
        </table>
    )
};

export default PokemonTable;