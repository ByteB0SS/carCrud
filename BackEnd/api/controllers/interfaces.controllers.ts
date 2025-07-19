export interface returnType {
    serverError: boolean,
    status: number,
    body: any,
    msg: string
}

export interface credentialsInterface {
    adminName: string, 
    passWord: string,
}

export interface updateCredentialsInterface {
    oldPassWord: string,
    newAdminName: string,
    oldAdminName: string,
    newPassWord: string,
}

export interface adminInterface { 
    adminName: string,
    passWord: string
}

