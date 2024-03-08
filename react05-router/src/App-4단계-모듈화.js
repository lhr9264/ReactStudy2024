import './App.css';
/**
 * React의 라우터 처리는 가장 먼저 BrowserRouter 컴포넌트로
 * 최상위 App 컴포넌트를 감싸야한다.
 * 이 처리는 index.js 혹은 App.js에서 할 수 있다.
 */

/* 라우터 처리에 필요한 컴포넌트와 Hook을 임포트한다. */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import List from './components/board/List';
import View from './components/board/View';
import Write from './components/board/Write';
import Home from './components/common/Home';
import NotFound from './components/common/NotFound';
import TopNavi from './components/common/TopNavi';
import IntroNakja from './components/intro/IntroNakja';
import IntroRouter from './components/intro/IntroRouter';
import Layout from './components/intro/Layout';
import LayoutIndex from './components/intro/LayoutIndex';

/**
 * 라우팅이란?
 * : 사용자가 요청한 URL에 따라 알맞은 페이지를 보여주는 기능을 말한다.
 *   우리가 Web에서 흔히 "페이지이동"이라고 하는 것을
 *   React에서는 'Router(라우터)'를 통해 구현할 수 있다.
 */

function App() {
  const topics = [
    {no:1, title:'오늘은 React공부하는 날', writer:'낙자쌤', contents:'리액트 좋아요.'},
    {no:2, title:'어제는 Javascript공부한 날', writer:'유겸이', contents:'자바스크립트 좋아요.'},
    {no:3, title:'내일은 Project해야지', writer:'개똥이', contents:'프로젝트 힘들어요.'},
  ];

  /**
   * Route 컴포넌트
   * : 요청 URL에 따라 개별 컴포넌트를 렌더링하는 기능을 가지고 있어
   *   실질적인 라우팅 처리를 위해 사용된다.
   * - path : 요청명을 설정한다.
   * - element : 해당 요청에 렌더링할 컴포넌트를 지정한다.
   */
  return (
  <BrowserRouter>
    <div className="App">
      <TopNavi></TopNavi>
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/list' element={<List topics={topics}></List>} />

        {/* 하나의 Route로 구성된 것을 아래와 같이 2Depth로 처리할 수 있다.
            이것을 '중첩라우팅'이라고 한다. 
            하나의 Route로 구성하는 경우 /view로 요청이 들어오면
            패턴을 찾지못해 Not found가 된다.
            하지만 중첩 구조로 만들어 놓으면 이 경우에도 페이지는 정상적으로 표시된다. */}
        {/* <Route path='/view/:no' element={<View topics={topics}></View>} /> */}
        <Route path='/view'>
          <Route path=':no' element={<View topics={topics} />} />
        </Route>
        <Route path='/write' element={<Write></Write>} />
        {/* 중첩된 라우터 구조에서 /intro 경로에서는
            Layout 컴포넌트 내부에 LayoutIndex 컴포넌트가 삽인된 상태로 렌더링 된다.
            해당 컴포넌트는 Outlet이 삽입된 위치에서 렌더링된다. */}
        <Route path='/intro' element={<Layout/>}>
          <Route index element={<LayoutIndex />} />
          <Route path="nakja" element={<IntroNakja />} />
          <Route path="router" element={<IntroRouter />} />
        </Route>
        {/* 위에서 지정한 URL패턴이 아닌 경우에 렌더링된다. */}
        <Route path='/*' element={<NotFound></NotFound>} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
