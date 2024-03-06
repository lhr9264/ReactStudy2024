import './App.css';
//state 관리용 훅 임포트
import {useState} from 'react';

/* 각 컴포넌트를 해당 페이지에 임포트 한다. 컴포넌트 제작시 확장자는 js
혹은 jsx 둘다 가능하다. 각 경로에 맞게 컴포넌트명만 기술하면 된다. */
import NavList from './navComp/NavList'
import NavView from './navComp/NavView'
import NavWrite from './navComp/NavWrite'
import ArticleList from './artComp/ArticleList'
import ArticleView from './artComp/ArticleView'
import ArticleWrite from './artComp/ArticleWrite'

//임시 컴포넌트 : 게시판과 상관없는 mode를 가질때 사용
/* <a>태그에 별도의 이벤트 처리를 하지 않았으므로 클릭시 화면이
새로고침되어 리스트 화면으로 전환한다. */
function ReadyComp() {
  return (
    <div>
      <h3>컴포넌트 준비중입니다.</h3>
      <a href='/'>Home바로가기</a>
    </div>
  );
}

//제목 컴포넌트
function Header(props) {
  console.log('props', props.title);
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  )
}

function App() {

  const topics = [
    {no:1, title:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01'},
    {no:2, title:'어제는 Javascript공부했음', writer:'유겸이',
    date:'2023-03-03'},
    {no:3, title:'내일은 Project해야지',wirter:'개똥이', date:'2023-05-05' },
  ];

  /* 화면 전환을 위한 state 생성. 이름은 mode, 초기값은 list,
  setter 함수는 setMode()로 설정 */
  const [mode, setMode] = useState('list');

  /* 각 컴포넌트와 타이틀 저장을 위한 변수 생성. props를 통해 화면
  전환을 위한 함수를 자식 컴포넌트로 전달한다. */
  let articleComp, navComp, titleVar;
  if(mode==='list') {
    titleVar = '게시판-목록(props)';
    /* 목록, 수정, 삭제 링크 */
    /* "쓰기" 링크 처리 */
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>

    articleComp = <ArticleList topics={topics} onChangeMode={(no)=>{
      console.log('선택한 게시물 번호:' + no);
      setMode('view');
    }}></ArticleList>
  }
  else if(mode==='view'){
    titleVar = '게시판-읽기(props)';
  /* 목록, */
    navComp = <NavView onChangeMode={(pmode)=>{
        setMode(pmode);
      }}></NavView>
    articleComp = <ArticleView></ArticleView>
  }
  else if(mode==='write'){
    titleVar = '게시판-쓰기(props)';
    /* '목록' 링크 */
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>
  articleComp = <ArticleWrite></ArticleWrite>;
  }
  else{
    /* 수정, 삭제는 아직 작업전이므로 '준비중' 컴포넌트를
    렌더링한다. */
    navComp = <ReadyComp></ReadyComp>;
    //주요내용이 출력되는 컴포넌트는 빈값으로 처리한다.
    articleComp = '';
  }

  return (
    <div className="App">
      {/* 헤더의 경우 제목만 변경되고 UI는 동일하므로 하나의
      컴포넌트를 공유해서 사용한다. */}
      <Header title={titleVar}></Header>
      {/* Nav와 Article은 UI 자체가 다르므로 각각의 컴포넌트를
      조건에 따라 변경해서 사용해야한다. */}
      {navComp}
      {articleComp}
    </div>
  );
}

export default App;