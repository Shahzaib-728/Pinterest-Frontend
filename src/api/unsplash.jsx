import axios from 'axios';

const unsplash = axios.create({
    baseURL: "https://api.unsplash.com/",
    headers: {
        Authorization: "Client-ID cMjTW0yxn8CX1wQUHrF5mGAOrsHmKRKZyUVph0MmWGY",
    }
});

export default unsplash;
