import './App.css';
/**
 * React의 라우터 처리는 가장 먼저 BrowserRouter 컴포넌트로
 * 최상위 App 컴포넌트를 감싸야한다.
 * 이 처리는 index.js 혹은 App.js에서 할 수 있다.
 */

/* 라우터 처리에 필요한 컴포넌트와 Hook을 임포트한다. */
import { BrowserRouter, Routes, Route, Link, NavLink, useParams } from 'react-router-dom';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';

/**
 * 라우팅이란?
 * : 사용자가 요청한 URL에 따라 알맞은 페이지를 보여주는 기능을 말한다.
 *   우리가 Web에서 흔히 "페이지이동"이라고 하는 것을
 *   React에서는 'Router(라우터)'를 통해 구현할 수 있다.
 */

const List = (props)=> {
  // <tr>태그 출력을 위한 빈 배열 생성
  const lists = [];
  // props로 전달된 데이터의 크기만큼 반복
  for(let i=0 ; i<props.topics.length ; i++){
    let row = props.topics[i];
    // 각 루프에서 데이터 파싱 후 <tr>태그를 추가
    lists.push(
      <tr key={row.no}>
        <td>{row.no}</td>
        {/* Link컴포넌트로 "/view/:no" 패턴으로 기술 */}
        <td><Link to={"/view/"+row.no}>{row.title}</Link></td>
        <td>{row.writer}</td>
      </tr>
    );
  }
  return (
    <>
      <header>
        <h2>게시판 - 목록</h2>
      </header>
      <nav>
        {/* <a href="#">글쓰기</a> */}
        <Link to="/write">글쓰기</Link>
      </nav>
      <article>
        <table border="1">
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>1</td>
              <td><a href="/view">오늘은 React공부하는 날</a></td>
              <td><Link to="/view/1">오늘은 React공부하는 날</Link></td>
              <td>낙자쌤</td>
            </tr>
            <tr>
              <td>2</td>
              <td><a href="/view">오늘은 React공부하는 날</a></td>
              <td><Link to="/view/2">오늘은 React공부하는 날</Link></td>
              <td>국자쌤</td>
            </tr>
            <tr>
              <td>3</td>
              <td><a href="/view">오늘은 React공부하는 날</a></td>
              <td><Link to="/view/3">오늘은 React공부하는 날</Link></td>
              <td>말자쌤</td>
            </tr> */}
            {/* 앞에서 생성한 배열변수로 <tr>태그를 대처함 */}
            {lists}
          </tbody>
        </table>
      </article>
    </>
  )
}

function Write() {
  return (
    <>
      <header>
        <h2>게시판-작성</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>
      </nav>
      <article>
        <form>
          <table border="1">
            <tbody>
              <tr>
                <th>작성자</th>
                <td><input type="text" name="writer" /></td>
              </tr>
              <tr>
                <th>제목</th>
                <td><input type="text" name="title" /></td>
              </tr>
              <tr>
                <th>내용</th>
                <td><textarea name="contents" cols="22" rows="3"></textarea></td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="쓰기" />
        </form>
      </article>
    </>
  )
}

function View(props) {
  /**
   * useParams훅
   * 라우터 처리를 통해 전달되느 파라미터를 얻어올 때 사용하는 훅이다.
   * 내용보기의 링크는 'path='/view/:no'와 같이 되어있는데
   * 뒷 부분의 :no부분을 useParams를 통해 얻어올 수 있따.
   */
  var params = useParams();
  console.log(params.no);

  // props로 전달된 데이터 배열을 얻어온다.
  const rows = props.topics;
  let vi;

  // 크기만큼 반복한다.
  for(let i=0; i<rows.length; i++) {
    /**
     * 파라미터로 전달된 값은 문자형식이므로
     * Number()를 통해 숫자형식으로 변환 후 비교한다.
     */
    if(rows[i].no===Number(params.no)){
      // no가 일치하는 객체를 저장한다.
      vi = rows[i];
    }
  }
  return (
    <>
      <header>
        <h2>게시물 - 읽기</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>&nbsp;
        <Link to="/edit">수정</Link>&nbsp;
        <Link to="/delete">삭제</Link>
      </nav>
      <article>
        <table border="1">
          <tbody>
            <tr>
              <th>작성자</th>
              <td>{vi.writer}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>{vi.title}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>{vi.contents}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  )
}

