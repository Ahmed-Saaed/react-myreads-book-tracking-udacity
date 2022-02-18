import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './book.js';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
  state = {
    query: '',
    search: [],
  };

  //clear the search on everymount
  componentDidMount() {
    this.setState(() => ({
      search: [],
    }));
  }

  // update the search list upon each input then loop on the response to find which books already exist  in the original state to update the state

  handleChange = (q) => {
    this.setState(() => ({
      query: q,
    }));

    if (q.length > 0) {
      BooksAPI.search(q)
        .then((response) => {
          let search = [];

          if (response) {
            search = response.map((search) => {
              const exist = this.props.books.find(
                (onShelf) => onShelf.id === search.id
              );
              if (exist) {
                return exist;
              } else {
                search.shelf = 'none';
                return search;
              }
            });
          }
          this.setState({
            search,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      this.setState(() => ({
        search: [],
      }));
    }
  };

  render() {
    let {search, query} = this.state;

    return (
      <div>
        <div className='search-books'>
          <div className='search-books-bar'>
            <Link to='/' className='close-search' />
            <div className='search-books-input-wrapper'>
              <input
                value={query}
                onChange={(event) => this.handleChange(event.target.value)}
                type='text'
                placeholder='Search by title or author'
              />
            </div>
          </div>
          <div className='search-books-results'>
            <ol className='books-grid'>
              {Array.isArray(search) ? (
                search.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    updateBook={this.props.updateBook}
                  />
                ))
              ) : (
                <div>try another book </div>
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
