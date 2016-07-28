[![Build Status](https://travis-ci.org/aabenoja/redux-iterators.svg?branch=master)](https://travis-ci.org/aabenoja/redux-iterators)

redux-iterators
==============

Get better composition out of your action creators with iterators.

```javascript
// composedActionCreator.js
async function gueryStuff(dispatch) {
  const fetched = await fetch('sum.url.com');
  dispatch(fetchedAction(fetched));
}

function mahPromise() {
  return new Promise((resolve, reject) => {
    post('sum.other.url.com')
      .then(() => resolve({ type: 'posted.data' }));
  });
}

export function* composedActionCreator() {
  yield { type: 'foo', payload: 'bar' };
  yield queryStuff;
  yield mahPromise();
}

// store creation
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(reduxIterator, reduxPromise, reduxThunk)
);

// component
dispatch(composedActionCreator());
```
