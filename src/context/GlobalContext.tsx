import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import Admin from '../models/AdminModel';
import Aluno from '../models/AlunoModel';

type GlobalState = {
  user: Admin | Aluno | null;
};

type GlobalContextType = {
  state: GlobalState;
  setUser: (user: GlobalState['user']) => void;
};

const STORAGE_KEY = '@appUser';

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GlobalState>({
    user: null,
  });

  const saveUserToStorage = (user: GlobalState['user']) => {
    if (user) {
      const payload = {
        type: user instanceof Admin ? 'Admin' : 'Aluno',
        data: user.toJSON(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const setUser = (user: GlobalState['user']) => {
    setState((prev) => ({ ...prev, user }));
    saveUserToStorage(user);
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.type === 'Admin') {
          setState({ user: Admin.fromJSON(parsed.data) });
        } else if (parsed.type === 'Aluno') {
          setState({ user: Aluno.fromJSON(parsed.data) });
        } else {
          setState({ user: null });
        }
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage', error);
        setState({ user: null });
      }
    }
  }, []);

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
