# frontend-mentor-invoice-app

what i learnt:
(1) async functions should go inside a useEffect. We need to make the async function a named function inside of useEffect then call it, so that the return function that useEffect expects can be called (if needed)
see https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

(2) Redux is not able to take in non-serializable data (ie. date object from firebase). It is necessary to convert it to a date first before dispatching it into the store.
