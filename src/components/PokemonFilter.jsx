import React, { useContext } from 'react'
// css
import { TextField } from '@material-ui/core';
// import styled from "@emotion/styled";
import PokemonContext from '../PokemonContext';

// const Input = styled.input`
//   width: 100%;
//   font-size: x-large;
//   padding: 0.2rem;
// `;

// we need filter and we need filterset useState hook
// this passed down as props, using {destructuring} 
const PokemonFilter = () => {
  const { state: { filter }, dispatch } = useContext(PokemonContext);
  // const { classes } = this.props;
  return (
    <form noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Outlined" variant="outlined" value={filter}
        onChange={(evt) => dispatch({
          type: 'SET_FILTER',
          payload: evt.target.value
        })}
      />
    </form>
  )
};

export default PokemonFilter;