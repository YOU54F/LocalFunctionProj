import { API } from './Api';
import { PactV3 } from '@pact-foundation/pact';

const providerWithConsumerA = new PactV3({
  consumer: 'consumer-react',
  provider: 'LocalFunctionProj'
});

describe('test LocalFunctionProj', () => {
  it('should return a response', () => {
    const name = 'world';
    const expectedMessage = `Hello, ${name}. This HTTP triggered function executed successfully.`;
    providerWithConsumerA
      .given('server is up')
      .uponReceiving('A request to get a personalised message')
      .withRequest({
        method: 'GET',
        path: '/',
        query: { name }
      })
      .willRespondWith({
        status: 200,
        body: expectedMessage,
        contentType: 'text/plain'
      });
    return providerWithConsumerA.executeTest((mockserver) => {
      const client = new API(mockserver.url);
      return client.getDemo(name).then((res) => {
        expect(res).toEqual(expectedMessage);
      });
    });
  });
});
