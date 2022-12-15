import jwt from 'jwt-decode';

import { dangerNotification } from './notifications';
import * as Options from './options';

export function handleError(err: any) {
    try {
        const somethingIsWrong = 'Ops, parece que algo saiu mal. Tente novamente.';

        if (typeof err?.response?.data === "string") {
            let helper = err?.response?.data.split(' ');

            if (helper[0] !== '<!DOCTYPE' && err?.response?.status == 400)
                dangerNotification(err?.response?.data);
            else {
                console.log(err);
                console.log(somethingIsWrong + ' - ' + err?.response?.data);
            }

        } else {
            console.log(err);
            console.log(somethingIsWrong + ' - Ref: ' + err);
        }

    } catch (error) {
        console.log(err);
        console.log(error);
    }
}

export function calculateAge(birthday: Date) { // birthday is a date
    var ageDifMs = Date.now() - birthday?.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function emailValidator(text: string) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(text);
}

export function calculateDistanceFromLatLonInKm({ lat1, lon1, lat2, lon2 }: { lat1: number, lon1: number, lat2: number, lon2: number }) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}

export function decodeJwtToken(JWT_TOKEN: string) {
    return JWT_TOKEN ? jwt<any>(JWT_TOKEN)?.payload : '';
}

export function convertDateFormatToDDMMYYYY(date: any) {
    if (date !== '' && date !== null) {

        try {
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            let finalDate = dd + '/' + mm + '/' + yyyy;

            if (finalDate === 'NaN/NaN/NaN')
                return 'Indisponível';
            else
                return finalDate;
        } catch (error) {
            return 'conversion error';
        }
    } else
        return '';
}

export function convertDateStringFromDDMMYYYYtoMMDDYYYY(date: any) {
    const splittedBirthday = date.split('/');
    return splittedBirthday[1] + '-' + splittedBirthday[0] + '-' + splittedBirthday[2];
}

export function convertDateFormatToHHMM(date: any) {
    if (date !== '' && date !== null) {

        try {
            var hours = date.getHours();
            var minutes = date.getMinutes();

            hours = hours.toString().length == 1 ? `0${hours}` : hours;
            minutes = minutes.toString().length == 1 ? `0${minutes}` : minutes;

            var hourMinute = `${hours}:${minutes}`;

            if (hourMinute === 'NaN:NaN')
                return 'Indisponível';
            else
                return hourMinute;
        } catch (error) {
            return 'conversion error';
        }
    } else
        return '';
}

export function handleUserBirthday(birthday: any) {
    //this validation is needed cause if there's no birthdayon database, it brings todays date on userData.birthday:
    return convertDateFormatToDDMMYYYY(birthday) != convertDateFormatToDDMMYYYY(new Date()) ?
        convertDateFormatToDDMMYYYY(birthday) : null
}

export function setLimitCharactereSizeToString(str: string, limitSize: number) {

    let finalStr = str.substring(0, limitSize);
    finalStr = finalStr.length >= limitSize ? finalStr + '...' : finalStr;

    return finalStr;
}

export function getSearchingByDesc(searchingById: number) {
    const searchingByOptions = Options.searchingByOptions();

    let index = 0;
    for (let i = 0; i <= searchingByOptions.length - 1; i++) {
        if (searchingById === searchingByOptions[i].key)
            index = i;
    }

    return searchingByOptions[index].label;
}

export function getSchoolingDesc(schoolingId: number) {
    const schoolingOptions = Options.schoolingOptions();

    let index = 0;
    for (let i = 0; i <= schoolingOptions.length - 1; i++) {
        if (schoolingId === schoolingOptions[i].key)
            index = i;
    }

    return schoolingOptions[index].label;
}

export function getGenderDesc(genderId: number) {
    const genderOptions = Options.genderOptions();

    let index = 0;
    for (let i = 0; i <= genderOptions.length - 1; i++) {
        if (genderId === genderOptions[i].key)
            index = i;
    }

    return genderOptions[index].label;
}

export function checkIfSuperLikeIsAvailable(lastTimeSuperLikeWasUsed: any) {
    var timeStart = new Date(lastTimeSuperLikeWasUsed).getTime();
    var timeEnd = new Date().getTime();
    var hourDiff = timeEnd - timeStart; //in ms
    var hDiff = hourDiff / 3600 / 1000; //in hours
    var hours = Math.floor(hDiff);

    return hours > 24;
}

export function generateRandomKey(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
