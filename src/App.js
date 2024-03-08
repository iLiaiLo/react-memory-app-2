import React from "react";


let random=["yellow","green","blue","red","purple","orange","black"]

function App() {
  const [start,setStart]=React.useState(false);
  const [lost,setLost]=React.useState(false);

  const [addcount,setAddcount]=React.useState(3);
  const [content,setContent]=React.useState(false);
  const [count,setCount]=React.useState(addcount);
  const [array,setArray]=React.useState([]);
  const [myArray,setMyArray]=React.useState([]);
  const [index,setIndex]=React.useState(0);
  const [Disabled,setDisabled]=React.useState(true);
  const [massage,setMassage]=React.useState("");
  const [Continue,setContinue]=React.useState(false);
  const [toggle,setToggle]=React.useState(false);

  React.useEffect(() => {
    if (count > 0 && start) {
      setTimeout(() => {
        setContent(true);
        setCount(c=>c-1);
        let new_item=random[Math.floor(Math.random()*random.length)]
        setArray(prewarray=>[...prewarray,new_item])
      }, 1500);
    }
    else if(count===0){
      setDisabled(false)
    }

  }, [count,start]);
  
  React.useEffect(()=>{
    if(count > 0 && start){
    setTimeout(() => {
      setContent(false);
    }, 2500);
  }
  else if(count===0){
    setDisabled(false);
  }
  },[count,start])

  function isSame(arr1,arr2){
    return JSON.stringify(arr1)===JSON.stringify(arr2);
  }

  function addition(e){
    if(e.key===" "){
      let val=e.target.value;
      setMyArray(prew=>[...prew,val.trim()]);
      setIndex(i=>i+1);
      e.target.value="";
    }
  }

  //const [massage,setMassage]=React.useState("");
  //const [Continue,setContinue]=React.useState(false);

  React.useEffect(()=>{
    if(myArray.length!==0 && array.length!==0){
      if(myArray[myArray.length-1]===array[index-1]){
        setTimeout(()=>setMassage("correct"),400);
        setTimeout(()=>setMassage(""),1000);
      }
     
      else{
        setStart(false);
        setLost(true);
        //console.log("not equal");
        setMassage(`You have written ${myArray[myArray.length-1]} not ${array[index-1]}`);

        setArray([]);
        setMyArray([])
        setIndex(0);
        setCount(0);
        //setAddcount(0);
        setDisabled(true)
      }

      if(isSame(myArray,array)){
        setStart(false);
        setAddcount(c=>c+1);
        console.log(count);
        setArray([]);
        setMyArray([])
        setIndex(0);
        setCount(addcount+1);
        setContinue(true); 
        setDisabled(true)
      }
    }  
  }
    ,[myArray,array,index,addcount,count,lost,Continue])


    function requestContent(){
      const resetGame = () => {
        setStart(true);
        setLost(false);
        setArray([]);
        setMyArray([]);
        setIndex(0);
        setAddcount(3);
        setCount(addcount);
        setMassage("");
        setDisabled(true)
      };
  
      return(
        <div className="Lostmassage">
        <h2>You lost. Do you want to play again?</h2>
        <div className="lostRequest">
        <button onClick={resetGame}>yes</button>
        <button onClick={()=>window.close()}>no</button>
        </div>
        </div>
      )
    }


    function requestContinue(){
      const continueGame = () => {
        setStart(true);
        setArray([]);
        setMyArray([]);
        setIndex(0);
        setCount(addcount);
        setContinue(false);
        setDisabled(true);
      };
      return(
        <div className="massage">
        <h2>You are done</h2>
        <h2 style={{textAlign:"center"}}>Do you want to continue game?</h2>
        <div className="yesNo">
        <button onClick={continueGame}>yes</button>
        <button onClick={()=>window.close()}>no</button>
        </div>
        </div>
      )
    }

  //const [toggle,setToggle]=React.useState(false)


  return (
    <div>
    <div className="container">
      
      <input type="text"  className="inputWord" onKeyDown={e=>addition(e)} disabled={Disabled}/>
      <div>
      <button className="start" style={{display:`${toggle?"none":"block"}`}} onClick={()=>{setStart(true);setToggle(true)}}>Start</button>
      </div>
    </div>

      <div className="TextContainer">
      {content  && <h1 className="randomWords" style={{background:`${array[array.length-1]}`,color:`${array[array.length-1]==="yellow"?"black":"white"}`}}>{array[array.length-1]}</h1>}
      {massage && <h1 className="Massage">{massage}</h1>}
      {lost && requestContent()}
      {Continue && requestContinue()}
      </div>

      </div>

  );
}

export default App;
