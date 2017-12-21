import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class RecipyData extends React.Component {
	//*** things to do 
	// create state that holds recipy data
	// from recipy data crate table that holds data
	// think about better datastructure for state
	render() {
		return (
			<tr className='recipy-data' style={{display:this.props.display}}>
				<td>
					<div className='recipy-vew'>
						
					</div>
					<button className='recipy-edit'>edit</button>
				</td>
			</tr>
		)
	}
}

class RecipyListItem extends React.Component {
	render() {
		return (
			<tr>
				<td className ='list-item'>
					<div className='list-title' onClick={this.props.show}>{this.props.title}</div>
					<button class='list-delete' onClick={this.props.remove}>delete</button>
				</td>
			</tr>
		)
	}
}

class RecipyList extends React.Component {
	constructor (){
		super();
		this.state = {
			recipyList: ['o hai', 'mark'],
			recipyView: ['none','none']
			//can have array that tracks which items are hidden and when are dispalyed for the recipyView
		}
		this.removeRecipy = this.removeRecipy.bind(this);
		this.addRecipy = this.addRecipy.bind(this);
		this.showRecipy = this.showRecipy.bind(this);
	}
	addRecipy(index) {
		var rows = this.state.recipyList;
		var data = this.state.recipyView;
		rows.push('new');
		data.push('none');
		this.setState({recipyList:rows })
	}
	removeRecipy(index) {
		var list = this.state.recipyList;
		list.splice(index,1);
		this.setState({recipyList: list});		
	}
	showRecipy(index) {
		var display = this.state.recipyView;
		var toggle = (display[index] === 'none') ? '' : 'none';
		display.splice(index,1);
		display.splice(index,0,toggle);
		this.setState({recipyView:display});
	}
	render() {
		return (
			<div className='background'>
				<table className='table'>
					<thead>
						<tr className='thead-light'>
							<th scope='col' width='100%' >Recipy</th>
						</tr>
					</thead>
					<tbody>
						{this.state.recipyList.map((x,i)=> {
							return ([
								<RecipyListItem className='recipy-data' show={this.showRecipy.bind(this, i)} key={i} title={this.state.recipyList[i]} remove={this.removeRecipy.bind(this, i)} />,
								<RecipyData key={'row-expanded-' + i} display={this.state.recipyView[i]}/>
								])
						})}				
					</tbody>
				</table>
				<button onClick={this.addRecipy}>add</button>
			</div>
		);
	}
}

ReactDOM.render(
  <RecipyList />,
    document.getElementById('root')
);