/**
 * Link 컴포넌트
 * NavLink와 동일한 기능을 제공한다.
 * 단, 클릭했을 때 active클래스를 자동으로 부여해주는 기능이 없다.
 */
// 라우팅  처리된 것 이외의 URL로 요청이 들어오면 렌더링
function NotFound(){
    return (
      <div>
        <h2>Not Found</h2>
        <p>
          페이지를 찾을 수 없습니다. <br />
          <Link to='/'>Home</Link>
        </p>
      </div>
    );
}

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
const TopNavi = ()=>{
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

const Home = ()=>{
  return (<>
    <h2>React Router Home</h2>  
    <p>
      홈 화면입니다.
    </p>
  </>);
}

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
      <header style={{ background:'lightgray', padding:'10px' }}>
        여긴 header
      </header>
      <article>
        {/* 각 페이지의 컴포넌트가 보여지는 부분에 설정한다. */}
        <Outlet />
      </article>
      <footer style={{ background:'lightgray', padding:'10px'}}>
        여긴 Footer
      </footer>
    </div>
  );
};

const LayoutIndex = ()=>{
  return (
    <h2>인트로 인덱스 페이지</h2>
  )
}

const IntroNakja = ()=>{
  return (
    <h2>낙자쌤 소개 페이지</h2>
  )
}

/**
 * useLocation
 * : React router를 통해 라우팅된 페이지에서 현재 URL과 관련된 정보를 얻는데 사용된다.
 *   URL경로, 쿼리스트링 등의 관련 정보를 제공한다.
 * 
 * useSearchParams
 * : 현재 URL의 쿼리스트링을 얻어오거나 조작할 때 사용한다.
 */
const IntroRouter = ()=>{
  // URL에 대한 정보를 얻어오기 위한 변수 생성
  const location = useLocation();
  // 쿼리스트링에 대한 정보를 얻어오기 위한 변수 및 setter 생성
  const [searchParams, setSearchParams] = useSearchParams();

  // 쿼리스트링 중 필요한 파라미터명을 얻어온다.
  const detail = searchParams.get('detail');
  const mode = searchParams.get('mode');

  // 파라미터 중 detail에 대해 조작하는 함수
  const onToggleDetail = () => {
    // setter함수를 통해 modedml 값을 true/false로 토글시킨다.
    setSearchParams({mode, detail: detail==='true' ? false : true});
  }
  // 파라미터 중 mode를 1씩 증가시킨다.
  const onIncreaseMode = () => {
    /* mode가 null이거나 숫자가 아니라면 1로 설정하고, 존재하면 1을 더해준다. */
    const nextMode = (mode===null || isNaN(mode)) ? 1 : parseInt(mode) + 1;
    // 앞에서 계산된 nextMode 값으로 설정한다.
    setSearchParams({ mode : nextMode, detail });
  }
  return (
  <>
    <h2>라우터 소개 페이지</h2>
    <div>
      <h4>useLocation 정보</h4>
      <ul>
        {/* useLocation()으로 얻어온 객체를 통해 정보를 출력 */}
        <li>URL경로 : {location.pathname}</li>
        <li>쿼리스트링 : {location.search}</li>
      </ul>
      <h4>useSearchParams 정보</h4>
      <ul>
        {/* userSearchParams()를 통해 파라미터 정보 출력 */}
        <li>detail : {detail}</li>
        <li>mode : {mode}</li>
      </ul>
      {/* 버튼의 이벤트리스너에서는 정의된 함수를 호출 */}
      <button onClick={onToggleDetail}>Toggle detail</button>
      <button onClick={onIncreaseMode}>mode ++</button>
    </div>
  </>
  )
}

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
