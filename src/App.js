import React from 'react';
import {Route, Routes} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

import BooksList from './components/books';
import Search from './components/search';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  //fetch the books from the api

  async componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  //update the shelf and call the api again
  updateBook = () => {
    let {value, book} = this.state;

    if (value.length > 0)
      BooksAPI.update(book, value).then(() => {
        book.shelf = value;
      });

    this.componentDidMount();
  };

  //use the callback of this state to call the update function on every change happend to the ui

  shelfChange = (value, book) => {
    this.setState(() => ({value: value, book: book}), this.updateBook);
  };

  render() {
    return (
      <div className='app'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <BooksList
                books={this.state.books}
                shelfChange={this.shelfChange}
              />
            }
          />
          <Route
            path='/search'
            element={
              <Search books={this.state.books} shelfChange={this.shelfChange} />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
