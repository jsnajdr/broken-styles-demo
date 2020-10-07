import React from "react";

function Empty() {
  return null;
}

function App() {
  const [Reader, setReader] = React.useState(() => Empty);
  const [Stats, setStats] = React.useState(() => Empty);

  function loadReader() {
    import(/* webpackChunkName: "reader" */ "./reader").then((readerModule) =>
      setReader(() => readerModule.default)
    );
  }

  function loadStats() {
    import(/* webpackChunkName: "stats" */ "./stats").then((statsModule) =>
      setStats(() => statsModule.default)
    );
  }

  return (
    <div>
      <button onClick={loadReader}>Load Reader</button>
      <Reader />
      <button onClick={loadStats}>Load Stats</button>
      <Stats />
    </div>
  );
}

export default App;
