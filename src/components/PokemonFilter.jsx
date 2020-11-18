import React from 'react'
// css
import styled from "@emotion/styled";

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

// we need filter and we need filterset useState hook
// this passed down as props, using {destructuring} 
const PokemonFilter = ({ filter, filterSet }) => (
    <Input nput value={filter}
        onChange={(evt) => filterSet(evt.target.value)}
    />
)

export default PokemonFilter