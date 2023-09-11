

const DeleteModal = ({handleDelete,closeDeleteModel}) => {
  return (
     <div className='overlay'>
      <div className="modal__card">
        <p className="content">Are you sure?</p>
        <div className="btn__container">
          <button className="btn btn-confirm" onClick={handleDelete}>confirm</button>
          <button className="btn btn-cancel" onClick={closeDeleteModel}>cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal