import React from "react";
import { NavLink } from 'react-router-dom';
/**
 * NavLink 컴포넌트
 * 일반적인 링크는 <a>태그를 사용하지만
 * React에서는 화면의 새로고침이 되면 안 되므로
 * 이벤트 객체를 통해 preventDefault()함수를 사용해야 한다.
 * <a>태그의 단점을 보완할 수 있는 컴포넌트로 
 * 화면의 깜빡임없이 화면을 이동할 수 있는 기능을 제공한다.
 * 또한 링크를 클릭했을 때 active라는 class속성을 자동으로 부여해준다.
 * 
 * 기존의 게시판 링크를 통합하여 하나의 링크로 정의하고
 * 중첩라우팅으로 intro링크를 추가함(outlet 컴포넌트 기능 추가)
 */
const TopNavi = () => {
    return (
        <nav>
            <NavLink to="/">HOME</NavLink>&nbsp;
            <NavLink to="/list">게시판</NavLink>&nbsp;
            {/* <NavLink to="/list">작성하기</NavLink>
        <NavLink to="/view">내용보기</NavLink>
        <NavLink to="/write">목록보기</NavLink> */}
            <NavLink to="/intro">인트로</NavLink>&nbsp;
            <NavLink to="/intro/nakja">낙자프로필</NavLink>&nbsp;
            <NavLink to="/intro/router">Router소개</NavLink>&nbsp;
            <NavLink to="/xyz">잘못된URL</NavLink>&nbsp;
        </nav>
    );
}

export default TopNavi;