import './App.css';
// set of property types which allow us to identify each ptoperty of our 
// components using types, eg. string, array, bool etc
import PropTypes from 'prop-types'
import pokemon from './pokemon.json'

// components in react are created using a function
const PokemonRow = ({ pokemon }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
  </tr>
)

// PropTypes
PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  }),
}

function App() {
  return (
    <div style={{
      margin: 'auto',
      width: '800',
      paddingTop: '1rem'
    }}>
      <h1 className="title">Pokemon Search</h1>
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.slice(0, 20).map(pokemon => (
            <PokemonRow pokemon={pokemon} key={pokemon.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
