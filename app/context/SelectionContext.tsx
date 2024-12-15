import React, { createContext, useContext, useState } from "react";

// Type definition for the selections context
type SelectionContextType = {
  selections: { [key: string]: string }; // Object for multiple selections
  setSelection: (key: string, value: string) => void; // Function to update a single selection
  setSelections: (updatedSelections: { [key: string]: string }) => void; // Function to update multiple selections at once
  clearSelection: (key: string) => void; // Function to clear a specific selection
  resetSelections: () => void; // Function to reset all selections
};

// Create the context with an initial value
const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined
);

// Custom hook to use the context
export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
};

// Provider component for the selection context
export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to manage multiple selections
  const [selections, setSelectionsState] = useState<{ [key: string]: string }>(
    {}
  );

  // Function to update a single selection by key
  const setSelection = (key: string, value: string) => {
    setSelectionsState((prevSelections) => ({
      ...prevSelections,
      [key]: value,
    }));
  };

  // Function to update multiple selections at once
  const setSelections = (updatedSelections: { [key: string]: string }) => {
    setSelectionsState(updatedSelections); // Replace the state with the new object
  };

  // Function to clear a specific selection by key
  const clearSelection = (key: string) => {
    setSelectionsState((prevSelections) => {
      const updatedSelections = { ...prevSelections };
      delete updatedSelections[key]; // Remove the key from the selections
      return updatedSelections;
    });
  };

  // Function to reset all selections
  const resetSelections = () => {
    setSelectionsState({});
  };

  return (
    <SelectionContext.Provider
      value={{
        selections,
        setSelection,
        setSelections, // Add the new function to the context
        clearSelection,
        resetSelections,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
