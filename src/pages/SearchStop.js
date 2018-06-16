import * as React from "react";

import Button from '../components/atomics/Button';
import Input from '../components/atomics/Input';
import Separator from '../components/atomics/Separator';
import Wrapper from '../components/atomics/Wrapper';

export default class SearchTop extends React.Component<*, *> {
  state = {
    errorMessage: "",
    results: [],
    stopId: ""
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

    console.log(`realTimeBusInformation`, realTimeBusInformation);

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
        <Separator />
        <Button onClick={() => submit(stopId)}>CLICK HERE!</Button>
        <Separator />
        {errorMessage && <p>Error:{errorMessage}</p>}
        <h1>Proximos Ônibus</h1>
        {results.map(result => <div>
            <p>Rota:{result.route}</p>
            <p>em {result.duetime} minutos</p>
            <p>para {result.destination} </p>
          </div>)}
      </Wrapper>
    );
  }
}
