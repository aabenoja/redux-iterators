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

Caveat
=====

If the action is not an iterator it is passed on the next middleware. However,
this also means that passing the iterator to other middleware could result in
an error being thrown, since an iterator is not a flux standard action. Please
be sure to list `redux-iterator` first in your middleware list.
