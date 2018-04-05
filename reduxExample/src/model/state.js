//@flow
/* This is the core reducer for redux */
import {combineReducers} from 'redux'
import todoModel from './TodoModel.js'
import {searchModel} from './Search.js'
import settingModel from './SettingModel.js'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {type TypeState} from './TypeState.js'

/* This is the core state of the whole app */
const state = combineReducers({
	todos	: combineReducers({
		byIds	: todoModel.reducers.byIds,
		ids		: todoModel.reducers.ids,
	}),
	search	: searchModel.reducers.search,
	setting	: settingModel.reducers.setting,
})

export default state

/* Wrap the way to get store, for test and app */
export function getStore() :{
		dispatch	: (any) => void,
		getState : () => TypeState,
}{
	return compose(applyMiddleware(thunk))(createStore)(state)
}
