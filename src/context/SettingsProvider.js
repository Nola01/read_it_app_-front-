import React, {createContext, useState} from 'react';


const SettingsContext = createContext();


const SettingsProvider = ({children}) => {
    const [color, setColor] = useState('#6299E0');
  
    return (
      <SettingsContext.Provider
        value={{
          color
        }}>
        {children}
      </SettingsContext.Provider>
    );
  }
  
  export {SettingsContext, SettingsProvider};