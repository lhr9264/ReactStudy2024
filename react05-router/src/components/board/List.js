import React from "react";
import { Link } from 'react-router-dom';

const List = (props) => {
    // <tr>태그 출력을 위한 빈 배열 생성
    // const lists = [];
    // // props로 전달된 데이터의 크기만큼 반복
    // for (let i = 0; i < props.topics.length; i++) {
    //     let row = props.topics[i];
    //     // 각 루프에서 데이터 파싱 후 <tr>태그를 추가
    //     lists.push(
    //         <tr key={row.no}>
    //             <td>{row.no}</td>
    //             {/* Link컴포넌트로 "/view/:no" 패턴으로 기술 */}
    //             <td><Link to={"/view/" + row.no}>{row.title}</Link></td>
    //             <td>{row.writer}</td>
    //         </tr>
    //     );
    // }

    /*
    퀴즈] 기존 for문으로 구현했던 부문을 map()함수를 이용해서 구현하시오.
    */
   const lists = props.topics.map((row)=>{
    return (
        <tr key={row.no}>
            <td>{row.no}</td>
            <td><Link to={"/view/"+row.no}>{row.title}</Link></td>
            <td>{row.writer}</td>
        </tr>
    );
   });
   
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

export default List;