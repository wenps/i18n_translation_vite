/*
 * @Date: 2025-02-10 18:58:20
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-11 10:33:19
 * @FilePath: /i18n_translation_vite/example/webpack-react/src/components/Navbar.tsx
 */
import React from 'react'
import { Link } from 'react-router-dom'

const changeLang = function (value: string) {
    window.localStorage.setItem('lang', value)
    window.location.reload()
}
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">TechCorp</div>
            <div className="operation" style={{ display: 'flex' }}>
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
            <div className="nav-links">
                <Link to="/">首页</Link>
                <Link to="/products">产品</Link>
                <Link to="/about">关于</Link>
            </div>
        </nav>
    )
}

export default Navbar
// element-tag-marker: m8xiwv2o
