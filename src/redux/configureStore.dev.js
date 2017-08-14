import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../components/DevTools';
import rootReducer from './reducers';

const enhancer = compose(
    applyMiddleware(thunk),
    DevTools.instrument()
);

export default function (initialState = {}) {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers').default;
            store.replaceReducer(nextReducer);
        })
    }

    return store;
}