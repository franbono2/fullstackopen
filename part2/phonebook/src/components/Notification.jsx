const Notification = ({ message, type }) => {
  if (message === null || type === null){
    return null
  }

  const messageClass = type === 'error' ? 'error' : 'success'

  return (
    <div className={messageClass}>
      {message}
    </div>
  )
}

export default Notification