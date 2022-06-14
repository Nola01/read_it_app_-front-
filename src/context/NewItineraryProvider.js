import React, {createContext, useState} from 'react';


const NewItineraryContext = createContext();

const NewItineraryProvider = ({children}) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [group, setGroup] = useState('');
  const [endDate, setEndDate] = useState('');
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);

  return (
    <NewItineraryContext.Provider
      value={{
        name,
        setName,
        department,
        setDepartment,
        group,
        setGroup,
        endDate,
        setEndDate,
        books,
        setBooks,
        students,
        setStudents
      }}>
      {children}
    </NewItineraryContext.Provider>
  );
}

export {NewItineraryContext, NewItineraryProvider};

