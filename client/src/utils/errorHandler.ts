function errorHandler(error: Array<any>){
    let result:string = "";
    console.log("Error handler", error);
    if(error && error.length > 0){
        error.map((data, index) => {
            result += data.detail+',';
        })
        return result.slice(0, -1);
    }
    else{
        return "Internal server error";
    }
}

export default errorHandler;