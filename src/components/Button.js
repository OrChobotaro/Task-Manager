export function Button ({type, text,handleClick}){
    return (
       
        <button type={type} className="btn btn-primary" onClick={handleClick}>{text}</button>
    )
}