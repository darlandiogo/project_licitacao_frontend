export default variable => {
    const vars = {
        route_basename: 'http://127.0.0.1:3000',//process.env.REACT_APP_ROUTE_BASENAME,
        api: "http://127.0.0.1:8000/api", //process.env.REACT_APP_API_URL,
    };

    if(!(variable in vars)) {
        throw new Error('This variable don\' exists in config');
    }

    return vars[variable];
}