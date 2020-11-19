import React from 'react';
// set of property types which allow us to identify each ptoperty of our 
// components using types, eg. string, array, bool etc
import PropTypes from 'prop-types';
// styled components
import { Button } from '@material-ui/core';

import PokemonType from '../PokemonType';

/*
** components in react are created using a function 
*/
const PokemonRow = ({ pokemon, onClick }) => (
    <tr>
        <td>{pokemon.name.english}</td>
        <td>{pokemon.type.join(", ")}</td>
        <td>
            <Button
                variant="contained"
                color="primary"
                // onClick={() => console.log('You clicked me', pokemon)}
                onClick={() => {
                    onClick(pokemon)
                }}
            >More Information
            </Button>
        </td>
    </tr>
)

/*
** Typechecking With PropTypes 
*/
PokemonRow.propTypes = {
    pokemon: PropTypes.arrayOf(PokemonType),
};

export default PokemonRow;