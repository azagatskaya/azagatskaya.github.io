import React, { CSSProperties } from 'react';
import { Slider, Typography } from 'antd';
import { AMOUNT_MAX, AMOUNT_MIN, RangeType } from 'src/components/operation/list/OperationList';
import { useTranslation } from 'react-i18next';
const { Text } = Typography;

interface RangeSliderProps {
  range: RangeType;
  onChange: (range: number[]) => void;
}
export default function RangeSlider({ range: { min, max }, onChange }: RangeSliderProps) {
  const { t } = useTranslation();

  return (
    <>
      <Text strong style={{ width: 80 }}>
        {t('rangeSliderLabel')}
      </Text>
      <Slider range defaultValue={[min, max]} style={styles} onChange={onChange} min={AMOUNT_MIN} max={AMOUNT_MAX} />
    </>
  );
}

const styles: CSSProperties = {
  width: '100%',
};
