import React, { CSSProperties, useContext } from 'react';
import { Slider, Typography } from 'antd';
import { AMOUNT_MAX, AMOUNT_MIN, RangeType } from 'src/components/operation/list/OperationList';
import { useTranslation } from 'react-i18next';
import ThemeContext from 'src/contexts/ThemeContext';
const { Text } = Typography;

interface RangeSliderProps {
  range: RangeType;
  onChange: (range: number[]) => void;
  maxValue: number;
}
export default function RangeSlider({ range: { min, max }, onChange, maxValue }: RangeSliderProps) {
  const { palette } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <>
      <Text strong style={{ width: 80, color: palette.fontColor }}>
        {t('rangeSliderLabel')}
      </Text>
      <Slider range defaultValue={[min, max]} style={styles} onChange={onChange} min={AMOUNT_MIN} max={maxValue} />
    </>
  );
}

const styles: CSSProperties = {
  width: '100%',
};
