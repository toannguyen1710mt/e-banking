import React, { createContext, useState, useContext, ReactNode } from 'react';

// Constants
import { ERROR_MESSAGES } from '@/constants';

interface SessionContextType {
  avatar: string;
  updateSession: (url: string) => void;
}

const UserContext = createContext<SessionContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  avatar: string;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  avatar: a1,
}) => {
  const [avatar, setAvatar] = useState<string>(a1);

  const updateSession = (url: string) => {
    setAvatar(url || '');
  };

  return (
    <UserContext.Provider value={{ avatar, updateSession }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): SessionContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(ERROR_MESSAGES.USE_USER_CONTEXT);
  }
  return context;
};
