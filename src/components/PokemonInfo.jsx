import React from 'react';
import PokemonType from './PokemonType';

const PokemonInfo = ({ name, base }) => (
    <div>
        <h1>{name.english}</h1>
        <table width="100%">
            {/* object.keys takes an object and returns an array */}
            {
                Object.keys(base).map(key => (
                    <tbody key={key}>
                        <tr>
                            <td>{key}</td>
                            <td>{base[key]}</td>
                        </tr>
                    </tbody>
                ))
            }
        </table>
    </div>
)


PokemonInfo.propTypes = PokemonType;

export default PokemonInfo;