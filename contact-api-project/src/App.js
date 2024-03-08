import './App.css';
import React, {useState, useEffect} from 'react';

function Contacts(props){

  var [myJSON, setmyJSON] = useState({contacts:[]});

  useEffect(function(){
    fetch("https://sample.bmaster.kro.kr/contacts?pageno=3")
    .then((contacts)=>{
      return contacts.json();
    })
    .then((json)=>{
      setmyJSON(json);
    });
  },[]);

  let trTag = [];
  for(let i=0 ; i <myJSON.length ; i++){
    let data = myJSON.contacts[i];
    trTag.push(
      <tr key={data.no}>
        <td><img scr={data.photo} alt='{data.name}' /></td>
        <td><a href='/' onClick={(e)=>{
          e.preventDefault();
          props.onProfile(data);
        }}>{data.name}</a></td>
      </tr>
    )
  };
  return (
    <div>
      <table border='1'>
        <thead>
          <tr>
            <th>photo</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>{trTag}</tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h2>연락처 API 연동하기</h2>
      <Contacts></Contacts>
    </div>
  );
}

export default App;
