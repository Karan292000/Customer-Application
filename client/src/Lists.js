import "./App.css"
import { FaChevronCircleRight ,FaUser} from "react-icons/fa";

export default function List({ title, src, subtitle,idClick,idchange,idvalue }) {

  return (
    <>
      <div className="container">
      {src ? (
          <img alt="first" className="img" src={src} />
        ) : (
          <div className="user-icon-div">
            <FaUser className="user-icon" />
          </div>
        )}
        <div className="icon-text-div">
        <div className="text" onClick={idClick} onChange={idchange} defaultValue={idvalue}>
          <h6>{title}</h6>
          <p>{subtitle}</p>
        </div>
        <button className="btn-icon" onClick={idClick} onChange={idchange} value={idvalue}>
         {'>>'}
        </button>
      </div>
      </div> 
    </>
  );
}
