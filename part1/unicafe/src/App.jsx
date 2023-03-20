import { useState } from 'react'

function App() {
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const handleGoodClick = () => setStats({...stats, good: stats.good+1})
  const handleNeutralClick = () => setStats({...stats, neutral: stats.neutral+1})
  const handleBadClick = () => setStats({...stats, bad: stats.bad+1})

  const StatisticLine = ({text, value}) => {
    return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }

  const Statistics = ({props}) => {
    const total = props.good + props.neutral + props.bad
    return (
    <>
      <h1>statistics</h1>
      {
        total != 0 ? 
          <table>
            <StatisticLine  text="good" value={props.good} />
            <StatisticLine  text="neutral" value={props.good} />
            <StatisticLine  text="bad" value={props.bad} />
            <StatisticLine  text="all" value={props.good+props.neutral+props.bad} />
            <StatisticLine  text="average" value={(props.good+props.neutral+props.bad)/3} />
            <StatisticLine  text="positive" value={((props.good/props.bad)*100) || 0} />
          </table> 
          : 
          <p>No feedback given</p>
      }
    </>
    )
  }

  return (
    <>
      <h1>give feedback</h1>
      <div style={{display: 'flex'}}>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <Statistics props={stats} />
    </>
  )
}

export default App
