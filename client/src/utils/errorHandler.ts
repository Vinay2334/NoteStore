function errorHandler(error: Array<any>){
    let result:string = "";
    console.log("Error handler", error);
    try {
        if(error && error.length > 0){
            error.map((data, index) => {
                result += data.detail+',';
            })
            return result.slice(0, -1);
        }
    } catch (error) {
        return "Internal server Error";
    }
}

export default errorHandler;