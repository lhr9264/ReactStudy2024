import './App.css';
import {useState} from 'react';

// Top 컴포넌트
function Top(props) {
  return (
    <h2><a href='/' onClick={(event)=>{
      /* 화면의 새로고침 차단 */
      event.preventDefault();

      /**
       * props를 통해 전달된 함수를 호출한다.
       * 이때 인수로 'both'를 전달하면 state가 변경된다. 
       */
      props.myModeChange('both');
    }}>React - State 변경하기</a></h2>
  )
}

/**
 * 컴포넌트 제작시 UI부분의 태그는 반드시 하나의 최상위 엘리먼트로 구성해야 한다.
 * 하지만 아래와 같이 동일한 Depth의 엘리먼트가 2개이상 존재한다면
 * <></>와 같이 빈 꺽쇄괄호를 묶어 하나로 만들어주면 된다.
 */
function MyCont1(props) {
  return (
    <>
    <li><a href='/' onClick={(event)=>{
      event.preventDefault();
      props.myModeChange('front');
    }}>프론트엔드</a></li>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>Javascript</li> 
        <li>jQuery</li>
      </ul>
    </>
  );
}

function MyCont2(props) {
  return (
    <>
    <li><a href='/' onClick={(event)=>{
      event.preventDefault();
      props.myModeChange('back');
    }}>백엔드</a></li>
      <ul>
        <li>Java</li>
        <li>Oracle</li>
        <li>JSP</li> 
        <li>Spring Boot</li>
      </ul>
    </>
  );
}

/**
 * React hook(훅)
 * 리액트 16.8부터 새로 추가된 기능으로 
 * 함수형 컴포넌트에서 state와 수명주기(Life Cycle)을 연동할 수 있게 해주는 특수한 함수를 말한다.
 * 사용하기 위해선 import가 필요하다.
 * 
 * useState() : 리액트에서 상태값을 가지는 state의 값을 설정하거나 읽을 때 사용한다.
 * 이 함수의 반환값은 배열인데 0번 인덱스는 getter, 1번 인덱스는 setter로 사용된다.
 * const testState = setState('스테이트값');
 * const getTs = testState[0]; => 초기값인 '스테이트값'이 할당됨
 * const setTs = testState[1]; => 값을 변경할 수 있는 함수
 * ==>
 *  위 문법을 '구조분해할당'을 통해 축약하면 아래와 같다.
 *  const [getTs, setTs] = setState('스테이트값');
 */
function App() {
  /**
   * UI의 전환을 위한 state생성
   * 초기값은 both이고, 변수명은 mode로 지정됨
   * 변경을 위한 함수명은 setMode()로 설정함
   */
  const [mode, setMode] = useState('both');

  // 컴포넌트 저장용 변수
  let contents = '';
  /**
   * 각 컴포넌트 별로 mode 변경을 위한 함수를 props로 전달하고 있다.
   * 자식 컴포넌트에서는 해당 함수 호출시 전달한 매개변수에 따라 mode값이 변경되어 UI가 새롭게 렌더링된다.
   * 즉, 화면이 전환된다. 
   */
  if(mode==='front') {
    /* 만약 mode가 front이면 MyCont1 컴포넌트만 화면에 렌더링 된다. */
    contents = <>
      <MyCont1 myModeChange={(mode)=>{
        setMode(mode);
      }}></MyCont1>
    </>
  } else if(mode==='back') {
    contents = <>
      <MyCont2 myModeChange={(mode)=>{
        setMode(mode);
      }}></MyCont2>
    </>
  } else {
    contents = <>
      <MyCont1 myModeChange={(mode)=>{
        setMode(mode);
      }}></MyCont1>
      <MyCont2 myModeChange={(mode)=>{
        setMode(mode);
      }}></MyCont2>
    </>
  }
  
  return (
    <div className="App">
      <Top myModeChange={(mode)=>{
        setMode(mode);
      }}></Top>
      <ol>
        {contents}
      </ol>
    </div>
  );
}

export default App;