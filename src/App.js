import React from 'react';
import './App.css';
// css
import styled from "@emotion/styled";
// styled components
import { CssBaseline } from '@material-ui/core';

import PokemonType from './PokemonType';

import PokemonRow from './components/PokemonRow';

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

/*
** @emotion/styled is Case Sensitive, also pretty much the equivelant on vuejs's 
** built in <style></style>
*/
const Title = styled.h1`
  text-align: center; 
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  paddingTop: 1rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

/*
** Function based App component
*/
function App() {
  /*
  ** We use react hook to get state. eg. selectedItemSet sets the state for selectedItem  
  */
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedItem, selectedItemSet] = React.useState(null);

  /*
  ** useEffect() runs afunction in reaction to a change. Functions are placed in the array
  */

  React.useEffect(() => {
    fetch('http://localhost:3000/starting-react/pokemon.json')
      .then(resp => resp.json())
      .then(data => pokemonSet(data))
    //if the array is empty, this function gets run once when the page is loaded/mounted,
    // like vuejs's mounted
  }, [])

  return (
    <PageContainer>
      <CssBaseline />
      <Title className="title">Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <Input nput value={filter}
            onChange={(evt) => filterSet(evt.target.value)}
          />
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
                    onClick={(pokemon) => selectedItemSet(pokemon)}
                  />
                ))}
            </tbody>
          </table>
        </div>
        {/* below is the same code as above but shorter. Inside of selectedItem we have the 
        PokemonInfo component which we pass the selectedItem state which is being set byt the selectedItemSet 
        state on onClick */}
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </TwoColumnLayout>
    </PageContainer>
  );
}

export default App;

