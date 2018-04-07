//@flow
/* This is the core redux reducer's type definition */
/* The whole state of application is defined here, and we can use it in every model to visit the state value (every reducer) */
import {Todo} from './Todo.js'
import {type TypeSetting} from './SettingModel.js'

export type TypeState = {
	todos	: {
		byIds	: {[string] : Todo},
		ids		: Array<string>,
	},
	search	: {
		keyword	: string,
		status	: number,
	},
	setting	: TypeSetting,
}

