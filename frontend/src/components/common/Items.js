const Items = (props) => {
    return(
    <div className="card">
        <div className="card-body">
            <div className="pic">
                <img src={require('./../img/'+props.pic)}/>

            </div>
            <div className="description">

            </div>
        </div>
    </div>
    )
}
export default Items;