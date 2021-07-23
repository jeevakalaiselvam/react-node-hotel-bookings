//Instead of starting state as {}, We can obtain auth info from local storage and set it to state. This will prevent state from being lost with browser reload

let userState;

if (window.localStorage.getItem('auth')) {
  userState = JSON.parse(window.localStorage.getItem('auth'));
} else {
  userState = null;
}

//Actions are of format -> { type: "LOGGED_IN_USER" , payload: { name: "Ryan" , role: "Seller"}}
export const authReducer = (state = userState, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return action.payload;
    default:
      return { ...state }; //For default we always return the previous state
  }
};
