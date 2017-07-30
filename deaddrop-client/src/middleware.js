const promiseMiddleware = store => next => action => {
  if(isPromise(action.payload)) {
    action.payload.then(
      res => {
        action.payload = res;
        store.dispatch(action);
      },
      error => {
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );
    return;
  }
  next(action)
}

function isPromise(payload) {
  return payload && typeof payload.then === 'function';
}

export {
  promiseMiddleware
};
