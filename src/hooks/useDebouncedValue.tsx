import {useEffect, useState} from 'react';

/* NOTE:
A DEBOUNCER WAITS FOR A SPECIFIC TIME BEFORE RETURNING THE VALUE
IN THIS CASE, WE WAIT FOR 500ms BEFORE RETURNING THE CURRENT VALUE
ITS BEEN USED WHEN WE CREATE A SEARCH INPUT, WE WAIT AFTER THE USER FINISH TYPING BEFORE TRIGGER THE API REQUEST
*/
export const useDebouncedValue = (input: string = '', time: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return debouncedValue;
};
