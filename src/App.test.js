import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('UI should update after successfully calling a request', () => {
  const server = setupServer(...[
    rest.get('/data', (req, res, ctx) => res(ctx.json({
      data: 'new',
    }))),
    rest.put('/data', (req, res, ctx) => res(ctx.json({})))
  ]);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => {
    server.close();
  });

  // Not passed
  fit('Logic after request is resolved DOES NOT execute', () => {
    render(<App />);
    // Response from server isn't logged to console
    // screen.debug show UI before the request has done
    screen.debug()
    expect(screen.queryByText('Data: old')).not.toBeInTheDocument()
    expect(screen.queryByText('Data: new')).toBeInTheDocument()
  });

  // Passed (5%)/ Not Passed (95%)
  it('Logic after request is resolved DOES execute. (Use waitFor)', async () => {
    const spy = jest.spyOn(global, 'fetch')
    render(<App />);

    // We wait for fetch to execute, not wait when fetch has done
    // We expect to find a way to wait when fetch has done
    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1))
    // Response from server is logged to console but UI hasn't updated yet
    // Expect UI: `Data: new`
    screen.debug()
    expect(screen.queryByText('Data: old')).not.toBeInTheDocument()
    expect(screen.queryByText('Data: new')).toBeInTheDocument()
  });

  // Passed
  it('Logic after request is resolved DOES execute. (Use setTimeout)', (done) => {
    render(<App />);

    // It works but bad solution
    setTimeout(() => {
      //  UI updated
      screen.debug()
      // Expect to see the result logged to the console
      // Expect UI: `Data: new`
      // Response from server is logged to console but UI hasn't updated yet
      expect(screen.queryByText('Data: old')).not.toBeInTheDocument()
      expect(screen.queryByText('Data: new')).toBeInTheDocument()
      done()
    }, 1000)
  });
});
