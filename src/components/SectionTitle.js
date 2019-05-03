import styled from "styled-components";

const SectionTitle = styled.h1`
  overflow: hidden;
  text-align: center;
  font-weight: 500;

  &:before,
  &:after {
  background-color: #ccc;
  content: "";
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 50%;
  }

  &:before {
  right: 1rem;
  margin-left: -50%;
  }

  &:after {
  left: 1rem;
  margin-right: -50%;
  }
`

export default SectionTitle;