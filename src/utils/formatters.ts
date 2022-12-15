import { getSearchingByDesc, keepOnlyNumbers, titleCase } from "./functions";

export const formatUserToApi = (user: any) => {

    if (typeof user?.searchingBy == 'number') {
        user.searchingBy = {
            key: user?.searchingBy,
            label: getSearchingByDesc(user?.searchingBy)
        };
    }

    if (user?.phone != undefined)
        user.phone = keepOnlyNumbers(user.phone);

    if (user?.company != undefined)
        user.company = titleCase(user.company);

    if (user?.position != undefined)
        user.position = titleCase(user.position);

    if (user?.firstName != undefined)
        user.firstName = titleCase(user.firstName);

    if (user?.lastName != undefined)
        user.lastName = titleCase(user.lastName);

    return user;
}