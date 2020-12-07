import React from 'react';
import './App.css';
// css
import styled from "@emotion/styled";
// styled components
import { CssBaseline } from '@material-ui/core';
// redux
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// import PokemonRow from './components/PokemonRow';
import PokemonInfo from './components/PokemonInfo';
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
** Reducer: a function that takes state and an action, the state is the current state of the store
** the action is an object that defines the mutation that is to be applied to state 
** and then a new state is to be returned
*/
const pokemonReducer = (state = {
  pokemon: [],
  filter: '',
  selectedPokemon: null,
}, action) => {
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
      return state;
    // throw new Error('No action 😅');
  }
}

// our store
const store = createStore(pokemonReducer)

/*
** Function based App component
*/
function App() {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon)

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

  if (!pokemon) {
    return <div>Loading data</div>
  }

  return (
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
  );
}

export default () => <Provider store={store}><App /></Provider>;

