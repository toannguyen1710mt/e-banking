// Libs
import { createContext, useContext, useState, ReactNode } from 'react';

interface IFetchedBalancesContext {
  fetchedBalances: { [key: string]: number };
  setFetchedBalances: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
}

const FetchedBalancesContext = createContext<
  IFetchedBalancesContext | undefined
>(undefined);

export const FetchedBalancesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [fetchedBalances, setFetchedBalances] = useState<{
    [key: string]: number;
  }>({});

  return (
    <FetchedBalancesContext.Provider
      value={{ fetchedBalances, setFetchedBalances }}
    >
      {children}
    </FetchedBalancesContext.Provider>
  );
};

export const useFetchedBalances = () => {
  const context = useContext(FetchedBalancesContext);

  if (!context) {
    throw new Error(
      'useFetchedBalances must be used within a FetchedBalancesProvider',
    );
  }

  return context;
};
