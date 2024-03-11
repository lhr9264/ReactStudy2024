import React, {useState} from "react";

function Edit(props) {

    const [writer, setWriter] = useState(props.selectRow.writer);
    const [contents, setContents] = useState(props.selectRow.contents);
        return (
            <article>
            <form onSubmit={(event)=>{
                let writer = event.target.writer.value;
                let contents = event.target.contents.value;

                props.editAction(writer, contents);
            }}>
                <table>
                    <tr>
                        <td>Writer : <input type="text" name="writer" size="40"
                        value={writer}
                        onChange={(event)=>{
                            setWriter(event.target.value)
                        }} />
                        <input type="submit" value="수정취소" id="btn" /></td>
                        <td rowspan="2"><input type="submit" value="댓글수정" id="btn" /></td>
                    </tr>
                    <tr>
                        <td><textarea name="contents" cols="51" rows="5"
                                value={contents}
                                onChange={(event)=>{
                                    setContents(event.target.value)
                                }}></textarea></td>
                    </tr>
                </table>    
            </form>
            </article>
        );
}

export default Edit;