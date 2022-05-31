import { createStore } from 'redux'

const reducerFn = (state = { selectMode: 'dark' }, action) => {
    return state;
}
const store = createStore(reducerFn)
export default store