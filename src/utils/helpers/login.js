export function checkAuth() {
    var dataSession = JSON.parse(sessionStorage.getItem('Auth')) || null;
    if (dataSession === null) {
        window.location.href = '/Login';
    }
}
