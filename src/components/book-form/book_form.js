import React, { Component } from 'react';
import './book_form.css';
import {connect} from 'react-redux';
import {updateBook,addBook} from '../../redux/actions';

class BookForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: '',
      title: '',
      author: '',
      date: '',
      titleError: '',
      authorError: '',
      dateError: ''
     
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount(){
    this.clearErrors();
  }

  componentDidUpdate(prevProps){
      if(this.props.book.id !== prevProps.book.id){
        this.setState({
          id: this.props.book.id,
          title: this.props.book.title,
          author: this.props.book.author,
          date: this.props.book.date
        });
      }
  }

  clearBookForm(event){
    if(event.target.classList.contains('book-form-bg')) {
      const bookForm = document.querySelector('.book-form');
      const bookFormBg = document.querySelector('.book-form-bg');
      bookFormBg.classList.remove('book-form-bg-open');
      bookForm.classList.remove('book-form-open');
    }
    
  }

  exitForm(){
    const bookForm = document.querySelector('.book-form');
    const bookFormBg = document.querySelector('.book-form-bg');
    bookFormBg.classList.remove('book-form-bg-open');
    bookForm.classList.remove('book-form-open');
  }

  clearErrors(){
    const titleError = document.querySelector('.title-err');
    const authorError = document.querySelector('.author-err');
    const dateError = document.querySelector('.date-err');
    titleError.innerHTML = '';
    authorError.innerHTML = '';
    dateError.innerHTML = '';
  }

  submit(event){
    this.clearErrors();
    let errFlag = false;
    const bookForm = document.querySelector('.book-form');
    const titleError = document.querySelector('.title-err');
    const authorError = document.querySelector('.author-err');
    const dateError = document.querySelector('.date-err');
    event.preventDefault();
    if(this.state.title ==  null || this.state.title === ''){
      titleError.innerHTML = 'Title is required';
      errFlag = true;
    }
    if(this.state.author ==  null || this.state.author === ''){
      authorError.innerHTML = 'Author is required';
      errFlag = true;
    }
    if((new Date(this.state.date) === "Invalid Date") || isNaN(new Date(this.state.date))){
      dateError.innerHTML = 'Invalid date';
      errFlag = true;
    }
    if(this.state.date ==  null || this.state.date === ''){
      dateError.innerHTML = 'Date is required';
      errFlag = true;
    }
    this.props.books.forEach(bookInArr =>{
      if(!errFlag && (bookInArr.title.toLowerCase() === this.state.title.toLowerCase()) && (bookInArr.id !== this.state.id)){
        titleError.innerHTML = 'Title is Already exists';
        errFlag = true;
      }
    });

    if(errFlag === false){
      if(this.props.editState){
        this.props.updateBook(this.props.books,{
          id: this.state.id,
          title: this.state.title,
          author: this.state.author,
          date: this.state.date
        });
      }else{
        this.props.addBook(this.props.books,{
          id: this.state.id,
          title: this.state.title,
          author: this.state.author,
          date: this.state.date
        });
        this.setState({
          id: '',
          title: '',
          author: '',
          date: ''
        });
      }
      
      this.exitForm();
    }
    
    setTimeout(() =>{
      this.clearErrors();
    },3000);
  }

  render() {
    const title = this.props.editState ? 'Edit Book' : 'Add Book';
    return (
      <div className="book-form-bg" onClick={this.clearBookForm}>
        <div className="book-form">
          <button type="button" className="exit-form" 
          onClick={this.exitForm}>X</button>
          <form action="" onSubmit={this.submit}>
            <p className="book-form-header">{title}</p>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input 
                type="text" 
                className="form-control" 
                id="title" 
                value={this.state.title}
                onChange = {(event) => this.setState({title: event.target.value})}/>
                <small className="title-err"></small>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input 
                type="text" 
                className="form-control" 
                id="author"
                value={this.state.author}
                onChange = {(event) => this.setState({author: event.target.value})}/>
                <small className="author-err"></small>
            </div>
            <div className="form-group">
              <label htmlFor="date">Published Date</label>
              <input 
                type="text" 
                className="form-control" 
                id="date" 
                value={this.state.date}
                onChange = {(event) => this.setState({date: event.target.value})}/>
                <small className="date-err"></small>
            </div>
            <div>
              <button className="btn btn-primary btn-save">Save</button>
              <button 
                className="btn btn-secondary"
                type="button"
                onClick={this.exitForm}>
              Cancel
              </button>
            </div>  
          </form>
        </div> 
      </div> 
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    book: state.books.book,
    books: state.books.books,
    editState: state.books.editState
  };
}
export default connect(mapStateToProps,{updateBook,addBook})(BookForm);