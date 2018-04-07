//@flow
import settingModel from './SettingModel.js'

const store = require('./state.js').getStore()

describe('TestSettingModel',() => {
	it('TEstSettingUpdate',() => {
		store.dispatch(settingModel.actions.settingDisplayModeUpdate(1))
		expect(store.getState().setting.displayMode).toBe(1)
		expect(store.getState().setting.autoSearch ).toBe(false)
		store.dispatch(settingModel.actions.settingAutoSearchUpdate(true))
		expect(store.getState().setting.autoSearch ).toBe(true)
	})
})
