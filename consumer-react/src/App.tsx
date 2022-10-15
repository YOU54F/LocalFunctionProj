import { useState } from 'react';
import API from './Api';

export const App = () => {
  interface Model {
    name: string;
  }
  interface Response {
    data: string | 'No Response';
  }
  let initialState: Model = {
    name: 'world'
  };
  const inputStyle = { border: '1px solid black', height: 75, padding: 10 };
  const [model, setModel] = useState<Model>(initialState);
  const [response, setResponse] = useState<Response>();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    API.getDemo(model.name)
      .then((response) => {
        setResponse({ data: response });
        console.log(response);
      })
      .catch(function (error: any) {
        setResponse({ data: 'An error occurred, please try again later' });
        console.log(error);
      });
  };
  const onChangeHandler = (event: HTMLInputElement) => {
    const { name, value } = event;
    setModel((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <>
      <br />

      <form onSubmit={submitForm}>
        <table style={inputStyle}>
          <tbody>
            <tr>
              <td>Please enter name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={model.name}
                  size={36}
                  onChange={(e) => onChangeHandler(e.target)}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td align="right">
                <button type="submit">Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <br />
      {response?.data && (
        <table style={inputStyle}>
          <tbody>
            <tr>
              <td>Results:</td>
              <td>{response.data}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
export default App;
