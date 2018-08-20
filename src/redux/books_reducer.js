import {GET_BOOKS,DELETE_BOOK,DELETE_BOOK_FORM,BOOKS_ERRORS,
  ADD_BOOK,CLEAR_ERRORS, EDIT_BOOK,UPDATE_BOOK,ADD_BOOK_FORM} from './types';
 

const initialState = {
 books: [],
 book: {},
 errors: {},
 deleteId: '',
 editState: false
}

export default function(state = initialState, action) {
 switch (action.type) {

   case CLEAR_ERRORS:
     return {
       ...state,
       errors: {}
     }
   case GET_BOOKS:
     return {
       ...state,
       books: action.payload,
       errors: {}
     };
   case ADD_BOOK:
     return {
       ...state,
       books: action.payload
     };
    case ADD_BOOK_FORM:
     return {
       ...state,
       book: action.payload,
       editState: false
     };
    case DELETE_BOOK:
     return {
       ...state,
       books: action.payload
     };
   case DELETE_BOOK_FORM:
     return {
       ...state,
       deleteId: action.payload
     };
   case BOOKS_ERRORS:
     return {
       ...state,
       errors: action.payload
     };   
    case EDIT_BOOK:
     return {
       ...state,
       book: action.payload,
       editState: true
     };
    case UPDATE_BOOK:
     return {
       ...state,
       books: action.payload
     };
   default:
     return state;
 }
}