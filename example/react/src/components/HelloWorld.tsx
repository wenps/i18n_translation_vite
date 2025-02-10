/*
 * @Date: 2025-01-20 18:08:10
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-21 17:36:56
 * @FilePath: /element-tag-marker/example/react/src/components/HelloWorld.tsx
 */
import React from 'react';

interface HelloWorldProps {
  name?: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ name = 'World' }) => {
  return (
    <div className="hello-world">
      <h1>Hello, {name}!</h1>
      <p>Welcome to our application</p>
    </div>
  );
};

export default HelloWorld; 
 // element-tag-marker: /Users/xiaoshanwen/Desktop/me/element-tag-marker/example/react/src/components/HelloWorld.tsx