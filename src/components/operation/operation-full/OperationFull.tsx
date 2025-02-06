import React, { ReactNode, Reducer, useContext, useEffect, useReducer, useRef, useState } from 'react';
import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  Typography,
} from 'antd';
import ru from 'antd/es/date-picker/locale/ru_RU';
import en from 'antd/es/date-picker/locale/en_US';
import type { FormProps } from 'antd';
import { ThemeContext, ThemeContextType } from 'src/contexts/ThemeContext';
import { CheckCircleOutlined, DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'src/store';
import { addCategory, deleteCategory, getCategories } from 'src/store/slices/categories';
import { addOperation, deleteOperation, updateOperation, updateOperations } from 'src/store/slices/operations';
import { useNavigate } from 'react-router';
const { TextArea } = Input;

export type OperationFieldsType = {
  name: string;
  amount: number;
  type: 'Profit' | 'Cost';
  date: Date | Dayjs;
  categoryId: string;
  desc?: string;
};

const styles = {
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: 122,
    marginLeft: 10,
  },
  date: {
    width: '100%',
  },
  content: {
    paddingLeft: 12,
  },
};

type ModeType = 'edit' | 'preview';

enum OpStateActionEnum {
  InputChange = 'inputChange',
  SetState = 'setState',
}

type ActionPayloadType = {
  name: string;
  value: string | number | Date | 'Profit' | 'Cost';
};

type FieldChange = {
  type: OpStateActionEnum.InputChange;
  payload: ActionPayloadType;
};

type StateChange = {
  type: OpStateActionEnum.SetState;
  payload: OperationFieldsType;
};

type OpStateAction = FieldChange | StateChange;

