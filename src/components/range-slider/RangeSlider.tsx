import React, { CSSProperties, useContext } from 'react';
import { Slider, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { AMOUNT_MIN, RangeType } from '../operation/list/OperationList';

const { Text } = Typography;

type RangeSliderProps = {
  range: RangeType;
  onChange: (arr: number[]) => void;
  maxSliderValue: number;
};

export default function RangeSlider({ range: { min, max }, onChange, maxSliderValue }: RangeSliderProps) {
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();

  return (
    <>
      <Text strong style={{ width: 80, color: palette.fontColor }}>
        {t('rangeSliderLabel')}
      </Text>
      <Slider
        range
        defaultValue={[min, max]}
        style={styles}
        onChange={onChange}
        min={AMOUNT_MIN}
        max={maxSliderValue}
      />
    </>
  );
}

const styles: CSSProperties = {
  width: '100%',
};
