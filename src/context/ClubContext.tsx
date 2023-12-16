import React, {createContext} from 'react';


type ClubContextType = {
    clubId: number | undefined,
    setClubId: React.Dispatch<React.SetStateAction<number | undefined>>
}

const iAuthContextState = {
    clubId: undefined,
    setClubId: () => {}
}
const ClubContext = createContext<ClubContextType>(iAuthContextState);

type Props = {
    children: React.ReactNode
};
const ClubContextProvider = (props: Props) => {

    const [clubId, setClubId] = React.useState<number>()

    return (
        <ClubContext.Provider value={{clubId,setClubId}}>
            {props.children}
        </ClubContext.Provider>
    );
};

export {ClubContextProvider, ClubContext};