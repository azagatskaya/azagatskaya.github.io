import React, { ReactNode, useMemo } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { AmountSortingEnum } from 'src/components/operation/list/OperationList';

interface AmountSortingProps {
  value: AmountSortingEnum;
  onChange: (value: AmountSortingEnum) => void;
}
export default function AmountSorting({ value, onChange }: AmountSortingProps): ReactNode {
  const { t } = useTranslation();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    onChange(key as AmountSortingEnum);
  };

  const items: MenuProps['items'] = useMemo(() => {
    return [
      {
        label: t('dateAsc'),
        key: AmountSortingEnum.dateAsc,
        icon: <ArrowUpOutlined />,
      },
      {
        label: t('dateDesc'),
        key: AmountSortingEnum.dateDesc,
        icon: <ArrowDownOutlined />,
      },
      {
        label: t('amountAsc'),
        key: AmountSortingEnum.amountAsc,
        icon: <ArrowUpOutlined />,
      },
      {
        label: t('amountDesc'),
        key: AmountSortingEnum.amountDesc,
        icon: <ArrowDownOutlined />,
      },
    ];
  }, [t]);

  return (
    <Dropdown
      menu={{ items, selectable: true, defaultSelectedKeys: [value], onClick }}
      trigger={['click']}
      overlayStyle={{ height: 48 }}
    >
      <Space style={{ height: 48 }}>
        {t('sorting')}
        <DownOutlined />
      </Space>
    </Dropdown>
  );
}
