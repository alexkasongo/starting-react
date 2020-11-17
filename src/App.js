import React from 'react'
import './App.css';
// set of property types which allow us to identify each ptoperty of our 
// components using types, eg. string, array, bool etc
import PropTypes from 'prop-types'
import pokemon from './pokemon.json'

// components in react are created using a function
const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button
        onClick={() => onSelect(pokemon)}
      >Select!</button>
    </td>
  </tr>
)

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

// PropTypes
PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
    onSelect: PropTypes.func,
  }),
}

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired
  })
}

function App() {
  // we use react hook to get state
  const [filter, filterSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);

  return (
    <div style={{
      margin: 'auto',
      width: '800',
      paddingTop: '1rem'
    }}>
      <h1 className="title">Pokemon Search</h1>
      <input value={filter}
        onChange={(evt) => filterSet(evt.target.value)}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '70% 30%',
          gridColumnGap: '1rem'
        }}
      >
        <div>
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
                .slice(0, 20).map(pokemon => (
                  <PokemonRow
                    pokemon={pokemon}
                    key={pokemon.id}
                    onSelect={(pokemon) => {
                      selectedItemSet(pokemon)
                    }}
                  />
                ))}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </div>
    </div>
  );
}

export default App;
