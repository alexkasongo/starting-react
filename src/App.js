import React from 'react'
import './App.css';
// set of property types which allow us to identify each ptoperty of our 
// components using types, eg. string, array, bool etc
import PropTypes from 'prop-types'
// css
import styled from '@emotion/styled'
// styled components
import { Button } from '@material-ui/core';
import { render } from '@testing-library/react';


/*
** components in react are created using a function 
*/
const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button
        variant="contained" color="primary"
        onClick={() => onSelect(pokemon)}
      >Select!</Button>
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

/*
** Typechecking With PropTypes 
*/
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

const Container = styled.div`
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
** Class based App component
*/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      pokemon: [],
      selectedItem: null,
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/starting-react/pokemon.json')
      .then(resp => resp.json())
      .then(data => this.setState({
        ...this.state,
        pokemon: data
      })
      );
  }

  // Render method does not take any methods
  render() {
    return (
      <Container>
        <Title className="title">Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <Input nput value={this.state.filter}
              onChange={(evt) => this.setState({
                ...this.state,
                filter: evt.target.value
              })}
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
                {this.state.pokemon
                  .filter((pokemon) => pokemon.name.english
                    .toLowerCase()
                    .includes(this.state.filter.toLowerCase())
                  )
                  .slice(0, 20).map(pokemon => (
                    <PokemonRow
                      pokemon={pokemon}
                      key={pokemon.id}
                      onSelect={(pokemon) => this.setState({
                        ... this.state,
                        selectedItem: (pokemon),
                      })}
                    />
                  ))}
              </tbody>
            </table>
          </div>
          {/* below is the same code as above but shorter. Inside of selectedItem we have the 
        PokemonInfo component which we pass the selectedItem state which is being set byt the selectedItemSet 
        state on onSelect */}
          {this.state.selectedItem && <PokemonInfo {...this.state.selectedItem} />}
        </TwoColumnLayout>
      </Container>
    )
  }
}

/*
** useEffect() runs afunction in reaction to a change. Functions are placed in the array
*/
//  React.useEffect(() => {
//   fetch('http://localhost:3000/starting-react/pokemon.json')
//     .then(resp => resp.json())
//     .then(data => pokemonSet(data))
// }, [])

export default App;
