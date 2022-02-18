import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Book from './book';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
  state = {
    query: '',
    search: [],
  };

  //clear the search on every mount
  componentDidMount() {
    this.setState(() => ({
      search: [],
    }));
  }

  // controlled search input and use the user input to call the api

  handleChange = (q) => {
    this.setState(() => ({
      query: q,
    }));

    if (q.length > 0) {
      BooksAPI.search(q)
        .then((search) => {
          this.setState(() => ({
            search,
          }));
        })
        .catch((err) => {
          console.error(err);
          this.setState(() => ({
            search: [],
          }));
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
                    shelfChange={this.props.shelfChange}
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
