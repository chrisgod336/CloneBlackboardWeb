import React, { createContext, useContext, ReactNode, useState } from 'react';
import Admin from '../models/AdminModel';
import Aluno from '../models/AlunoModel';

type GlobalState = {
  user: Admin | Aluno | null;
};

type GlobalContextType = {
  state: GlobalState;
  setUser: (user: GlobalState['user']) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GlobalState>({
    user: null
  });

  const setUser = (user: GlobalState['user']) => {
    setState(prev => ({ ...prev, user }));
  };

  return (
    <GlobalContext.Provider value={{ state, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};