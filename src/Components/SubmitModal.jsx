import { useState, useEffect } from "react";
import "../Styles/Modal.scss";
import { useDispatch } from "react-redux";
import { postImage } from "../slice/gallerySlice";

const SubmitModal = ({closeModel}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [data, setData] = useState({
    label: '',
    url:''
  })
  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [error]);
  const handleChange = (e) => {
    setData({...data,[e.target.name]:e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/i;
    const isValidImageUrl = imageUrlRegex.test(data.url);

    if (data.label === '') {
      setError('Enter vaild label');
      return;
    } else if (!(isValidImageUrl)) {
      setError('Enter valid img URL')
      return
    } 
    dispatch(postImage(data));
    closeModel()
    setData({
      label: '',
      url:''
    })
  }
  return (
    <div className='overlay'>
      <div className="modal__card">
        <form action="">
          <input type="text" name="label" onChange={handleChange} className="input" placeholder='label' />
          <input type="text" name="url" onChange={handleChange} className="input" placeholder='image link' />
           <div className="btn__container">
          <button className="btn btn-confirm" onClick={closeModel}>cancel</button>
          <button className="btn btn-cancel" onClick={handleSubmit}>submit</button>
        </div>
        </form>
        {error && <span className="error-submit">{error}</span>}
      </div>
    </div>
  )
}

export default SubmitModal