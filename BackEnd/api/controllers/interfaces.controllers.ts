export interface sqlReturnInterface {
    serverError: boolean,
    status: number,
    body: any,
    msg: string
}

export interface credentialsInterface {
    adminName: string, 
    passWord: string,
}