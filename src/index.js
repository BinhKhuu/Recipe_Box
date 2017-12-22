import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import update from 'immutability-helper';

class Ingredients extends React.Component {
	render(){
		return (
			<tr className='table-info'>
				<td>{this.props.step}. {this.props.item}</td>
			</tr>
		);
	}
}
class RecipyData extends React.Component {
	render() {
		return (
			<tr className='recipy-data' style={{display:this.props.display}}>
				<td>
					<div className='recipy-vew'>
						<table className='table table-hover'>
							<thead>			
								<tr className='table-primary'>
									<th scope='col' width='100%' >Ingredients</th>
								</tr>
							</thead>
							<tbody>
							{this.props.ingredients.map((x,i)=>{
								return <Ingredients key={this.props.title + '-Ingredient-' + i } item={x} step={i+1}/>
							})}
							</tbody>
						</table>
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
					<div className='list-title' onClick={this.props.show}><h4> {(this.props.display =='none') ? "+" : "-" } {this.props.title}</h4></div>
					<i className='list-delete material-icons' onClick={this.props.remove}>delete</i>
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
	/*!!!!!!!!!!!! to do: create form to add custom recipy
	*/
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
						<tr className='table-success'>
							<th scope='col' width='100%'><h1>Recipy Book</h1></th>
						</tr>
					</thead>
					<tbody>
						{this.state.recipyBook.map((recipy,i)=> {
							return ([
								//!!! change parameters to pass object 
								<RecipyListItem className='recipy-data' show={this.showRecipy.bind(this, i)} key={i} title={recipy.title} remove={this.removeRecipy.bind(this, i)} display={recipy.display}/>,
								<RecipyData key={'row-expanded-' + i} display={recipy.display} ingredients={recipy.recipy} title={recipy.title +"-"+i} />
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