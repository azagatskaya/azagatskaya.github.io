import React, { ReactNode, useMemo } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { SortField, SortType, Sorting } from 'src/shared/serverTypes';
import { defaultSorting } from 'src/components/operation/list/OperationList';

type SortingProps = {
  onChange: (value: Sorting) => void | null;
};

export default function AmountSorting({ onChange }: SortingProps): ReactNode {
  const { t } = useTranslation();
  const onClick: MenuProps['onClick'] = ({ key }) => {
    onChange(JSON.parse(key));
  };

  const items: MenuProps['items'] = useMemo(() => {
    return [
      {
        label: t('dateDesc'),
        key: JSON.stringify({ type: SortType.DESC, field: SortField.date }),
        icon: <ArrowDownOutlined />,
      },
      {
        label: t('dateAsc'),
        key: JSON.stringify({ type: SortType.ASC, field: SortField.date }),
        icon: <ArrowUpOutlined />,
      },
      {
        label: t('nameAsc'),
        key: JSON.stringify({ type: SortType.ASC, field: SortField.name }),
        icon: <ArrowUpOutlined />,
      },
      {
        label: t('nameDesc'),
        key: JSON.stringify({ type: SortType.DESC, field: SortField.name }),
        icon: <ArrowDownOutlined />,
      },
    ];
  }, [t]);

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [JSON.stringify(defaultSorting)],
        onClick,
      }}
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
