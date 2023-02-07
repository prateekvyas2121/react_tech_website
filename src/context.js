// context creation
// provider
// consumer -> deprecated
// useContext hook
import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';

let API = 'https://hn.algolia.com/api/v1/search?';

const AppContext = React.createContext();

const initialState = {
	isLoading: true,
	query: 'a',
	nbPages: 0,
	page: 0,
	hits: []
}
// create a provider function
const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)


  const fetchApiData = async(url) => {
  	dispatch({type: 'SET_LOADING'})
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      dispatch({
      	type: 'GET_STORIES',
      	payload: {
      		hits: data.hits,
      		nbPages: data.nbPages
      	}
      })
    } catch(error) {
      console.log(error)
    }
  }

  // to remove the post
  const removePost = (objectID) => {
  		dispatch({type: 'REMOVE_POST', payload: objectID});
  };

  // search
  const searchPost = (searchQuery) => {
  	dispatch({type: 'SEARCH_QUERY', payload: searchQuery})
  };

  // pagination

  const getPrevPage = () => {
  	dispatch({type: 'PREV_PAGE'})
  };

  const getNextPage = () => {
  	dispatch({type: 'NEXT_PAGE'})
  };

  useEffect(() => {
    return () => {
      fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    };
  }, [state.query, state.page])

	return (
			<AppContext.Provider value={{...state, removePost, searchPost, getPrevPage, getNextPage}}>
				{children}
			</AppContext.Provider>
		);
};

// custom hook
const useGlobalContext = () => {
	return useContext(AppContext)
};

export { AppContext, AppProvider, useGlobalContext };