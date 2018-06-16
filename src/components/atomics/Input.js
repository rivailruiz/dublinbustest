import dc from "diet-cola";

const Input = dc("input")(`
    font-family: inherit;
    font-size: inherit;
    padding: 8px;
    margin: 0;
    color: white;
    background-color: tomato;
    border: 0;
    border-radius: 4px;
    appearance: none;
    &:hover {
    background-color: black;
    }
`);

export default Input;
