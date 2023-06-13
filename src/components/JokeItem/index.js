import './index.css'

const JokeItem = props => {
  const {jokeObject} = props
  const {id, joke, category, language} = jokeObject
  const addStyleToCategory = ['Programming', 'Misc', 'Pun', 'Dark'].filter(
    eachItem => eachItem === category,
  )
  const addStyle = addStyleToCategory[0].toLowerCase()

  // returning the each joke item with complete details
  return (
    <tr>
      <td className="cell-style">{id}</td>
      <td className="cell-style">{joke}</td>
      <td className="cell-style">{language}</td>
      <td className={`cell-style ${addStyle}`}>{category}</td>
    </tr>
  )
}

export default JokeItem
