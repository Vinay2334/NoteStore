function errorHandler(errors: Array<any>){
    let result:string = "";
    errors.map((data, index) => {
        result += data.detail+',';
    })
    return result.slice(0, -1);
}

export default errorHandler;