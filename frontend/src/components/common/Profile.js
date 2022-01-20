import { useLocation, useParams } from "react-router-dom";
import Navbar2 from "./Navbar2"
import "./../css/components.css"

const Profile = () => {
    const params = useParams();
    console.log(params);
    const location = useLocation();
    console.log(location);
    const details = location.state.data;
    const btstyle={
        height: '30px',
        padding: '0px',
        width: '75px',
    }
    return (
        <div className="profile">
            <Navbar2/>
            <div className="header" >
                <img src={require('./../img/nou.png')} className='prof'/>
                <h2>{details.name}</h2>
            </div>
            <ul className="details">
                <li className="name">
                    <h4>Name</h4>
                    <div className="edit">
                        <input type="text" id="name" name="name" disabled value={details.name}/>
                        <buttton className='btn btn-danger' id='dname' style={btstyle}>edit</buttton>
                    </div>
                </li>
                <li className="email">
                    <h4>Email</h4>
                    <div className="edit">
                        <input type="text" id="email" name="email" disabled value={details.email}/>
                        <buttton className='btn btn-danger' id='demail' style={btstyle}>edit</buttton>
                    </div>
                </li>
                <li className="phone">
                    <h4>Phone number</h4>
                    <div className="edit">
                        <input type="text" id="phone" name="phone" disabled value={details.contact_number}/>
                        <buttton className='btn btn-danger' id='dphone' style={btstyle}>edit</buttton>
                    </div>
                </li>
                <li className="batch">
                    <h4>Batch</h4>
                    <div className="edit">
                        <input type="text" id="batch" name="batch" disabled value={details.batch}/>
                        <buttton className='btn btn-danger' id='dbatch' style={btstyle}>edit</buttton>
                    </div>
                </li>

                <li className="password">
                    <h4>Password</h4>
                    <div className="edit">
                        <input type="password" id="password" name="password" disabled value='*************'/>
                        <buttton className='btn btn-danger' id='dpassword' style={btstyle}>edit</buttton>
                    </div>
                </li>

                <li className="Age">
                    <h4>Age</h4>
                    <div className="edit">
                        <input type="age" id="" name="age" disabled value={details.age}/>
                        <buttton className='btn btn-danger' id='dage' style={btstyle}>edit</buttton>
                    </div>
                </li>

            </ul>
        </div>

    )
}

export default Profile;