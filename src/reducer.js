const reducer = (state, action) => {
	switch(action.type){
	case'SET_LOADING':
		return {
			...state,
			isLoading: true
		}
	case 'GET_STORIES':
		return {
			...state,
			hits: action.payload.hits,
			isLoading: false,
			nbPages: action.payload.nbPages,
		}
	case 'REMOVE_POST':
		return {
			...state,
			hits: state.hits.filter(
				(curElem) => curElem.objectID !== action.payload
			),
		}
	case 'SEARCH_QUERY':
		return {
			...state,
			query: action.payload
		}
	case 'NEXT_PAGE':
		let pageNum = state.page + 1
		if(pageNum >= state.nbPages){
			pageNum = 0
		}
		return {
			...state,
			page: pageNum
		}
	case 'PREV_PAGE':
		let prevPageNum = state.page
		if(prevPageNum <= 0){
			prevPageNum = 0
		}else{
			prevPageNum -= 1
		}
		return {
			...state,
			page: prevPageNum
		}
	}


	return state
};

export default reducer;