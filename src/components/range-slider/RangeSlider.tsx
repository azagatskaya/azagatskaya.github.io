import React, { CSSProperties, useContext } from 'react';
import { Slider, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { AMOUNT_MIN, OperationsContext, OperationsContextType, RangeType } from 'src/contexts/OperationsContext';
const { Text } = Typography;

export default function RangeSlider() {
  const { palette } = useContext<ThemeContextType>(ThemeContext);
  const { t } = useTranslation();
  const {
    range: { min, max },
    handleRangeChange,
    maxSliderValue,
  } = useContext<OperationsContextType>(OperationsContext);

  return (
    <>
      <Text strong style={{ width: 80, color: palette.fontColor }}>
        {t('rangeSliderLabel')}
      </Text>
      <Slider
        range
        defaultValue={[min, max]}
        style={styles}
        onChange={handleRangeChange}
        min={AMOUNT_MIN}
        max={maxSliderValue}
      />
    </>
  );
}

const styles: CSSProperties = {
  width: '100%',
};
