import { createContext, useReducer } from "react";

function authReducer(state, action) {
    switch(action.type){
        case 'login': 
            const {username, token} = action;
            if(!username || !token)
                console.log('invalid username or token');
            return {username, token};
        case 'logout': 
            return {username: '', token: ''};
    }
}


const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {username: '', token: ''})
    return (
        <AuthContext.Provider value={{authState, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext};
export {AuthProvider};