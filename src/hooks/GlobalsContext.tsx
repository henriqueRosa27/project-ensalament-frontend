import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from 'react';

interface GlobalsContextData {
  drawer: boolean;
  backdrop: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toogleDrawer: () => void;
  openBackdrop: () => void;
  closeBackdrop: () => void;
  toogleBackdrop: () => void;
}

interface GlobalsProviderProps {
  children: ReactNode;
}

const GlobalsContext = createContext<GlobalsContextData>(
  {} as GlobalsContextData
);

const GlobalsProvider: React.FC<GlobalsProviderProps> = ({
  children,
}: GlobalsProviderProps) => {
  const [drawer, setDrawer] = useState(true);
  const [backdrop, setBackdrop] = useState(false);

  const openDrawer = useCallback(() => {
    setDrawer(true);
  }, [drawer]);
  const closeDrawer = useCallback(() => {
    setDrawer(true);
  }, [drawer]);
  const toogleDrawer = useCallback(() => {
    setDrawer(!drawer);
  }, [drawer]);

  const openBackdrop = useCallback(() => {
    setBackdrop(true);
  }, [backdrop]);
  const closeBackdrop = useCallback(() => {
    setBackdrop(false);
  }, [backdrop]);
  const toogleBackdrop = useCallback(() => {
    setBackdrop(!backdrop);
  }, [backdrop]);

  return (
    <GlobalsContext.Provider
      value={{
        drawer,
        backdrop,
        openDrawer,
        toogleDrawer,
        closeDrawer,
        openBackdrop,
        closeBackdrop,
        toogleBackdrop,
      }}>
      {children}
    </GlobalsContext.Provider>
  );
};

export function useGlobals(): GlobalsContextData {
  const context = useContext(GlobalsContext);

  if (!context) {
    throw new Error('useGlobals must be used within a GlobalsProvider');
  }

  return context;
}

export default GlobalsProvider;
