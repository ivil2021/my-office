import styled from '@emotion/styled';

export const UserTableContainer = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid black;
  background-color: lightblue;
`;

export const FormContainer = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  text-align: left;

  h3 {
    margin-bottom: 20px;
    text-align: center;
  }

  label {
    display: block;
    margin-top: 15px;
  }

  input {
    width: 100%;
    margin-bottom: 4px;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid black;
  }

  button {
    display: block;
    width: 100%;
    margin-top: 20px;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    color: white;
    background-color: blue;
    
    &:hover {
      background-color: darkblue;
    }
  }
`;

export const TextError = styled.div`
  color: red;
`;
