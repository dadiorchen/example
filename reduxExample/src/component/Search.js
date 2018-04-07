/* The component to input search condition : keyword and status */
//@flow
import React from "react";
import {searchModel} from '../model/Search.js'
import {connect} from 'react-redux'
import {type TypeState} from '../model/TypeState.js'


type Props = {
	status	: number,
	autoSearch	: boolean,
	changeStatus	: (status : number) =>  void,
	changeKeyword	: (keyword : string) => void,
}
export class Search extends React.Component<Props,{
	//state
	keyword	: string,
}>{
	constructor( props : Props){
		super(props);
		this.state = {
			keyword	: '',
		}
	}
	/********************** properties ************/
	/********************** react method ***********/
	/********************** component method *******/
	handleSearch = () => {
		this.props.changeKeyword(this.state.keyword)
	}

	handleChange = (e : any) => {
		this.setState({keyword:e.target.value},() => {
			//auto search
			if(this.props.autoSearch){
				this.handleSearch()
			}
		})
	}

	render(){
		console.warn('+++++render:search')
		return(
			<div
				style={{
					padding	: 5,
					background	: 'gray',
				}}
			>
				<div>
					<input type='text' onChange={this.handleChange} value={this.state.keyword} />
					<button
						onClick={this.handleSearch}
					>
					Search
					</button>
				</div>
				<div
					style={{
						margin	: 3,
						fontSize	: 19,
					}}
					className='search-status'
					onClick={() => {
						//change the status : -1 ,0 , 1  = ( a + 1 % 3 ) (-1,0)(0,1)(1,2)
						let newStatus = (this.props.status + 1 ) % 3
						if(newStatus === 2) newStatus = -1
						this.props.changeStatus(newStatus)
					}}
				>
					The status:
					<span
						style={{
							cursor	: 'pointer',
						}}
					>
					<strong>
					{this.props.status}
					</strong>
					</span>
				</div>
			</div>
		)
	}
}

const CSearch = require('../config.js').CONFIG.SANDBOX_RENDER() || 
	connect(
		(state : TypeState ) => {
			return {
				status	: state.search.status,
				autoSearch	: state.setting.autoSearch,
			}
		},
		{
			changeKeyword	: searchModel.actions.changeKeyword,
			changeStatus	: searchModel.actions.changeStatus,
		}
	)(Search)

export {CSearch}
