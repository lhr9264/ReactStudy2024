import './App.css';
import {useState} from 'react';

import NavList from './navComp/NavList'
import NavView from './navComp/NavView'
import NavWrite from './navComp/NavWrite'
import ArticleList from './artComp/ArticleList'
import ArticleView from './artComp/ArticleView'
import ArticleWrite from './artComp/ArticleWrite'

function ReadyComp() {
  return (
    <div>
      <h3>컴포넌트 준비중입니다.</h3>
      <a href='/'>Home바로가기</a>
    </div>
  );
}

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

  const [mode, setMode] = useState('list');

  /* 게시물 조회를 위한 state. 게시판의 첫 진입은 목록이므로
  초기값은 null로 설정한다. */
  const [no, setNo] = useState(null);

  /* 각 컴포넌트와 타이틀 저장을 위한 변수 생성 props를 통해
  화면 전환을 위한 함수를 자식 컴포넌트로 전달하고 있다. */
  /* 게시물 내용보기를 위한 변수 추가. Java에서 DTO와 같이 게시물에
  해당하는 하나의 객체를 저장한다. */
  let articleComp, navComp, titleVar, selectRow;
  if(mode==='list') {
    titleVar = '게시판-목록(props)';
    // 글쓰기 링크
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>
    //제목을 누르면 읽기로 이동(게시물 번호 필요함)
    articleComp = <ArticleList topics={topics} onChangeMode={(no)=>{
      console.log('선택한 게시물 번호:' + no);
      //화면전환을 위한 state를 view로 변경
      setMode('view');
      //선택한 게시물의 일련번호로 no를 변경
      setNo(no);
      /* state에 변화가 생겼으므로 React는 화면을 새롭게
      렌더링한다. */
    }}></ArticleList>
  }
  else if(mode==='view'){
    titleVar = '게시판-읽기(props)';
    //목록 버튼(수정, 삭제는 skip)
    navComp = <NavView onChangeMode={(pmode)=>{
        setMode(pmode);
      }}></NavView>
    
    //선택한 게시물의 no를 통해 게시물을 얻어온다.
    console.log("현재no:", no, typeof(no));
    //게시물이 저장된 배열의 크기만큼 반복
    for(let i=0 ; i<topics.length ; i++){
      //선택한 no와 일치하는 게시물이 있는지 검색
      if(no===topics[i].no){
        //no가 일치하면 객체를 변수에 저장한다.
        selectRow = topics[i];
      }
    }
    //조회된 게시물은 props를 통해 자식 컴포넌트로 전달한다.
    articleComp = <ArticleView selectRow={selectRow}></ArticleView>
  }
  else if(mode==='write'){
    titleVar = '게시판-쓰기(props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>
  articleComp = <ArticleWrite></ArticleWrite>;
  }
  else{
    navComp = <ReadyComp></ReadyComp>;
    articleComp = '';
  }

  return (
    <div className="App">
      <Header title={titleVar}></Header>
      {navComp}
      {articleComp}
    </div>
  );
}

export default App;