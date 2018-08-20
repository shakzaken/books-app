import React, { Component } from 'react';
import './book_card.css';

export default class BookCard extends Component {

  constructor(props){
    super(props);
    
    this.isLetter = this.isLetter.bind(this);
    this.clearDoubleWhiteSpace = this.clearDoubleWhiteSpace.bind(this);
    this.titleFilter = this.titleFilter.bind(this);
  }
  editBook(){

  }

  isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }
  clearDoubleWhiteSpace(title){
    let newTitle='';
    let prev = 'x';
    for(let i = 0 ;i<title.length+1;i++){
      if(title[i] && (prev !== ' ' || title[i]!== ' ')){
        newTitle = newTitle.concat(title[i]);
      }
      prev = title[i];
    }
    return newTitle;
  }
  titleFilter(titleStr){
    let title = this.clearDoubleWhiteSpace(titleStr);
    let newTitle = '';
    for(let i = 0 ;i<title.length;i++){
      if (this.isLetter(title[i]) || title[i] === ' '){
        if(i === 0 || title[i-1] ===' '){
          newTitle = newTitle.concat(title[i].toUpperCase());
        }
        else if(title[i]!==' '){
          newTitle = newTitle.concat(title[i].toLowerCase());
        }
        else{
          newTitle = newTitle.concat(title[i]);
        }
      }
    }
    return newTitle;
  }

  render() {
    const book = this.props.book;
    return (
      <div className="book">
        <div className="book-card">
          <div className="book-card-image-container">
            <img src={book.image} alt=""/>
          </div>
          <div className="book-card-info">
            <small className="book-card-info-date">{book.date}</small>
            <h5 className="book-card-title">{this.titleFilter(book.title)}</h5>
            <p>{book.author}</p>
            <div className="book-card-info-footer">
              <a className="btn-edit"  onClick={() => this.props.editBook(this.props.book)}>
                <i className="fas fa-pencil-alt icon-edit"
                    >
                </i>
              </a>
              <a className="btn-delete" onClick={() => this.props.deleteBookForm(this.props.book)}>
                <i className="fas fa-trash-alt icon-delete"
                   >
                </i>
              </a>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}
