//@flow
/* The model for setting */

export type TypeDisplayMode = 0 | 1
export type TypeSetting = {
	displayMode	: TypeDisplayMode,
	autoSearch	: boolean,
}

class SettingModel {
	constructor(){
	}

	reducers = {
		setting	: (state : TypeSetting = {displayMode : 0,autoSearch : false} ,action : any) => {
			switch(action.type){
				case 'SETTING_DISPLAY_MODE_UPDATE' : {
					const newState = {...state}
					newState.displayMode = action.displayMode
					return newState
				}
				case 'SETTING_AUTO_SEARCH_UPDATE' : {
					const newState = {...state}
					newState.autoSearch = action.autoSearch
					return newState
				}
				default :
					return state
			}
		},
	}
	
	actions = {
		displayModeUpdate : (displayMode : TypeDisplayMode) => {
			return {
				type	: 'SETTING_DISPLAY_MODE_UPDATE',
				displayMode,
			}
		},
		autoSearchUpdate : (autoSearch : boolean) => {
			return {
				type	: 'SETTING_AUTO_SEARCH_UPDATE',
				autoSearch,
			}
		},
	}
}

const settingModel = new SettingModel()
export default settingModel
