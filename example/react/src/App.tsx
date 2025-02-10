/*
 * @Date: 2025-01-10 14:57:41
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-20 18:09:11
 * @FilePath: /element-tag-marker/example/react/src/App.tsx
 */
import './App.css'

import HelloWorld from './components/HelloWorld';

// Card component definition
function Card({ title = '1', children = '2' }) {
    return (
        <div className="card">
            {title && <h2>{title}</h2>}
            {children}
        </div>
    )
}

function App() {
    return (
        <div className="app-container">
             <HelloWorld name="User" />
            <header data-dsa-ā>
                <h1>Welcome to My React App</h1>
                <nav>
                    <ul style={{ display: 'flex', justifyContent: 'center', gap: '20px', listStyle: 'none' }}>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </header>
            <main>
                <Card title="Hello, World!">
                    
                </Card>
                <p>This is a more complex React component structure.</p>
                
                <Card title="Features" children='2'>
                </Card>
                    <ul>
                        <li>Multiple components</li>
                        <li>Styled layout</li>
                        <li>Navigation menu</li>
                    </ul>
            </main>
        </div>
    )
}

export default App

 // element-tag-marker: /Users/xiaoshanwen/Desktop/me/element-tag-marker/example/react/src/App.tsx