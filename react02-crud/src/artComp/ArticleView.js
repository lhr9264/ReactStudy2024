import React from "react";

//내용보기 컴포넌트
function ArticleView(props) {
    console.log("번호:", props.selectRow);
    //전달된 props를 통해 내용은 화면에 출력한다.
    return (
      <article>
      <table border='1'>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>{props.selectRow.writer}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{props.selectRow.title}</td>
          </tr>
          <tr>
            <th>작성일</th>
            <td>{props.selectRow.date}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>{props.selectRow.contents}</td>
          </tr>
        </tbody>
      </table>
      </article>
    );
  }

export default ArticleView;