import {useEffect, useState} from "react";
import {getCurrentUser} from "../../../auth/AuthService";
import IUser from "../../../models/UserModel";
import {Link} from "react-router-dom";

export const LibraryServices = () => {
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        const user = getCurrentUser();


        if (user) {
            setCurrentUser(user);
        }
    }, []);
    return (
        <div className='container my-5'>
            <div className='row p-4 align-items-center border shadow-lg'>
                <div className='col-lg-7 p-3'>
                    <h1 className='display-4 fw-bold'>
                        Can't find what you are looking for?
                    </h1>
                    <p className='lead'>
                        If you cannot find what you are looking for,
                        send our library admin's a personal message!
                    </p>
                    <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
                    {
                        currentUser ? <Link className='btn main-color btn-lg text-white' to='search'>Explore top books</Link> :
                            <Link className='btn main-color btn-lg text-white' to='register'>Sign up</Link>
                    }
                    </div>
                </div>
                <div className='col-lg-4 offset-lg-1 shadow-lg lost-image'></div>
            </div>
        </div>
    );
}