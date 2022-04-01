import React,{Component, useState, useEffect, useCallback}from'react'
import dynamic from'next/dynamic';
import Link from'next/link'
import styled from'styled-components'
const Wrapper=styled.div`
display:flex;
`
const HomePage = () => {
  const [done, finishGame] = useState(false);
  const [score, setScore] = useState(null);
  const [current, setCurrent] = useState({
    first: null,
    second: null
  })
  const [pins, setPins] = useState([`white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`]);
  const [frames, addFrame] = useState([]);
  useEffect(() => {
    if (done === false && frames.length === 11 || (frames.length === 10 && !frames[frames.length - 1].addedValue)) {
      finishGame(true)
      setScore(frames.map((f, ind) => f.addedValue ? f.addedValue === 2 ? 10 + frames[ind + 1].first + frames[ind + 1].second : 10 + frames[ind + 1].first : f.first + f.second).reduce((a, b) => a + b))
      addFrame([])
      setPins([`white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`])
      setCurrent({first:null, second:null});
    }
  })
  return (
    <Wrapper>
            {done ? <div>
              <h1>You finished the game</h1>
              <h1>Score {score}</h1>
              <h2 onClick={()=>finishGame(false)}>Play again</h2>
              </div>
            : <><section style={{display:`flex`, flexDirection:`column`, alignItems:`center`}}>
            <div style={{display:`flex`, width:350, marginBottom:50, justifyContent:`space-between`}}>{pins.slice(0, 4).map((i, ind) => <div key={ind} style={{width:50,height:50, backgroundSize:`cover`, backgroundRepeat:`no-repeat`, backgroundPosition:`center`,backgroundImage:i === `black` ? `url(black.jpg)` : i === `white` ? `url(pin.jpeg)` : null}} onClick={i === `pressed` ? null : ()=>setPins(pins.map((p, pi) => pi === ind ? p === `white` ? `black` : `white` : p))}/>)}</div>
            <div style={{display:`flex`, width:250, marginBottom:50, justifyContent:`space-between`}}>{pins.slice(4, 7).map((i, ind) => <div key={ind} style={{width:50,height:50,backgroundSize:`cover`, backgroundRepeat:`no-repeat`, backgroundPosition:`center`,backgroundImage:i === `black` ? `url(black.jpg)` : i === `white` ? `url(pin.jpeg)` : null}} onClick={i === `pressed` ? null : ()=>setPins(pins.map((p, pi) => pi === ind + 4 ? p === `white` ? `black` : `white` : p))}/>)}</div>
            <div style={{display:`flex`, width:150, marginBottom:50, justifyContent:`space-between`}}>{pins.slice(7, 9).map((i, ind) => <div key={ind} style={{width:50,height:50,backgroundSize:`cover`, backgroundRepeat:`no-repeat`, backgroundPosition:`center`,backgroundImage:i === `black` ? `url(black.jpg)` : i === `white` ? `url(pin.jpeg)` : null}} onClick={i === `pressed` ? null : ()=>setPins(pins.map((p, pi) => pi === ind + 7 ? p === `white` ? `black` : `white` : p))}/>)}</div>
            <div style={{display:`flex`, width:50, marginBottom:50, justifyContent:`space-between`}}>{pins.slice(9, 10).map((i, ind) => <div key={ind} style={{width:50,height:50,backgroundSize:`cover`, backgroundRepeat:`no-repeat`, backgroundPosition:`center`,backgroundImage:i === `black` ? `url(black.jpg)` : i === `white` ? `url(pin.jpeg)` : null}} onClick={i === `pressed` ? null : ()=>setPins(pins.map((p, pi) => pi === ind + 9 ? p === `white` ? `black` : `white` : p))}/>)}</div>
            <p onClick={()=>{
              if (current.first === null && pins.filter(p => p === `black`).length === 10) {
                setPins([`white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`])
                setCurrent({first:null, second:null});
                addFrame(frames.concat(frames.length === 10 ? {first:10, second:0} : {first:10, second:0, addedValue:2}))
              }
              else if (current.first !== null) {
                addFrame(frames.concat(current.first + pins.filter(p => p === `black`).length === 10 && frames.length !== 10 ? {first:current.first,second:pins.filter(p => p === `black`).length, addedValue:1} : {first:current.first, second:pins.filter(p => p === `black`).length}))
                setPins([`white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`])
                setCurrent({first:null, second:null});
              } else if (frames.length === 10) {
                addFrame(frames.concat({first:pins.filter(p=>p===`black`).length,second:0}))
                setPins([`white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`, `white`])
                setCurrent({first:null, second:null});

              } else {
                setPins(pins.map(p => p === `white` ? p : `pressed`))
                setCurrent({first: pins.filter(p => p === `black`).length,second:null})
              }
            }}>next</p>
            </section>
            <section>
              {frames.map((f, ind) => (
                <div>
                  <h1>frame {ind + 1}</h1>
                  <p>{f.first === 10 ? `X` : f.first}</p>
                  {f.first !== 10 && <p>{f.first + f.second === 10 ? `/` : f.second}</p>}
                </div>
              ))}
            </section></>}
        </Wrapper>
  )
}
export default HomePage
