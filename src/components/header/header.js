import React, { Component } from 'react';
import './header.css';
import {connect} from 'react-redux';
import {addBookForm} from '../../redux/actions';

class Header extends Component {

  constructor(props){
    super(props);
    this.addBookForm = this.addBookForm.bind(this);
  }

  addBookForm(){
    this.props.addBookForm();
    const bookForm = document.querySelector('.book-form');
    const bookFormBg = document.querySelector('.book-form-bg');
    bookFormBg.classList.add('book-form-bg-open');
    bookForm.classList.add('book-form-open');
    
  }

  render() {
    return (
      <nav className="header">
         <p className="header-title" href="#">Books App by Yakir Zaken</p>
         <button className="header-button"
          onClick ={this.addBookForm}>
            Add new Book
         </button>
      </nav>
    )
  }
}


export default connect(null,{addBookForm})(Header);
  
