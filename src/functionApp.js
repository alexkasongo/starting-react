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
        <Container>
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
                                        onSelect={(pokemon) => {
                                            selectedItemSet(pokemon)
                                            console.log(`App.js - 115 - we here`, selectedItem);
                                        }}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
                {/* below is the same code as above but shorter. Inside of selectedItem we have the 
          PokemonInfo component which we pass the selectedItem state which is being set byt the selectedItemSet 
          state on onSelect */}
                {selectedItem && <PokemonInfo {...selectedItem} />}
            </TwoColumnLayout>
        </Container>
    );
}

export default App;
