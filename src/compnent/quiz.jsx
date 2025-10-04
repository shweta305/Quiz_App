import React, { useRef, useState } from 'react'
import './quiz.css'
import { quizQuestions } from '../assets/data'
function Quiz() {
    let data=quizQuestions;
    let [index,setIndex] = useState(0);
    let [questions,setQuestions]=useState(data[index])
   let [lock,setLock] = useState(false)
  let [score,setScore]=useState(0);
  let [result,setResult]=useState(false);
  const optionListRef = useRef(null)
    const checkAns=(e,ans)=>{
        if(!lock){
        if (questions.answer==ans) {
            e.target.classList.add('correct')
            setLock(true);
            score++;
            setScore(score);
        } else {
            e.target.classList.add('incorrect')
            let allOptions = e.target.parentNode.querySelectorAll("li");
            allOptions.forEach((li) => {
                if (li.innerText === questions.answer) {
                    li.classList.add("correct");
                }
            });
             setLock(true);
        }}
    }

  const nextFun=()=>{
  if(lock ){
    if(index+1<data.length){
    setIndex(++index);
    setQuestions(data[index]);
    setLock(false);
    let allOptions = optionListRef.current.querySelectorAll("li");
      allOptions.forEach((li) => {
        li.classList.remove("correct");
        li.classList.remove("incorrect");
      });}else{
        setResult(true)
      }
  }
}


  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr/>{
        result?<><h2>You scrored {score} out of {data.length}</h2>
        <button onClick={()=> { setResult(false);setIndex(0);setLock(false)}}>reset</button></>:<> <h2>{index+1}.{questions.question}</h2>
      <ul ref={optionListRef}>
       { questions.options.map((item,i)=>
       <li key={i} onClick={(e)=>{checkAns(e,item);}}>{item} </li>)}
        
        </ul>
       <div className='next' onClick={()=>{nextFun()}}><button>Next</button></div> 
        <div className="index">
            {index+1} of {data.length} questions</div></>
      }
     
    </div>
  )
}

export default Quiz
