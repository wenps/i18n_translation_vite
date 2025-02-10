/*
 * @Date: 2025-01-10 14:57:41
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-10 22:57:19
 * @FilePath: /i18n_translation_vite/example/react/src/App.tsx
 */
import './App.css'

import HelloWorld from './components/HelloWorld'

// Card component definition
function Card({ title = '1', children = '2' }) {
    return (
        <div className="card">
            {title && <h2>{title}</h2>}
            {children}
        </div>
    )
}

const changeLang = function (value: string) {
    window.localStorage.setItem('lang', value)
    window.location.reload()
}

function App() {
    return (
        <div className="app-container">
            <HelloWorld name="User" />
            <header data-dsa-ā>
                <h1>Welcome to My React App</h1>
                <nav>
                    <div className="operation">
                        <div onClick={() => changeLang('zhcn')} style={{ marginRight: '10px' }}>
                            中文
                        </div>
                        <div onClick={() => changeLang('en')} style={{ marginRight: '10px' }}>
                            英文
                        </div>
                        <div onClick={() => changeLang('ko')} style={{ marginRight: '10px' }}>
                            韩文
                        </div>
                        <div onClick={() => changeLang('ja')} style={{ marginRight: '10px' }}>
                            日文
                        </div>
                    </div>
                    <ul
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            listStyle: 'none'
                        }}
                    >
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </header>
            <main>
                <Card title="Hello, World!"></Card>
                <p>This is a more complex React component structure.</p>

                <Card title="Features" children="2"></Card>
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
