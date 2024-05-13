import { useEffect, useLayoutEffect } from "react";
import "./App.css";

const Child = () => {
  useEffect(() => {
    console.log("CHLID USEEFFECT");
  }, []);
  useLayoutEffect(() => {
    console.log("CHLID LAYOUT");
  }, []);

  return <h1>CHILD</h1>;
};

function App() {
  useEffect(() => {
    console.log("PARENT USEEFFECT");
  }, []);
  useLayoutEffect(() => {
    console.log("PARENT LAYOUT");
  }, []);
  return (
    <div className="App">
      <h1>PARENT</h1>
      <Child />
    </div>
  );
}

export default App;
