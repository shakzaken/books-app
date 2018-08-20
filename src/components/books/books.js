import React, { Component } from 'react';
import './books.css';
import BookCard from './book_card';
import {connect} from 'react-redux';
import {getBooks,editBook,deleteBookForm} from '../../redux/actions';

class Books extends Component {

  constructor(props){
    super(props);
    this.editBook = this.editBook.bind(this);
    this.deleteBookForm = this.deleteBookForm.bind(this);

  }

  componentDidMount(){
    this.props.getBooks();
  }

  editBook(book){
    this.props.editBook(book);
    const bookForm = document.querySelector('.book-form');
    const bookFormBg = document.querySelector('.book-form-bg');
    bookFormBg.classList.add('book-form-bg-open');
    bookForm.classList.add('book-form-open');
  }

  deleteBookForm(book){
    this.props.deleteBookForm(book.id);
    const deleteForm = document.querySelector('.delete-form');
    const deleteFormBg = document.querySelector('.delete-form-bg');
    deleteFormBg.classList.add('delete-form-bg-open');
    deleteForm.classList.add('delete-form-open');
    
  }



  render() {
    const booksUI = this.props.books
      .map((book) => 
        <BookCard 
          book={book} 
          key={book.id} 
          editBook ={this.editBook}
          deleteBookForm = {this.deleteBookForm}
          />);
     
    return (
      <div onClick={this.clearForms}>
      <div className="books">  
        {booksUI}
      </div>
      </div>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books.books
  }
}

export default connect(mapStateToProps,
  {getBooks,editBook,deleteBookForm})(Books);