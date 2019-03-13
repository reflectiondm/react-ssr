import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>Count: {count}</span><br/>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