const opStateReducer = (state: OperationFieldsType, action: OpStateAction): OperationFieldsType => {
  switch (action.type) {
    case OpStateActionEnum.InputChange: {
      return action?.payload?.name && (action?.payload?.value || action.payload.value === '')
        ? {
            ...state,
            [action.payload.name]: action.payload.value,
          }
        : state;
    }
    case OpStateActionEnum.SetState: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

const msgRequiredField = 'Обязательное поле';

export type OperationFullProps = {
  id: string;
};

const defaultOperation: OperationFieldsType = {
  name: '',
  amount: 0,
  type: 'Cost',
  date: dayjs(new Date()),
  categoryId: '',
  desc: '',
};

const dateFormat = 'DD-MM-YYYY';

export default function OperationFull({ id }: OperationFullProps): ReactNode {
  const { palette, messageApi } = useContext<ThemeContextType>(ThemeContext);
  const [mode, setMode] = useState<ModeType>(id === 'create' ? 'edit' : 'preview');
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: AppState) => state.categories);
  const currentOperation = useSelector((state: AppState) => state.operations.currentOperation);
  const [opState, dispatchOpState] = useReducer<Reducer<OperationFieldsType, OpStateAction>>(
    opStateReducer,
    id === 'create'
      ? defaultOperation
      : {
          name: currentOperation.name ?? '',
          amount: currentOperation.amount ?? 0,
          type: currentOperation.type ?? 'Cost',
          date: currentOperation.date ?? new Date(),
          categoryId: currentOperation.category.id ?? '',
          desc: currentOperation.desc ?? '',
        }
  );
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState({ addCategory: false, category: false });
  const inputRef = useRef(null);

  useEffect(() => {
    if (id === 'create') {
      dispatchOpState({ type: OpStateActionEnum.SetState, payload: defaultOperation as OperationFieldsType });
    }
    (async () => {
      await dispatch(getCategories());
    })();
  }, [id, dispatch, messageApi, t]);

  const onNewCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  const addNewCategory = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await dispatch(addCategory({ name: newCategoryName })).unwrap();
      messageApi.success(t('operations.msgAddCategorySuccess'));
      await dispatch(getCategories());
    } catch (err) {
      setError((prevState) => ({ ...prevState, addCategory: true }));
      messageApi.error(t(`error.${err}`));
    }
    setNewCategoryName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleDelCategory = async (id: string) => {
    try {
      await dispatch(deleteCategory({ id })).unwrap();
      messageApi.success(t('operations.msgDelCategorySuccess'));
      if (opState.categoryId === id) {
        form.setFieldsValue({
          categoryId: '',
        });
        dispatchOpState({
          type: OpStateActionEnum.InputChange,
          payload: { name: 'categoryId', value: '' },
        });
      }
      await dispatch(getCategories());
    } catch (err) {
      messageApi.error(t(`operations.msgDelCategoryFail`));
    }
  };

  const handleDeleteOperation = async () => {
    try {
      await dispatch(deleteOperation({ id })).unwrap();
      messageApi.success(t('operations.msgDelOperationSuccess'));
      form.resetFields();
      dispatchOpState({ type: OpStateActionEnum.SetState, payload: defaultOperation as OperationFieldsType });
      dispatch(updateOperations());
      navigate('/operations');
    } catch (err) {
      messageApi.error(err);
    }
  };

  const handleToggleMode = (): void => {
    setMode((prevState: ModeType) => (prevState === 'edit' ? 'preview' : 'edit'));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    dispatchOpState({
      type: OpStateActionEnum.InputChange,
      payload: { name, value },
    });
  };

  const handleDateChange = (dayjsDate: Dayjs) => {
    if (dayjsDate)
      dispatchOpState({
        type: OpStateActionEnum.InputChange,
        payload: { name: 'date', value: dayjsDate.toISOString() },
      });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onFinish(values);

      if (id === 'create' && !currentOperation) {
        try {
          await dispatch(addOperation({ ...values, date: values.date.toISOString() })).unwrap();
          messageApi.success(t('operations.msgAddOperationSuccess'));
        } catch (err) {
          setError((prevState) => ({ ...prevState, addOperation: true }));
          messageApi.error(t(`error.${err}`));
        }
      } else {
        try {
          await dispatch(
            updateOperation({
              id: id === 'create' ? currentOperation.id : id,
              body: { ...values, date: new Date(values.date).toISOString() },
            })
          ).unwrap();
          messageApi.success(t('operations.msgUpdateOperationSuccess'));
        } catch (err) {
          setError((prevState) => ({ ...prevState, updateOperation: true }));
          messageApi.error(t(`error.${err}`));
        }
      }
      dispatch(updateOperations());
      handleToggleMode();
    } catch (e) {
      onFinishFailed(e);
    }
  };

  const onFinish: FormProps<OperationFieldsType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<OperationFieldsType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const confirm = async (id: string) => {
    await handleDelCategory(id);
  };

  const getCategoryName = (id: string): string => {
    const cat = categories.find((c) => c.id === id);
    return cat && cat.name;
  };

  return (
    <Card
      bordered={false}
      style={{
        width: 600,
        height: 320,
        textAlign: 'left',
        boxShadow: 'none',
        backgroundColor: palette.background,
      }}
      styles={{ body: { padding: '16px 0 0' } }}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<OperationFieldsType>
          required
          name="date"
          initialValue={dayjs(opState.date)}
          label={
            <label
              style={{
                color: palette.fontColor,
              }}
            >
              {t('operations.createdAt')}
            </label>
          }
          rules={[
            {
              type: 'date',
              message: t('operations.msgIncorrectDate'),
            },
            { required: true, message: msgRequiredField },
          ]}
        >
          {mode === 'edit' ? (
            <DatePicker
              value={dayjs(opState.date)}
              format={dateFormat}
              name={'date'}
              onChange={handleDateChange}
              locale={t('locale') === 'ru' ? ru : en}
              style={{
                ...styles.date,
                color: palette.fontColor,
                backgroundColor: palette.background,
              }}
            />
          ) : (
            <Typography style={{ color: palette.fontColor, ...styles.content }}>
              {dayjs(opState.date).format('DD-MM-YYYY')}
            </Typography>
          )}
        </Form.Item>
        <ConfigProvider
          theme={{
            components: {
              Select: {
                selectorBg: palette.background,
                optionSelectedBg: palette.fontColorDisabled,
              },
            },
            token: {
              colorText: palette.fontColor,
              colorTextPlaceholder: palette.fontColorDisabled,
              colorTextDisabled: palette.fontColorDisabled,
            },
          }}
        >
          <Form.Item<OperationFieldsType>
            required
            initialValue={opState.name}
            name="name"
            label={<label>{t('operations.operationName')}</label>}
            rules={[
              { required: true, message: msgRequiredField },
              { max: 32, message: t('operations.msgNameMaxLength') },
            ]}
          >
            {mode === 'edit' ? (
              <Input
                value={opState.name}
                name={'name'}
                onChange={handleInputChange}
                maxLength={32}
                style={{
                  color: palette.fontColor,
                  backgroundColor: palette.background,
                }}
              />
            ) : (
              <Typography style={{ color: palette.fontColor, ...styles.content }}>{opState.name}</Typography>
            )}
          </Form.Item>
          <Form.Item<OperationFieldsType>
            required
            initialValue={opState.type}
            name="type"
            label={<label>{t('operations.type')}</label>}
            rules={[{ required: true, message: msgRequiredField }]}
          >
            {mode === 'edit' ? (
              <Select
                showSearch
                onChange={(value) => {
                  dispatchOpState({
                    type: OpStateActionEnum.InputChange,
                    payload: { name: 'type', value },
                  });
                }}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={['Profit', 'Cost'].map((type) => ({
                  label: t(`operations.${type.toLowerCase()}`),
                  value: type,
                }))}
                dropdownStyle={{
                  backgroundColor: palette.background,
                }}
              />
            ) : (
              <Typography style={{ color: palette.fontColor, ...styles.content }}>
                {t(`operations.${opState.type.toLowerCase()}`)}
              </Typography>
            )}
          </Form.Item>
          <Form.Item<OperationFieldsType>
            required
            initialValue={opState.amount}
            name="amount"
            label={<label>{t('operations.amount')}</label>}
            rules={[{ required: true, message: msgRequiredField }]}
          >
            {mode === 'edit' ? (
              <Input
                value={opState.amount}
                name={'amount'}
                onChange={handleInputChange}
                type="number"
                style={{
                  color: palette.fontColor,
                  backgroundColor: palette.background,
                }}
              />
            ) : (
              <Typography style={{ color: palette.fontColor, ...styles.content }}>{opState.amount}</Typography>
            )}
          </Form.Item>
          <Form.Item<OperationFieldsType>
            required
            initialValue={opState.categoryId}
            name="categoryId"
            label={<label>{t('operations.categoryName')}</label>}
            rules={[
              { required: true, message: msgRequiredField },
              { max: 32, message: t('operations.msgCatNameMaxLength') },
            ]}
          >
            {mode === 'edit' ? (
              <Select
                showSearch
                value={opState.categoryId}
                onChange={(value) => {
                  dispatchOpState({
                    type: OpStateActionEnum.InputChange,
                    payload: { name: 'categoryId', value },
                  });
                }}
                placeholder={t('operations.categoryPlaceholder')}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={categories.map((c) => ({ label: c.name, value: c.id }))}
                optionRender={(option) => (
                  <Space
                    key={option.value}
                    style={{ color: palette.fontColor, width: '100%', justifyContent: 'space-between' }}
                  >
                    <Typography>{option.label}</Typography>
                    <Popconfirm
                      title={t('operations.delCategoryButton')}
                      description={t('operations.msgDelCategoryConfirm')}
                      onConfirm={() => confirm(option.value as string)}
                      onCancel={null}
                      cancelButtonProps={{ color: 'primary', variant: 'text' }}
                      okText={t('ok')}
                      cancelText={t('cancel')}
                      color={palette.background}
                      icon={<DeleteFilled />}
                    >
                      <Button size="small" shape="circle" color="danger" variant="link" style={{ alignSelf: 'right' }}>
                        <DeleteFilled />
                      </Button>
                    </Popconfirm>
                  </Space>
                )}
                onFocus={() => {
                  if (error.category) setError((prevState) => ({ ...prevState, category: false }));
                }}
                dropdownStyle={{
                  backgroundColor: palette.background,
                }}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space style={{ padding: '0 8px 4px' }}>
                      <Input
                        placeholder={t('operations.newCategoryPlaceholder')}
                        ref={inputRef}
                        value={newCategoryName}
                        onChange={onNewCategoryNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                        style={{
                          color: palette.fontColor,
                          backgroundColor: palette.background,
                        }}
                        onFocus={() => {
                          if (error.addCategory) setError((prevState) => ({ ...prevState, addCategory: false }));
                        }}
                      />
                      <Button disabled={!newCategoryName} type="text" icon={<PlusOutlined />} onClick={addNewCategory}>
                        {t('operations.addCategory')}
                      </Button>
                    </Space>
                  </>
                )}
              />
            ) : (
              <Typography style={{ color: palette.fontColor, ...styles.content }}>
                {opState.categoryId ? getCategoryName(opState.categoryId) : ''}
              </Typography>
            )}
          </Form.Item>
          <Form.Item<OperationFieldsType>
            name="desc"
            initialValue={opState.desc}
            label={<label>{t('operations.description')}</label>}
            rules={[{ max: 256, message: t('operations.msgDescMaxLength') }]}
          >
            {mode === 'edit' ? (
              <TextArea
                value={opState.desc}
                name={'desc'}
                onChange={handleInputChange}
                autoSize
                maxLength={256}
                style={{
                  color: palette.fontColor,
                  backgroundColor: palette.background,
                }}
              />
            ) : (
              <Typography style={{ color: palette.fontColor, ...styles.content, marginTop: 5, marginBottom: 5 }}>
                {opState.desc}
              </Typography>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Popconfirm
              title={t('operations.delOperationButton')}
              description={t('operations.msgDelOperationConfirm')}
              onConfirm={handleDeleteOperation}
              onCancel={null}
              cancelButtonProps={{ color: 'primary', variant: 'text' }}
              okText={t('ok')}
              cancelText={t('cancel')}
              color={palette.background}
              icon={<DeleteFilled />}
            >
              <Button
                disabled={id === 'create' && !currentOperation}
                variant="solid"
                color="danger"
                style={{
                  marginLeft: 10,
                }}
                icon={<DeleteFilled />}
              >
                {t('delete')}
              </Button>
            </Popconfirm>
            <Button
              variant="solid"
              htmlType="submit"
              onClick={mode === 'preview' ? handleToggleMode : handleSubmit}
              color={'primary'}
              style={{
                color: '#fff',
                backgroundColor: mode !== 'edit' ? null : palette.success,
                marginLeft: 12,
              }}
              icon={mode === 'edit' ? <CheckCircleOutlined /> : <EditOutlined />}
            >
              {t(mode === 'edit' ? 'save' : 'edit')}
            </Button>
          </Form.Item>
        </ConfigProvider>
      </Form>
    </Card>
  );
}
