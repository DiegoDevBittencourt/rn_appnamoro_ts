import { keepOnlyNumbers, titleCase } from "./functions";

export const formatUserToApi = (user: any) => {

    if (user?.phone != undefined)
        user.phone = keepOnlyNumbers(user?.phone);

    if (user?.company != undefined)
        user.company = titleCase(user?.company);

    if (user?.position != undefined)
        user.position = titleCase(user?.position);

    if (user?.firstName != undefined)
        user.firstName = titleCase(user?.firstName);

    if (user?.lastName != undefined)
        user.lastName = titleCase(user?.lastName);

    return user;
}

export const recordsToJSON = (records: any) => {
    return JSON.parse(JSON.stringify(records));
}
