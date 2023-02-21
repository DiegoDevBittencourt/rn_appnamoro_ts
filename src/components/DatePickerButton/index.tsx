import React, { useState } from 'react';
import DateTimePicker from "react-native-modal-datetime-picker"

import P from '../P';
import { formatDateToDDMMYYYY } from '~/utils/functions';
import { maxBirthdayDate } from '@constants/genericConstants';
import { theme } from '@constants/styledComponentsTheme';
import { Button, MainContainer } from './styles';
import { DatePickerButtonType } from './interface';

const DatePickerButton = (props: DatePickerButtonType) => {

    const { updateSelectedDate, selectedDate } = props;

    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

    const handleDatePicked = (selectedDate: any) => {
        setIsDateTimePickerVisible(false);
        updateSelectedDate(formatDateToDDMMYYYY(selectedDate));
    }

    return <MainContainer>

        <DateTimePicker
            minimumDate={new Date('1900-01-01')}
            maximumDate={maxBirthdayDate}
            isVisible={isDateTimePickerVisible}
            onConfirm={(date) => handleDatePicked(date)}
            onCancel={() => setIsDateTimePickerVisible(false)}
        />

        <Button underlayColor={theme.$lightGray} onPress={() => setIsDateTimePickerVisible(true)}>

            <P>{selectedDate || 'Data de nascimento (+18)'}</P>

        </Button>
    </MainContainer >
}

export default DatePickerButton;
