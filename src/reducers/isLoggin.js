// import * as Types from './../constants/ActionTypes';

var initialState = false;

const isLoggin = (state = initialState, action) => {
	switch(action.type){
		case 'IS_LOGGIN':
			return action.isLoggin
		default: return state
	}
}

export default isLoggin