import './App.css'

function Header(props) {
  console.log('props', props.title);
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  )
}

//네이버게이션 컴포넌트
function Nav(props) {
  /* click이벤트 리스너에서 익명함수를 실행한다. 부모 컴포넌트에서
  전달한 onChangeMode() 함수를 호출한다. */
  return (
    <nav>
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  )
}

function Article(props) {
  const lists = [];
  for(let i=0 ; i<props.topics.length ; i++) {
    let row = props.topics[i];
    lists.push(
      <tr key={row.no}>
        <td>{row.no}</td>
        {/* 제목을 클릭하면 게시물의 일련번호(no)를 인수로
        onChangeMode() 함수를 호출한다. */}
        <td><a href={'/read/'+row.no} onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode(row.no);
        }}>{row.title}</a></td>
        <td>{row.writer}</td>
        <td>{row.date}</td>
      </tr>
    )
  }
  return (
    <article>
      <table border='1'>
        <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Writer</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {lists}
        </tbody>
      </table>
    </article>
  )
}

function App() {
  const topics = [
    {no:1, title:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01'},
    {no:2, title:'어제는 Javascript공부했음', writer:'유겸이',
    date:'2023-03-03'},
    {no:3, title:'내일은 Project해야지',wirter:'개똥이', date:'2023-05-05' },
  ];

  return (
    <div className="App">
      <Header title="게시판-목록(event)"></Header>
      {/* 매개변수가 없는 익명함수로 단순히 경고창만 띄우는 기능
      정의 */}
      <Nav onChangeMode={function(){
        alert("글쓰기 페이지로 이동");
      }}></Nav>
      {/* 매개변수가 있는 화살표함수로 매개변수로 전달된 값을
      경고창으로 출려력한다. */}
      <Article topics={topics} onChangeMode={(no)=>{
        alert('선택한 게시물 번호:'+ no);
      }}></Article>
    </div>
  );
}

export default App;