import React, {createContext} from 'react';
import {AuthenticationUser} from "../types/authentication-user.ts";


type AuthContextType = {
    user: AuthenticationUser | undefined,
    setUser: React.Dispatch<React.SetStateAction<AuthenticationUser | undefined>>
}

const iAuthContextState = {
    user: undefined,
    setUser: () => {}
}
const AuthContext = createContext<AuthContextType>(iAuthContextState);

type Props = {
    children: React.ReactNode
};
const AuthContextProvider = (props: Props) => {

    const [user, setUser] = React.useState<AuthenticationUser>()

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export {AuthContextProvider, AuthContext};