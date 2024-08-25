import PropTypes from 'prop-types'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info} /></p>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null])
  ])
}

export default Anecdote