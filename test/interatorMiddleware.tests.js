import { should } from 'chai';
import middleware from '../src';

should();

function * creator() {
  yield { type: 'foo', payload: 'baz' };
  yield { type: 'bar', payload: 'meh' };
}

describe('iterator middleware', () => {
  let store;

  function dispatch(action) {
    const next = ({ type, payload }) => {
      store[type] = payload
    };
    middleware(null)(next)(action);
  }

  beforeEach(() => {
    store = {};
  }); 
  
  it('handles normal flux actions normally', () => {
    dispatch({ type: 'foo', payload: 'bar' });
    store.foo.should.equal('bar');
  });

  it('handles iterators as actions', () => {
    const action = creator();
    dispatch(action);
    store.foo.should.equal('baz');
    store.bar.should.equal('meh');
  });
});
