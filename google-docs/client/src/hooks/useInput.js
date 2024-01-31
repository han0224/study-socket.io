import { useState } from "react";

export default function useInput(defaultValue = "") {
  const [input, setInput] = useState(defaultValue);
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  return [input, onChange];
}
