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
class RecipyListItem extends React.Component {
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
					<button className='recipy-edit' onClick={this.props.edit} >edit</button>
				</td>
			</tr>
		)
	}
}

class RecipyList extends React.Component {
	render() {
		var i = this.props.index
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

class RecipyForm extends React.Component {
	render() {
		return (
			<Modal isOpen={this.props.show}>
        <ModalHeader>Add Recipy</ModalHeader>
        <Form onSubmit={this.props.handleSubmit} action='#'>
	        <ModalBody>
		        <Label>title</Label><Input placeholder="Enter Title" type='text' name='title' defaultValue={this.props.defaultVals.title}/>
		        <Label>ingredients</Label><Input type='textarea' rows='10' placeholder="seperate ingredients with a ," name='ingredients' defaultValue={this.props.defaultVals.ingredients} />	                  
	        </ModalBody>
	        <ModalFooter>
	          <Button type='submit' color="primary" value='Submit'>Save</Button>{' '}
	          <Button color="secondary" onClick={this.props.close}>Cancel</Button>
	        </ModalFooter>
        </Form> 
      </Modal>
		)
	}			
}

class RecipyBook extends React.Component {
	constructor (){
		super();
		/*editFlag : object indicating editing or adding a new recipy. 
				edit: boolean false = adding new item, 
				index: index of item to be changed, default 0
				title: recipy title at index location
				ingredients: recipy ingredients at index location
		*/
		if(sessionStorage.getItem('recipy')){
			this.state = {
				recipyBook: JSON.parse(sessionStorage.getItem('recipy')),
				showModal: false,
				editFlag: {
					edit: false,
					index: 0,
					title: "",
					ingredients: [],
				}
			}
		}
		else {
			this.state = {
				recipyBook: [{
					title: 'spaghetti',
					display: 'none',
					ingredients: ['noodles','sauce','meat balls']
				}],
				showModal: false,
				editFlag: {
					edit: false,
					index: 0,
					title: "",
					ingredients: [],
				}
			}			
		}

		this.removeRecipy = this.removeRecipy.bind(this);
		this.showRecipy = this.showRecipy.bind(this);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.edit = this.edit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
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
  	var newBook;
  	if(this.state.editFlag.edit === false) {
  		newBook = update(this.state.recipyBook, {$push:[page]});
  	} else {
  		var index = this.state.editFlag.index;
  		newBook = update(this.state.recipyBook, {$splice:[[index,1,page]]});
  	}
  	sessionStorage.setItem('recipy', JSON.stringify(newBook));	
  	this.setState({recipyBook:newBook, showModal: false, editFlag: {edit:false,index:0,title:"",ingredients: []} });
  	event.preventDefault();
  }
	removeRecipy(index) {
		var newBook = update(this.state.recipyBook, {$splice: [[index,1]]});
		sessionStorage.setItem('recipy', JSON.stringify(newBook));
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

	edit(index) {
		var title = this.state.recipyBook[index].title;
		var ingredients = this.state.recipyBook[index].ingredients;
		var inputVals = {edit: true, index: index, title: title, ingredients: ingredients};
		this.setState({showModal:true, editFlag: inputVals });
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
								<RecipyList className='recipy-data' key={i} recipy={recipy} index={i} show={()=>this.showRecipy(i)} remove={() => this.removeRecipy(i)} />,
								<RecipyListItem key={'row-expanded-' + i} recipy={recipy} title={recipy.title +"-"+i} edit={()=>this.edit(i)}/>
								])
						})}				
					</tbody>
				</table>
				<button onClick={this.open}>add</button>
        <RecipyForm show={this.state.showModal} close={this.close} handleSubmit={this.handleSubmit} defaultVals={this.state.editFlag} />
			</div>
		);
	}
}

ReactDOM.render(
  <RecipyBook />,
    document.getElementById('root')
);