import { useState } from "react";

const useCounter = () => {
  const [like, setLike] = useState(0);
  const [visit, setVisit] = useState(0);
  const increaseLike = () => {
    setLike(prevLike => prevLike + 1);
  };
  const increaseVisit = () => {
    setVisit(prevVisit => prevVisit + 1);
  };
  return [like, visit, increaseLike, increaseVisit];
};

export default useCounter;
