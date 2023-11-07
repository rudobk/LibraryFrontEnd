export default function authHeader() {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);

    if (user && user.token) {
        return {
            Authorization: 'Bearer ' + user.token,
            'Content-Type': 'application/json'
        };
    } else {
        return {
            Authorization: '',
            'Content-Type': 'application/json'
        };
    }
}