import React from 'react';
import './App.css';
// css
import styled from "@emotion/styled";
// styled components
import { CssBaseline } from '@material-ui/core';

// import PokemonRow from './components/PokemonRow';
import PokemonInfo from './components/PokemonInfo';
import PokemonFilter from './components/PokemonFilter'
import PokemonTable from './components/PokemonTable'
import PokemonContext from './PokemonContext'

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
  ** Reducer: a function that takes state and an action, the state is the current state of the store
  ** the action is an object that defines the mutation that is to be applied to state 
  ** and then a new state is to be returned
  */
const pokemonReducer = (state, action) => {
  switch (action.type) {
    // take the current state and set the filter key to whatever the payload is
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    case 'SET_POKEMON':
      return {
        ...state,
        pokemon: action.payload
      };
    case 'SET_SELECTED_POKEMON':
      return {
        ...state,
        selectedPokemon: action.payload
      };
    default:
      throw new Error('No action 😅');
  }
}

/*
** Function based App component
*/
function App() {
  /*
  ** We use react hook to get state. eg. selectedPokemonSet sets the state for selectedPokemon  
  */
  // const [filter, filterSet] = React.useState("");
  // const [pokemon, pokemonSet] = React.useState([]);
  // const [selectedPokemon, selectedPokemonSet] = React.useState(null);
  const [state, dispatch] = React.useReducer(pokemonReducer, {
    pokemon: [],
    filter: '',
    selectedPokemon: null
  })

  /*
  ** useEffect() runs afunction in reaction to a change. Functions are placed in the array
  */
  React.useEffect(() => {
    fetch('http://localhost:3000/starting-react/pokemon.json')
      .then((resp) => resp.json())
      .then((payload) =>
        dispatch({
          type: 'SET_POKEMON',
          payload: payload
        })
      );
    //if the array is empty, this function gets run once when the page is loaded/mounted,
    // like vuejs's mounted.
  }, []);

  if (!state.pokemon) {
    return <div>Loading data</div>
  }

  return (
    // we wrap everything inside the provider, which is going to provide the data 
    // to any component in the tree from this level down
    <PokemonContext.Provider
      value={{
        // filter,
        // filterSet,
        // pokemon,
        // pokemonSet,
        // selectedPokemon,
        // selectedPokemonSet,
        state,
        dispatch,
      }}
    >
      <PageContainer>
        <CssBaseline />
        <Title className="title">Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>
          {/* below is the same code as above but shorter. Inside of selectedPokemon we have the 
        PokemonInfo component which we pass the selectedPokemon state which is being set by the selectedPokemonSet 
        state on onClick */}

          <PokemonInfo />
        </TwoColumnLayout>
      </PageContainer>
    </PokemonContext.Provider>
  );
}

export default App;

