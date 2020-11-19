// set of property types which allow us to identify each ptoperty of our 
// components using types, eg. string, array, bool etc
import PropTypes from 'prop-types';

/*
** components in react are created using a function 
*/
const PokemonType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.shape({
        english: PropTypes.string.isRequired,
        japanese: PropTypes.string.isRequired,
        chinese: PropTypes.string.isRequired,
        french: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
    base: PropTypes.shape({
        HP: PropTypes.number.isRequired,
        Attack: PropTypes.number.isRequired,
        Defense: PropTypes.number.isRequired,
        "Sp. Attack": PropTypes.number.isRequired,
        "Sp. Defense": PropTypes.number.isRequired,
        Speed: PropTypes.number.isRequired,
    }),
});

PropTypes.arrayOf(

)

export default PokemonType;