import BookModel from "../../models/BookModel";
import {useEffect, useState} from "react";
import {StarsReview} from "../Utils/StarsReview";
import {CheckoutAndReviewBox} from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {LatestReviews} from "./LastestReviews";
import IUser from "../../models/UserModel";
import {getCurrentUser} from "../../auth/AuthService";
import authHeader from "../../auth/AuthHeader";

export const BookCheckoutPage = () => {

    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([])
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);
    const [isCheckedOutByUser, setIsCheckedOutByUser] = useState(false);
    const [isLoadingCheckedOutByUser, setIsLoadingCheckedOutByUser] = useState(true);

    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const user = getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img,
            };

            setBook(loadedBook);
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [isCheckedOutByUser]);

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews?bookId=${bookId}`;

            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews.reviews;

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0;

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription,
                });
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, []);

    useEffect(() => {
        const fetchIsLoadingCurrentLoans = async () => {
            if(currentUser){
                const url: string = `http://localhost:8080/api/books/secured/ischeckedout/byuser?bookId=${bookId}`;

                const requestOptions = {
                    method: 'GET',
                    headers: authHeader()
                }

                const isCheckedOutResponse = await fetch(url, requestOptions);
                if(!isCheckedOutResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const isCheckedOutResponseJson = await isCheckedOutResponse.json();
                setIsCheckedOutByUser(isCheckedOutResponseJson);
                console.log(isCheckedOutResponseJson);
            }
        }
        fetchIsLoadingCurrentLoans().catch((error: any) => {
            setIsLoadingCheckedOutByUser(false);
            setHttpError(error.message);
        });
    }, [currentUser, isCheckedOutByUser]);

    useEffect(() => {
        const fetchCurrentLoansCount = async () => {
            if(currentUser){
                const url: string = `http://localhost:8080/api/books/secured/currentloans/count`;

                const requestOptions = {
                    method: 'GET',
                    headers: authHeader()
                }

                console.log(requestOptions)
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if(!currentLoansCountResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                console.log(currentLoansCountResponseJson)
                setCurrentLoansCount(currentLoansCountResponseJson);
            }
            setIsLoadingCurrentLoansCount(false);
        }
        fetchCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        });
    }, [currentUser, isCheckedOutByUser]);

    async function handleCheckout() {
        const url: string = `http://localhost:8080/api/books/secured/checkout?bookId=${book?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: authHeader()
        }
        const checkoutResponse = await fetch(url, requestOptions);
        if(!checkoutResponse.ok) {
            throw new Error('Something went wrong!');
        }

        setIsCheckedOutByUser(true);
    }

    if (isLoading || isLoadingReview || isLoadingCurrentLoansCount) {
        return (
            <SpinnerLoading />
        )
    }

    return (
        <div>
            <div className={'container d-none d-lg-block'}>
                <div className={'row mt-5'}>
                    <div className={'col-sm-2 col-md-2'}>
                        {
                            book?.img ?
                                <img src={book?.img} width='226' height='349' alt='Book'/>
                                :
                                <img src={require('../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt='Book'/>
                        }
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2>{book?.title}</h2>
                            <h5 className='text-primary'>{book?.author}</h5>
                            <p className='lead'>{book?.description}</p>
                            <StarsReview rating={totalStars} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} currentUser={currentUser} currentLoansCount={currentLoansCount} isCheckedOut={isCheckedOutByUser} handleCheckout ={handleCheckout}/>
                </div>
                <hr/>
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true}/>
            </div>
            <div className={'container d-lg-none mt-5'}>
                <div className={'d-flex justify-content-center alighn-items-center'}>
                    {
                        book?.img ?
                            <img src={book?.img} width='226' height='349' alt='Book'/>
                            :
                            <img src={require('../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt='Book'/>
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{book?.title}</h2>
                        <h5 className='text-primary'>{book?.author}</h5>
                        <p className='lead'>{book?.description}</p>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} currentUser={currentUser} currentLoansCount={currentLoansCount} isCheckedOut={isCheckedOutByUser} handleCheckout ={handleCheckout}/>
                <hr/>
            </div>
        </div>
    )
}