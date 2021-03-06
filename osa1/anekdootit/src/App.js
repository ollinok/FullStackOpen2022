import { useState} from 'react';

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const getRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length)));
  }

  const voteAnecdote = () => {
    const c = [...votes]
    c[selected] += 1;
    setVotes(c);
  }

  const bestAnecdote = () => votes.indexOf(Math.max(...votes));

  const AnecdoteView = (props) => {
    return ( 
      <div>
        <h1>{props.text}</h1>
        <p>{props.anecdote}</p>
        <p>has {props.votes} votes.</p>
      </div>
    );
  } 

  return (
    <div>
      <AnecdoteView 
        anecdote={anecdotes[selected]}
        text='Anecdote of the day'
        votes={votes[selected]}
      />
      <button onClick={voteAnecdote}>Vote</button>
      <button onClick={getRandomAnecdote}>Next anecdote</button>
      <AnecdoteView 
        anecdote={anecdotes[bestAnecdote()]}
        text='Most voted anecdote'
        votes={votes[bestAnecdote()]}
      />
    </div>
  );
}

export default App;
