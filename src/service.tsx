import axios from "axios";

const http = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "Content-type": "application/json"
  }
});

export type Params = {
  q?: string,
  type?: string, 
}

const Service = {
    searchUsers: (params: Params) => {
        return http.get('/search/users', { params });
    },
    getOrganizations: (params: Params) => {
        return http.get('/organizations', { params })
    } 
};
  
  export default Service;
