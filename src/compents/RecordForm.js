import React,{Component} from 'react';
import * as RecordsAPI from '../utils/RecordsAPI' ;

export default class RecordForm extends Component{
	constructor(props){
		super(props);
		this.state={
			date:"",
			title:"",
			amout:""
		}
	}
	handleChange(event){
		let name,obj;
		name=event.target.name;
		
		this.setState((
			obj={},
			obj[""+name]=event.target.value,
			obj
		))
	}
	valid(){
		return this.state.date && this.state.title && this.state.amout
	}
	handleSubmit(event){
		event.preventDefault();
		
		const data={
			date:this.state.date,
			title:this.state.title,
			amout:this.state.amout
		};
		
		
		RecordsAPI.create(data).then(
			response => {
				this.props.handleNewRecord(response.data);
				this.setState({
					date:"",
					title:"",
					amout:""
				})
			}
		).catch(
			error => console.log(error.message)
		)
	}
	render(){
		return (
      		<form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
      		 	<div className="form-group mr-3">
      		 		<input type="text" className="form-control" value={this.state.date} onChange={this.handleChange.bind(this)} placeholder="Date" name="date" />
      		 	</div>
      		 	<div className="form-group mr-3">
      		 		<input type="text" className="form-control" value={this.state.title} onChange={this.handleChange.bind(this)} placeholder="Title" name="title" />
      		 	</div>
      		 	<div className="form-group mr-3">
      		 		<input type="text" className="form-control" value={this.state.amout} onChange={this.handleChange.bind(this)} placeholder="Amout" name="amout" />
      		 	</div>
      		 	<button type="submit" className="btn btn-primary" disabled={!this.valid()}>提交</button>
      		</form>
    
  		);
	}
}



