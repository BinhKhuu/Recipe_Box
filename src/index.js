import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import update from 'immutability-helper';

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
					<button className='list-delete' onClick={this.props.remove}>delete</button>
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
			recipyView: ['none','none'],
			recipyBook: [{
				title: 'spaghetti',
				display: 'none',
				recipy: ['noodles','sauce','meat balls']
			}],
		}
		this.removeRecipy = this.removeRecipy.bind(this);
		this.addRecipy = this.addRecipy.bind(this);
		this.showRecipy = this.showRecipy.bind(this);
	}
	addRecipy(index) {
		var page = {title:'new',display:'none',recipy:[]};
		var newBook = update(this.state.recipyBook, {$push:[page]});
		this.setState({recipyBook:newBook});
	}
	removeRecipy(index) {
		var newBook = update(this.state.recipyBook, {$splice: [[index,1]]});
		this.setState({recipyBook:newBook});
	}
	showRecipy(index) {
		var title = this.state.recipyBook[index].title;
		var recipy = this.state.recipyBook[index].recipy
		var display = this.state.recipyBook[index].display;
		display = (display === 'none') ? '' : 'none';
		var page = {title:title,display:display,recipy:recipy};
		var newBook = update(this.state.recipyBook, {$splice:[[index,1,page]]});
		this.setState({recipyBook: newBook})
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
						{this.state.recipyBook.map((recipy,i)=> {
							return ([
								<RecipyListItem className='recipy-data' show={this.showRecipy.bind(this, i)} key={i} title={recipy.title} remove={this.removeRecipy.bind(this, i)} />,
								<RecipyData key={'row-expanded-' + i} display={recipy.display}/>
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