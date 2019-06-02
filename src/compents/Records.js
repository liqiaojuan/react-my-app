import React,{Component} from 'react';
import PropTypes from 'prop-types';
import * as RecordsAPI from '../utils/RecordsAPI' ;

export default class Records extends Component{
	constructor(){
		super();
		this.state={
			edit:false
		};
	}
	handleToggle(){
		this.setState({
			edit:!this.state.edit
		});
	}
	handleDelete(event){
		event.preventDefault();
		RecordsAPI.remove(this.props.record.id).then(
			response => this.props.handleDeleteRecord(this.props.record)
		).catch(
			error => console.log(error.message)
		)
	}
	
	handleEdit(event){
		event.preventDefault();
		const record={
			date:this.refs.date.value,
			title:this.refs.title.value,
			amout:this.refs.amout.value
		}
		console.log(record)
		RecordsAPI.update(this.props.record.id,record).then(
			
			response => {
				this.setState({edit:false});
				this.props.handleEditRecord(this.props.record,response.data);
			}
		).catch(
			error => console.log(error.message)
		)
		console.log(1)
	}
	
	recordRow(){
		return (
      		<tr>
      		  <td>{this.props.record.date}</td>
      		  <td>{this.props.record.title}</td>
      		  <td>{this.props.record.amout}</td>
      		  <td>
      		  <button className="btn btn-primary mr-1" onClick={this.handleToggle.bind(this)}>更新</button>
      		  <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>删除</button>
      		  </td>
      		</tr>
    	);
	}
	
	recordForm(){
		return (
      		<tr>
      		  <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref="date" /></td>
      		  <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref="title" /></td>
      		  <td><input type="text" className="form-control" defaultValue={this.props.record.amout} ref="amout"/></td>
      		  <td>
      		  <button className="btn btn-primary mr-1" onClick={this.handleEdit.bind(this)}>确定更新</button>
      		  <button className="btn btn-danger" onClick={this.handleToggle.bind(this)}>取消更新</button>
      		  </td>
      		</tr>
    	);
	}
	
	
	
	
	render(){
		if(this.state.edit){
			return this.recordForm();
		}else{
			return this.recordRow();
		}
	}
}


Records.propTypes ={
	id:PropTypes.string,
	date:PropTypes.string,
	title:PropTypes.string,
	amout:PropTypes.string
}
