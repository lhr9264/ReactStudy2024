import React from "react";

//수정페이지
/*
수정페이지를 구성하기 위해 기존의 데이터를 props를 통해 전달받아 <input>
태그의 value 속성값으로 설정한다. 하지만 이 경우<input>이 readonly
속성으로 렌더링되어 기존의 내용을 수정할 수 없게된다.
React에서 props는 외부에서 내부로 전다로디는 일종의 파라미터 이므로 애초에
읽기전용으로 설정되어 있기 때문이다.
*/
function ArticleEdit(props) {

    return (
      <article>
      {/* submit 이벤트 처리는  쓰기와 완전히 동일하다. */}
      <form onSubmit={(event)=>{
        //submit 이벤트에 의한 새로고침 차단
        event.preventDefault();
        //이벤트 객체의 target속성을 이용해서 입력값을 저장
        let title = event.target.title.value;
        let writer = event.target.writer.value;
        let contents = event.target.contents.value;

        //console.log('ArticleWrite컴포', title, writer, contents);
        /* 부모가 props를 통해 전달한 함수를 호출하여 부모쪽으로
        데이터를 전송한다. */
        props.editAction(title, writer, contents);
      }}>
        <table border='1'>
          <tbody>
            <tr>
              <th>작성자</th>
              {/* props로 전달된 데이터를 <input>태그의
              value속성에 추가해서 기존에 입력한 값을 세팅한다. */}
              <td><input type='text' name="writer"
                      value={props.selectRow.writer} /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type='text' name="title" 
                      value={props.selectRow.title}/></td>
            </tr>
            <tr>
              <th>내용</th>
              {/* HTML에서는 태그사이에 값을 설정해야 하지만,
              JSX에서는 <input>과 동일하게 value속성을 사용한다. */}
              <td><textarea name="contents" cols='22' rows='3'
                      value={props.selectRow.contents}></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="수정하기"></input>
      </form>
      </article>
    );
  }

export default ArticleEdit;