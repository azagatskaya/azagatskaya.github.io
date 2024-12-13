import React, { ReactNode, useContext, useMemo } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { AmountSortingEnum, OperationsContext, OperationsContextType } from 'src/contexts/OperationsContext';

export default function AmountSorting(): ReactNode {
  const { t } = useTranslation();
  const { sorting, handleSortingChange } = useContext<OperationsContextType>(OperationsContext);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    handleSortingChange(key as AmountSortingEnum);
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
      menu={{ items, selectable: true, defaultSelectedKeys: [sorting], onClick }}
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
