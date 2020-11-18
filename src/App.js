import React from 'react';
import './App.css';
// css
import styled from "@emotion/styled";
// styled components
import { CssBaseline } from '@material-ui/core';

// import PokemonRow from './components/PokemonRow';
import PokemonInfo from './components/PokemonRow';
import PokemonFilter from './components/PokemonFilter'
import PokemonTable from './components/PokemonTable'

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

/*
** Function based App component
*/
function App() {
  /*
  ** We use react hook to get state. eg. selectedPokemonSet sets the state for selectedPokemon  
  */
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedPokemon, selectedPokemonSet] = React.useState(null);

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
          <PokemonFilter
            filter={filter}
            filterSet={filterSet}
          />
          <PokemonTable
            filter={filter}
            pokemon={pokemon}
            selectedPokemonSet={selectedPokemonSet}
          />
        </div>
        {/* below is the same code as above but shorter. Inside of selectedPokemon we have the 
        PokemonInfo component which we pass the selectedPokemon state which is being set byt the selectedPokemonSet 
        state on onClick */}
        {selectedPokemon && <PokemonInfo {...selectedPokemon} />}
      </TwoColumnLayout>
    </PageContainer>
  );
}

export default App;

