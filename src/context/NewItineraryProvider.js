import React, {createContext, useState} from 'react';


const NewItineraryContext = createContext();

const NewItineraryProvider = ({children}) => {
  const [nameState, setNameState] = useState('');
  const [departmentState, setDepartmentState] = useState('');
  const [groupState, setGroupState] = useState();
  const [endDateState, setEndDateState] = useState();
  const [booksState, setBooksState] = useState([]);
  const [studentsState, setStudentsState] = useState([]);

  return (
    <NewItineraryContext.Provider
      value={{
        nameState,
        setNameState,
        departmentState,
        setDepartmentState,
        groupState,
        setGroupState,
        endDateState,
        setEndDateState,
        booksState,
        setBooksState,
        studentsState,
        setStudentsState
      }}>
      {children}
    </NewItineraryContext.Provider>
  );
}

export {NewItineraryContext, NewItineraryProvider};

