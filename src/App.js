import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from  './components/header/header';
import Footer from  './components/footer/footer';
import Books from  './components/books/books';
import BookForm from './components/book-form/book_form';
import DeleteForm from './components/delete-form/delete_form';
import axios from 'axios';
import {Provider} from 'react-redux';
import store from './redux/store';

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      books: []
    }
  }
 
  render() {
    return (
      <Provider store = {store}>
      <div className="App">
          <Header />
          <Books />
          <Footer />
          <BookForm />
          <DeleteForm />
      </div>
      </Provider>
    );
  }
}

export default App;
