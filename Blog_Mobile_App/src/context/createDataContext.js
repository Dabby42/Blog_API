import React,{useReducer } from "react";

export default createDataContext = (reducer, action, initialState) => {
    const Context = React.createContext();

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        const boundedActions = {}
        for (let key in action) {
            boundedActions[key] = action[key](dispatch);
        }

        return (<Context.Provider value={{state, ...boundedActions}}>
            {children}
        </Context.Provider>);
    };

    return {Provider, Context};
}