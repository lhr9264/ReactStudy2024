import React from "react";

function NavView(props){
    return (
      <nav>
        <a href="#" onClick={function(event){
          event.preventDefault();
          props.onChangeMode('list');
        }}>목록</a>{" "}
        <a href="/edit" onClick={function(event){
          event.preventDefault();
          props.onChangeMode('edit');
        }}>수정</a>{" "}
        <a href="/delete" onClick={function(event){
          event.preventDefault();
          //JSX에서는 confirm앞에 window를 추가해야한다.
          if(window.confirm('삭제할까요?')){
          props.onChangeMode('delete');
          }
        }}>삭제</a>
      </nav>
    )
  }

  export default NavView;