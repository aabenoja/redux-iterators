import { should } from 'chai';
import configureMockStore from 'redux-mock-store';
import iterator from '../src';

should();

function* simpleCreator() {
  yield { type: 'foo', payload: 'baz' };
  yield { type: 'bar', payload: 'meh' };
}

describe('iterator middleware', () => {
  let store;
  let nextCalled;
  let dispatchCalled;

  function dispatch(testAction) {
    const next = () => { nextCalled = true; };
    iterator(store)(next)(testAction);
  }

  beforeEach(() => {
    nextCalled = false;
    dispatchCalled = false;
    store = {
      dispatch() {
        dispatchCalled = true;
      }
    };
  });

  it('sends flux standard actions to next middleware', () => {
    dispatch({ type: 'foo', payload: 'bar' });
    nextCalled.should.be.true;
  });

  it('dispatches actions from iterator from the top', () => {
    dispatch(function* () { yield { type: 'foo', payload: 'bar' }; }())
    dispatchCalled.should.be.true;
  });
});
