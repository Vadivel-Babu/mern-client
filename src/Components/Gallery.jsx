
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import "../Styles/Gallery.scss"
import {AiFillDelete} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getImages, deleteImage , removeImage} from "../slice/gallerySlice";
import Loading from "./Loading";


const Gallery = () => {
  const { images, searchText,error, isLoading} = useSelector((state) => state.images);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImages());
  }, [])

  const handleDelete = (id) => {
    dispatch(deleteImage(id)).unwrap().then(() => {
      dispatch(removeImage(id))
    })
  }
  
  return (
    <div className="container"> 
      {error && (
        <div className="error">
          <h3>{error}</h3>
        </div>
      )}
      {isLoading ? <Loading /> : (
        <ResponsiveMasonry
         columnsCountBreakPoints={{350: 1,500:2, 750: 3, 950: 4}}
        >
        <Masonry>
          {images.filter((img) => {
            if (searchText === '') {
              return img;
            } else if (img.label.toLowerCase().includes(searchText.toLowerCase())) {
              return img;
             }
           }).map((img) => (
            <div className="img__container" key={img._id}>
              <img src={img.url} alt="" className="img" />
              <div className="img__container-content">
                <p className="img__name">{img.label}</p>
                <button className="btn-delete" onClick={() => handleDelete(img._id)}><AiFillDelete/></button>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>  
      ) }
      {((images.length === 0) && !(isLoading)) && (
        <div className="noimage">
          <h1>your gallery is empty</h1>
        </div>
      )}
      
      
        
    </div>
  )
}

export default Gallery;