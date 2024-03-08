import React from "react";
import { Link, useParams } from 'react-router-dom';

function View(props) {
    /**
     * useParams훅
     * 라우터 처리를 통해 전달되느 파라미터를 얻어올 때 사용하는 훅이다.
     * 내용보기의 링크는 'path='/view/:no'와 같이 되어있는데
     * 뒷 부분의 :no부분을 useParams를 통해 얻어올 수 있따.
     */
    var params = useParams();
    console.log(params.no);

    // // props로 전달된 데이터 배열을 얻어온다.
    const rows = props.topxics;
    // let vi;
    // // 크기만큼 반복한다.
    // for (let i = 0; i < rows.length; i++) {
    //     /**
    //      * 파라미터로 전달된 값은 문자형식이므로
    //      * Number()를 통해 숫자형식으로 변환 후 비교한다.
    //      */
    //     if (rows[i].no === Number(params.no)) {
    //         // no가 일치하는 객체를 저장한다.
    //         vi = rows[i];
    //     }
    // }

    /*
    퀴즈] 기존의 for문으로 구현한 부분을 reduce()함수를 이용해서
    구현하시오.
    */
    let vi = props.topics.reduce((prev, curr)=>{
        if(curr.no===Number(params.no)){
            prev = curr;
        }
        return prev;
    }, {});


    
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
export default View;