import { should } from 'chai';
import configureMockStore from 'redux-mock-store';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import iterator from '../src';

should();

const createMockStore = configureMockStore([ promise, thunk, iterator ]);

function* complexCreator() {
  yield { type: 'foo', payload: 'bar' };
  yield new Promise(resolve => {
    resolve({ type: 'bar', payload: 'baz' });
  });
  yield dispatch => dispatch({ type: 'foobar', payload: 'barbaz' });
}

describe('iterator middleware integration', () => {
  let store;

  beforeEach(() => {
    store = createMockStore({});
  });

  it('integrates well with other middleware', () => {
    const action = complexCreator();
    store.dispatch(action);

    setTimeout(() => {
      const actions = store.getActions();
      actions.should.have.length(3);
    }, 0);
  });
});
