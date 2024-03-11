import { useState } from 'react';
import './App.css';
import List from './modules/List';
import View from './modules/View'
import Write from './modules/Write';
import Edit from './modules/Edit';

function App() {

  const [topics,setTopics] = useState([
    {no:1, writer:'낙짜쌤', date:'2023-01-01', contents:'오늘은 React공부하는날' },
    {no:2, writer:'유겸이', date:'2023-03-03', contents:'어제는 Javascript공부했음' },
    {no:3, writer:'개똥이', date:'2023-05-05', contents:'내일은 Project해야지' }
  ]);
  
  const [nextNo, setNextNo] = useState(4);

  const [mode, setMode] = useState('list');
  const [no, setNo] =useState(null);
  return (
    <div className="App">
      <View></View>
      <List topics={topics}></List>
      <Write writeAction={(w, c)=>{
        let dateObj = new Date();
        var year = dateObj.getFullYear();
        var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
        var day = ("0" + dateObj.getDate()).slice(-2);
        let nowDate = year + "-" + month + "-" + day;

        let addTopics = {no:nextNo, writer:w, contents:c, date:nowDate};

        let copyTopics = [...topics];
        copyTopics.push(addTopics);
        setTopics(copyTopics);

        setNextNo(nextNo+1);
        setMode('list');
      }}></Write>
    </div>
  );
}

export default App;
