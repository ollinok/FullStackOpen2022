import { useState } from 'react';

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = ({good, neutral, bad}) => {
  const total = () => (good+neutral+bad);
  const avg = () => (total() === 0 ? 0 : ((good-bad)/total()).toFixed(2));
  const pos = () => (total() === 0 ? 0+' %' : (good/total()*100)).toFixed(1)+' %';
  if (total() === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given.</p>
      </div>
    );
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <thead />
        <tfoot />
        <tbody>
          <StatisticsLine text='Good' value={good}/>
          <StatisticsLine text='Neutral' value={neutral}/>
          <StatisticsLine text='Bad' value={bad}/>
          <StatisticsLine text='Total' value={total()}/>
          <StatisticsLine text='Average' value={avg()}/>
          <StatisticsLine text='Positive' value={pos()}/>
        </tbody>
      </table>
    </div>
  );
}

const StatisticsLine = (props) => {
  return (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
  
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  }
  const handleClickBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>Give us feedback</h1>
      <Button handleClick={handleClickGood} text='Good' />
      <Button handleClick={handleClickNeutral} text='Neutral' />
      <Button handleClick={handleClickBad} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;