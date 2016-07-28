export default function iteratorMiddleware({ dispatch }) {
  return next => action => {
    if (typeof action[Symbol.iterator] !== 'function') {
      return next(action);
    }

    for (let value of action) {
      dispatch(value);
    }
  };
}