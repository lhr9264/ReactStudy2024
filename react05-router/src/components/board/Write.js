import React from "react";
import { Link } from 'react-router-dom';
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
export default Write;
