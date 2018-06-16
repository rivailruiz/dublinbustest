import * as React from "react";
import dc from "diet-cola";

const Wrapper = dc("div")(`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`);

const Separator = dc("div")(`
    margin: 40px 0px 40px 0px;
`);

const Button = dc("button")(`
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

export default class SearchTop extends React.Component<*, *> {
  state = {
    stopId: "",
    results: [],
    errorMessage: ""
  };

  handleInputChange = event => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value
    });
  };

  submit = async stopId => {
    const response = await fetch(
      `https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${stopId}&format=json`
    );
    const realTimeBusInformation = await response.json();
    const { results, errormessage } = realTimeBusInformation;
    this.setState({ results, errorMessage: errormessage });
  };

  render() {
    const { state, submit, handleInputChange } = this;
    const { stopId, results, errorMessage } = state;

    return (
      <Wrapper>
        <Separator />
        <Input name="stopId" value={stopId} onChange={handleInputChange} />
        <p>stopId: {stopId}</p>
        <Separator />
        <Button onClick={() => submit(stopId)}>CLICK HERE!</Button>
        <Separator />
        {errorMessage && <p>Error:{errorMessage}</p>}
        {results.map(result => <p>{result}</p>)}
      </Wrapper>
    );
  }
}
