// isLoggedIn.js

export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token === undefined || token === null || token === "") {
        return false;
    }
    return true;
};

export const doLogin = (token, next) => {
    localStorage.setItem("token", JSON.stringify(token));
    if (next) {
        next();
    }
}

export const doLogout = (next) => {
    localStorage.removeItem("token");
    if (next) {
        next();
    }
};


export const getCurrentUserDetail = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("token"))?.user;
    }
    return null;
};


export const getToken = () => {
    if (isLoggedIn()) {
        const data = JSON.parse(localStorage.getItem("token"));
        return data?.token || null;
    } else {
        return null;
    }
}