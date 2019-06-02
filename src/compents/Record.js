import React,{Component} from 'react';
import Records from './Records';
import {getJSON} from 'jquery';
import axios from 'axios';
import * as RecordsAPI from '../utils/RecordsAPI';
import RecordForm from './RecordForm';
import AmountBox from './AmountBox';

 class Record extends Component{
	
	constructor(){
		super();
		this.state={
			error:null,
			isLoaded:false,
			records:[]
		}
	}
	
	componentDidMount(){
		//axios.get(RecordsAPI.api).then(
			axios.get("https://5cedfc701c2baf00142cb8f8.mockapi.io/api/v1/records").then(
			//RecordsAPI.getAll().then(
			response => this.setState({
				records: response.data,
				isLoaded:true
			})
		).catch(
			error => this.setState({
				isLoaded:true,
				error:error
			})
		)
	}
	
	addRecord(record) {
    this.setState({
      error: null,
      isLoaded: true,
      records: [
        ...this.state.records,
        record
      ]
    })
  }
	
	updateRecord(record,data){
		const recordIndex=this.state.records.indexOf(record);
		const newRecords= this.state.records.map((item,index)=>{
			if(index !== recordIndex){
				return item;
			}
			return{
				...item,
				...data
			};
		});
		this.setState({
			records:newRecords
		})
	}
	
	deleteRecord(record){
		const recordIndex=this.state.records.indexOf(record);
		const newRecords = this.state.records.filter((item,index)=> index !== recordIndex)
		this.setState({
			records:newRecords
		});
	}
	
	
	credits(){
		let credits =this.state.records.filter((record) =>{
			return record.amout >=0;
		})
		return credits.reduce((prev,curr)=>{
			return prev + Number.parseInt(curr.amout,0)
		},0)
	}
	debits(){
		let credits =this.state.records.filter((record) =>{
			return record.amout < 0;
		})
		return credits.reduce((prev,curr)=>{
			return prev + Number.parseInt(curr.amout,0)
		},0)
	}
	balance(){
		return this.credits()+this.debits()
	}
	
	
	render(){
		const{error,isLoaded,records}=this.state;
		let recordsComponent;
		if(error){
			recordsComponent = <div>Error:{error.message}</div>;
		}else if(!isLoaded){
			recordsComponent = <div>Loading...</div>
		}else{
			recordsComponent =(
				
			      	<table className="table table-bordered">
			      	
			      	<thead>
			      	
			      		<tr> 
			      		 	<th>Date</th>
			      		    <th>Title</th>
			      		    <th>Amount</th>
			      		    <th>Action</th>
			      		 </tr>
			      	</thead>
			      		<tbody>
			      		 {records.map((record) => (
			      		 	<Records 
			      		 	key={record.id}  
			      		 	record={record} 
			      		 	handleEditRecord={this.updateRecord.bind(this)} 
			      		 	handleDeleteRecord={this.deleteRecord.bind(this)}
			      		 	/>
			      		 ))}
			      		</tbody>
			      	</table>
  				);
			}
		return(
			<div>
			    <h2>Record</h2>
			    
			    <RecordForm  handleNewRecord={this.addRecord.bind(this)}/>
			    
			    
			    <div className="row mb-3">
			    <AmountBox  text="Credits" type="success" amout={this.credits()}/>
			    <AmountBox  text="Debits"  type="danger"  amout={this.debits()}/>
			    <AmountBox  text="Balance" type="info"    amout={this.balance()}/>
			    
			    </div>
			    
			    {recordsComponent}
			</div>
		);
	}
}

export default Record;