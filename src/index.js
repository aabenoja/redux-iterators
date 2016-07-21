export default function iteratorMiddleware(store) {
  return next => action => {
    if (typeof action[Symbol.iterator] !== 'function') {
      return next(action);
    }

    for (let value of action) {
      if (value) {
        next(value);
      }
    }
  };
}