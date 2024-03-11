import React from "react";
import Edit from "./Edit";

function List(props) {
    const lists = [];
    for(let i=0 ; i<props.topics.length ; i++){
     let row = props.topics[i];
     lists.push(
        <table id="boardTalbe" width="100%">
            <tr>
                <td>{row.no}</td>
                <td>{row.writer}</td>
                <td>{row.date}
                    <button type="button" onClick="">수정</button>
                    <button type="button" onClick="">삭제</button>
                </td>
            </tr>
            <tr>
            <td colSpan="3" className="subject">{row.contents}</td>
            </tr>
        </table>
     )
    }

    return (
        <article>
            <table id="boardTable">
                <tbody>
                {lists}
                </tbody>
            </table>  
        </article>
    );
}

export default List;