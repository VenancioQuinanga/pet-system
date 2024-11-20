"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

import { FlashMessageInterface } from '@/src/interfaces/Layout/FlashMessageInterface';


interface FlashMessageContextProps {
  flashMessage: FlashMessageInterface | null;
  setFlashMessage: (message: FlashMessageInterface | null) => void;
}

const FlashMessageContext = createContext<FlashMessageContextProps | undefined>(undefined);

export const FlashMessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessageInterface | null>(null);

  return (
    <FlashMessageContext.Provider value={{ flashMessage, setFlashMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage:any = () => {
  const context = useContext(FlashMessageContext);
  if (context === undefined) {
    throw new Error('useFlashMessage must be used within a FlashMessageProvider');
  }
  return context;
};
