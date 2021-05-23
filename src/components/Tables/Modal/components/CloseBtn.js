import styled from 'styled-components'

export const CloseBtn = styled.button`
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem auto;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  text-shadow: 0 1px 0 #fff;
  color: #000;
  opacity: 0.5;
  &:hover {
    opacity: 0.75;
    text-decoration: none;
  }
  &:focus {
    outline: 1px dotted;
  }
`
