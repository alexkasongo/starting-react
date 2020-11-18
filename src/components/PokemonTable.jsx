import React from 'react';
import PokemonRow from './PokemonRow';

const PokemonTable = ({ pokemon, filter, selectedPokemonSet }) => (
    <table width="100%">
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
            </tr>
        </thead>
        {/* .includes is case sensitive so use toLowerCase */}
        <tbody >
            {pokemon
                .filter((pokemon) => pokemon.name.english
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase())
                )
                .slice(0, 20).map(pokemon => (
                    <PokemonRow
                        pokemon={pokemon}
                        onClick={(pokemon) => selectedPokemonSet(pokemon)}
                    />
                ))}
        </tbody>
    </table>
)

export default PokemonTable;