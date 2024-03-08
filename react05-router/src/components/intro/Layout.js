import React from "react";
import { Outlet } from 'react-router-dom';
/**
 * Outlet
 * : React Router v6에서 도입된 개념
 * 중첩된 구조의 라우터를 처리하고 레이아웃을 구성한다.
 * Route 컴포넌트 내부에서 특정위치에 컴포넌트를 렌더링하게 해준다.
 * JSP에서 공통부분을 include 지시어를 통해 처리하는 것과 유사하다.
 */
const Layout = () => {
    return (
        <div>
            {/* 컴포넌트에 style을 지정하는 경우 
            콧수염괄호를 이용해서 부여한다. */}
            <header style={{ background: 'lightgray', padding: '10px' }}>
                여긴 header
            </header>
            <article>
                {/* 각 페이지의 컴포넌트가 보여지는 부분에 설정한다. */}
                <Outlet />
            </article>
            <footer style={{ background: 'lightgray', padding: '10px' }}>
                여긴 Footer
            </footer>
        </div>
    );
};

export default Layout;