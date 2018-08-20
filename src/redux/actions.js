import {GET_BOOKS,ADD_BOOK,DELETE_BOOK,CLEAR_ERRORS,
  EDIT_BOOK,UPDATE_BOOK,DELETE_BOOK_FORM,ADD_BOOK_FORM} from './types';
import axios from 'axios';

const URL = 'https://www.googleapis.com/books/v1/volumes?q=web+development';


export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: {}
  }
}

export const getBooks = () => dispatch =>{

    let myBooks = [];
    let googleBooks = [];
    
    axios.get(URL).then(data =>{
      googleBooks = data.data.items;
      googleBooks.forEach(googleBook =>{
        myBooks.push({
          id: googleBook.id,
          title: googleBook.volumeInfo.title,
          author: googleBook.volumeInfo.authors[0],
          date: googleBook.volumeInfo.publishedDate,
          image: googleBook.volumeInfo.imageLinks.thumbnail
        });
      });
      dispatch({
        type: GET_BOOKS,
        payload: myBooks
      }); 
    });
};

export const editBook = (book) => dispatch =>{
  return dispatch({
    type: EDIT_BOOK,
    payload: book
  });
}

export const updateBook = (books,book) => dispatch =>{

  const newArr = [];

  books.forEach(bookInArr =>{
    if(bookInArr.id === book.id){
      bookInArr.author = book.author;
      bookInArr.title = book.title;
      bookInArr.date = book.date;
    }
    newArr.push(bookInArr);
  }); 
  return dispatch({
    type: UPDATE_BOOK,
    payload: newArr
  });
}

export const deleteBookForm = (id) => dispatch => {
  return dispatch({
    type: DELETE_BOOK_FORM,
    payload: id
  });
}

export const addBook = (books,book) => dispatch => {

  let newArr  = [];
  books.forEach(bookInArr =>{
    newArr.push(bookInArr);
  });
  book.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_M7GYkU2drtb1VPTaKGXhTlcwKL45XZ21x5fLsDdwEMi0d8M";
  book.id = Date.now().toString();
  newArr.push(book);
  return dispatch({
    type: ADD_BOOK,
    payload: newArr
  });
}

export const addBookForm = () => dispatch => {
  return dispatch({
    type: ADD_BOOK_FORM,
    payload: {id:'', title: '',author: '',date:''}
  });
}

export const deleteBook = (books,id) => dispatch =>{

  const newArr = [];
  books.forEach(bookInArr =>{
    if(bookInArr.id !== id){
      newArr.push(bookInArr);
    } 
  }); 
  return dispatch({
    type: DELETE_BOOK,
    payload: newArr
  });
}