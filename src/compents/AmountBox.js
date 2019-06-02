import React,{Component} from 'react';

const AmountBox =({text,type,amout}) =>{
	return(
		<div className="col">
			<div className="card">
				<div className={`card-header bg-${type} text-white`}>
				 {text}
				</div>
				<div className="card-body">
				{amout}
				</div>
			</div>
		</div>
	);
}

export default AmountBox