import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import update from 'immutability-helper';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Label } from 'reactstrap';

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
			<tr className='recipy-data' style={{display:this.props.recipy.display}}>
				<td>
					<div className='recipy-vew'>
						<table className='table table-hover'>
							<thead>			
								<tr className='table-primary'>
									<th scope='col' width='100%' >Ingredients</th>
								</tr>
							</thead>
							<tbody>
							{this.props.recipy.ingredients.map((x,i)=>{

								return <Ingredients key={this.props.recipy.title + '-Ingredient-' + i } item={x} step={i+1}/>
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
					<div className='list-title' onClick={this.props.show}><h4> {(this.props.recipy.display ==='none') ? "+" : "-" } {this.props.recipy.title}</h4></div>
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
			recipyBook: [{
				title: 'spaghetti',
				display: 'none',
				ingredients: ['noodles','sauce','meat balls']
			}],
			showModal: false,
		}
		this.removeRecipy = this.removeRecipy.bind(this);
		this.addRecipy = this.addRecipy.bind(this);
		this.showRecipy = this.showRecipy.bind(this);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	/*!!!!!!!!!!!! to do: create form to add custom recipy
	*/
	open() {
		this.setState({showModal: true});
}
  close() {
    this.setState({ showModal: false });
  }
  handleSubmit(event) {
  	var title = event.target.title.value;
  	var ingredients = event.target.ingredients.value.split(',');
  	var page = {title:title,display:'none',ingredients:ingredients};
  	var newBook = update(this.state.recipyBook, {$push:[page]});
  	this.setState({recipyBook:newBook, showModal: false});
  	event.preventDefault();
  }
	removeRecipy(index) {
		var newBook = update(this.state.recipyBook, {$splice: [[index,1]]});
		this.setState({recipyBook:newBook});
	}
	showRecipy(index) {
		var title = this.state.recipyBook[index].title;
		var recipy = this.state.recipyBook[index].ingredients
		var display = this.state.recipyBook[index].display;
		display = (display === 'none') ? '' : 'none';
		var page = {title:title,display:display,ingredients:recipy};
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
								//!!! change the binds
								<RecipyListItem className='recipy-data' key={i} recipy={recipy} show={this.showRecipy.bind(this, i)} remove={this.removeRecipy.bind(this, i)}/>,
								<RecipyData key={'row-expanded-' + i} recipy={recipy} title={recipy.title +"-"+i} />
								])
						})}				
					</tbody>
				</table>
				<button onClick={this.open}>add</button>
        <Modal isOpen={this.state.showModal}>
          <ModalHeader>Add Recipy</ModalHeader>
          <Form onSubmit={this.handleSubmit} action='#'>
	          <ModalBody>
		          <Label>title</Label><Input placeholder="Enter Title" type='text' name='title' />
		          <Label>ingredients</Label><Input type='textarea' rows='10' placeholder="seperate ingredients with a ," name='ingredients' />	                  
	          </ModalBody>
	          <ModalFooter>
	            <Button type='submit' color="primary" value='Submit'>Do Something</Button>{' '}
	            <Button color="secondary" onClick={this.close}>Cancel</Button>
	          </ModalFooter>
          </Form> 
        </Modal>
			</div>
		);
	}
}

ReactDOM.render(
  <RecipyList />,
    document.getElementById('root')
);