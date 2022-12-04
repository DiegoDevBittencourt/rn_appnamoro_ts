import React, { useEffect } from 'react';

import P from '../P';
import { theme } from '@constants/StyledComponentsTheme';
import { MainContainer, MultiSliderComponentCustom, PCustom, SubContainer } from './styles';
import { MultiSliderType } from './interface';

const MultiSlider = ({
    values,
    title,
    rightText,
    min,
    max,
    onValuesChange,
    onValuesChangeFinish,
    customContainerStyle
}: MultiSliderType) => {

    return <MainContainer style={customContainerStyle}>

        <SubContainer>

            <P>{title}</P>

            {
                values && (
                    values?.length > 1 ?
                        <PCustom>Entre {values[0]} e {values[1]}{values[1] === max && '+'}</PCustom>
                        :
                        <PCustom>{`${values[0]} ${rightText}`}{values[0] === max && '+'}</PCustom>
                )
            }

        </SubContainer>

        <MultiSliderComponentCustom
            min={min}
            max={max}
            values={values}
            sliderLength={325}
            markerStyle={{ height: 30, width: 30, borderRadius: 40, backgroundColor: theme.$primaryColor }}
            selectedStyle={{ backgroundColor: theme.$primaryColor }}
            containerStyle={{ alignItems: 'center' }}
            onValuesChange={onValuesChange}
            onValuesChangeFinish={onValuesChangeFinish}
        />
    </MainContainer>
}

export default MultiSlider;
