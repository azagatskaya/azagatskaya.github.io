import React, { CSSProperties, useContext } from 'react';
import { Slider, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import dayjs from 'dayjs';
import { DateRangeType } from 'src/shared/serverTypes';
import { defaultDateRange } from 'src/components/operation/list/OperationList';

const { Text } = Typography;

type RangeSliderProps = {
  range: DateRangeType;
  onChange: (arr: number[]) => void;
  sliderMinMax: DateRangeType;
};

export default function DateRangeSlider({
  range: { min, max },
  onChange,
  sliderMinMax = defaultDateRange,
}: RangeSliderProps) {
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();

  return (
    <>
      <Text strong style={{ width: 80, color: palette.fontColor }}>
        {t('dateRangeSliderLabel')}
      </Text>
      <Slider
        range
        tooltip={{
          open: true,
          formatter: (value) => (
            <Typography style={{ color: palette.fontColor }}>{dayjs(value).format('DD-MM-YYYY').toString()}</Typography>
          ),
        }}
        defaultValue={[min.valueOf(), max.valueOf()]}
        style={{ ...styles, color: palette.fontColor }}
        onChange={onChange}
        min={sliderMinMax.min.valueOf()}
        max={sliderMinMax.max.valueOf()}
      />
    </>
  );
}

const styles: CSSProperties = {
  width: '100%',
};
