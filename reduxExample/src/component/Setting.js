//@flow
import React from "react";
import {connect} from 'react-redux'
import {type TypeState} from '../model/TypeState.js'
import settingModel,{type TypeDisplayMode} from '../model/SettingModel.js'


type Props = {
	displayMode	: TypeDisplayMode,
	autoSearch	: boolean,
	autoSearchUpdate	: (autoSearch : boolean) => void,
	displayModeUpdate	: (displayMode : TypeDisplayMode ) => void,
}
export class Setting extends React.Component<Props,{
	//state
}>{
	constructor( props : Props){
		super(props);
		this.state = {
		}
	}
	/********************** properties ************/
	/********************** react method ***********/
	componentWillReceiveProps(nextProps : any){
		console.log('the next props:',nextProps)
	}
	
	/********************** component method *******/
	render(){
		return(
			<div>MyComponent...
				<p
					onClick={() => {
						//$FlowFixMe
						this.props.displayModeUpdate((this.props.displayMode + 1) % 2)
					}}
					className='display-mode'
				>{this.props.displayMode}</p>
				<p
					onClick={() => {
						console.log('click auto search',this.props.autoSearch)
						this.props.autoSearchUpdate(!this.props.autoSearch)
					}}
				>{this.props.autoSearch? 'true':'false'}</p>
			</div>
		)
	}
}

const CSetting = connect(
	(state : TypeState) => {
		return {
			displayMode	: state.setting.displayMode,
			autoSearch	: state.setting.autoSearch,
		}
	},
	(dispatch) => {
		return {
			autoSearchUpdate	: (autoSearch : boolean) => dispatch(settingModel.actions.autoSearchUpdate(autoSearch)),			
			displayModeUpdate	: (displayMode : TypeDisplayMode) => dispatch(settingModel.actions.displayModeUpdate(displayMode)),
		}
	},
)(Setting)

export {CSetting}