import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
// css
import { TextField } from '@material-ui/core';
// import styled from "@emotion/styled";

// const Input = styled.input`
//   width: 100%;
//   font-size: x-large;
//   padding: 0.2rem;
// `;

// we need filter and we need filterset useState hook
// this passed down as props, using {destructuring} 
const PokemonFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter)

  return (
    <form noValidate>
      <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" value={filter}
        onChange={(evt) => dispatch({
          type: 'SET_FILTER',
          payload: evt.target.value
        })}
      />
    </form>
  )
};

export default PokemonFilter;