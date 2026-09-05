import React, { createContext, useContext, useState, useCallback } from "react";
import FeedbackModal from "../components/FeedbackModal";

interface FeedbackContextType {
  openFeedback: () => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const openFeedback = useCallback(() => setOpen(true), []);
  const closeFeedback = useCallback(() => setOpen(false), []);

  return (
    <FeedbackContext.Provider value={{ openFeedback }}>
      {children}
      <FeedbackModal open={open} onClose={closeFeedback} />
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
};

export default FeedbackContext;
