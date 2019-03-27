/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';

function Page(props) {
  const [counter, setCount] = useState(props.start);

  function clic() {
    setCount(counter + 1);
  }

  useEffect(() => {
    const timeout = setTimeout(clic, 1000);
    return () => {
      clearTimeout(timeout);
    };
  });

  return <strong>{counter}</strong>;
}

Page.defaultProps = { start: 0 };

export default Page;