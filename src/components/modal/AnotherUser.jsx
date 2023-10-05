function AnotherUser({ wrongUserData }) {
  return (
    <div>
      <div className="popupContainer open">
        <div className="popup open">
          <h1 className='text-center text-danger'>{wrongUserData}</h1>
        </div>
      </div>
    </div>
  )
}

export default AnotherUser