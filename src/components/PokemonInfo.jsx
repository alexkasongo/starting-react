import React, { useContext } from 'react';
import PokemonContext from '../PokemonContext';
// import PokemonType from '../PokemonType';

const PokemonInfo = () => {
    const { selectedPokemon } = useContext(PokemonContext)

    // if we have a selecrtedPokemon we retun a React tree otherwise we return null
    return selectedPokemon ? (
        <div>
            <h1>{selectedPokemon.name.english}</h1>
            <table width="100%">
                {/* object.keys takes an object and returns an array */}
                {
                    Object.keys(selectedPokemon.base).map(key => (
                        <tbody key={key}>
                            <tr>
                                <td>{key}</td>
                                <td>{selectedPokemon.base[key]}</td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>
        </div>
    ) : null
};


// PokemonInfo.propTypes = PokemonType;

export default PokemonInfo;