import React, { Component } from 'react';
import './delete_form.css';
import {connect} from 'react-redux';
import {deleteBook} from '../../redux/actions';

class DeleteForm extends Component {

  constructor(props){
    super(props);
    this.deleteBook = this.deleteBook.bind(this);
  }

  cancelDelete(event){
    if(event.target.classList.contains('delete-form-bg') ||
      event.target.classList.contains('delete-form-cancel')) {
        const deleteForm = document.querySelector('.delete-form');
        const deleteFormBg = document.querySelector('.delete-form-bg');
        deleteForm.classList.remove('delete-form-open');
        deleteFormBg.classList.remove('delete-form-bg-open');
      }
    
  }

  deleteBook(){
    this.props.deleteBook(this.props.books,this.props.bookId);
    const deleteForm = document.querySelector('.delete-form');
    const deleteFormBg = document.querySelector('.delete-form-bg');
    deleteForm.classList.remove('delete-form-open');
    deleteFormBg.classList.remove('delete-form-bg-open');
  }

  
  render() {
    return (
      <div className="delete-form-bg" onClick={this.cancelDelete}>
        <div className="delete-form">
          <p className="delete-form-message">Are you sure you want to delete this book?</p>
          <div className="delete-form-body">
            <button 
              type="button" 
              className="delete-form-button btn btn-danger"
              onClick={this.deleteBook}>
              Yes
            </button>
            <button type="button" className="delete-form-cancel btn btn-secondary"
            onClick={this.cancelDelete}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    bookId: state.books.deleteId,
    books: state.books.books
  };
}
export default connect(mapStateToProps,{deleteBook})(DeleteForm);