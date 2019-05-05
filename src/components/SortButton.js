import styled from "styled-components"

const SortButton = styled.button`
  background-color: ${props => props.active ? "#ececec" : "#fff"};
  border: 1px solid #d2d2d2;
  color: #555;
  font-size: 1rem;
  padding: .7rem 1.5rem; 
  cursor: pointer;
  margin: 0;

  &:not(:last-child) {
    border-right: none;
  }

  &:first-child {
    border-top-left-radius: .2rem;
    border-bottom-left-radius: .2rem;
  }

  &:last-child {
    border-top-right-radius: .2rem;
    border-bottom-right-radius: .2rem;
  }

  &:hover {
    background-color: #ececec
  }

  &:focus {
    outline: none;
  }
`

export default SortButton;