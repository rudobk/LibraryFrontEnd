import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import IUser from "../../models/UserModel";
import {LeaveAReview} from "../Utils/LeaveAReview";

export const CheckoutAndReviewBox: React.FC<{ book: BookModel | undefined, mobile: boolean,
        currentUser: IUser | undefined, currentLoansCount: number, isCheckedOut: boolean, handleCheckout: any,
        isReviewLeft: boolean, submitReview: any}> = (props) => {

    function reviewRender() {
        if (props.currentUser && !props.isReviewLeft) {
            return(
                    <LeaveAReview submitReview={props.submitReview}/>
            )
        } else if (props.currentUser && props.isReviewLeft) {
            return(
                <p>
                    <b>Thank you for your review!</b>
                </p>
            )
        }
        return (
            <div>
                <hr/>
                <p>Sign in to be able to leave a review.</p>
            </div>
        )
    }
    function buttonRender() {
        if(props.currentUser) {
            if(!props.isCheckedOut && props.currentLoansCount < 5) {
                return <button onClick={() => props.handleCheckout()} className='btn btn-success btn-lg'>Checkout</button>
            } else if(props.isCheckedOut) {
                return (<p><b>Book checked out. Enjoy!</b></p>)
            } else if(!props.isCheckedOut) {
                return (<p><b>Too many books checkedout.</b></p>)
            }
        }
        return <Link to='/login' className='btn btn-success btn-lg'>Sign in</Link>
    }
    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{props.book?.copies} </b>
                            copies
                        </p>
                        <p className='col-6 lead'>
                            <b>{props.book?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                {
                    buttonRender()
                }
                <hr />
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                {
                    reviewRender()
                }
            </div>
        </div>
    );
}