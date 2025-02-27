export type AuthResult = {
  token: string;
  profile: Profile;
};

export type SignUpBody = {
  email: string;
  password: string;
  commandId: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: unknown;
  commandId: string;
};

export type UpdateProfileBody = {
  name: string;
};

export type ChangePasswordBody = {
  password: string;
  newPassword: string;
};

export type ChangePasswordResult = {
  success: boolean;
};

export type ServerErrors = {
  errors: {
    extensions: {
      code: ErrorCode;
    };

    name: string;
    fieldName?: string;
    stack: string;
    message: string;
  }[];
};

export type GetPageArgsType = {
  pageNumber: number;
  sorting: Sorting;
  date?: DateRange;
};

export type FilterType = {
  pagination: string;
  sorting: string;
  date?: string;
};

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  date = 'date',
  name = 'name',
}

export type Sorting = {
  type: SortType;
  field: SortField;
};

export type Pagination = {
  pageSize: number;
  pageNumber: number;
  total: number;
};

export type DateRange = {
  gte?: string;
  lte?: string;
};

export type SliderRange = {
  min?: string;
  max?: string;
};

export type DateRangeType = {
  min: Date;
  max: Date;
};

export type Category = {
  id: string;
  name: string;
  photo?: string;
  commandId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Cost = {
  id?: string;
  name: string;
  desc?: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  amount: number;
  category: Category;
  commandId?: string;
  type: 'Cost';
};

export type Profit = {
  id?: string;
  name: string;
  desc?: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  amount: number;
  category: Category;
  commandId?: string;
  type: 'Profit';
};

export type Operation = Profit | Cost;

export enum ErrorCode {
  ERR_INCORRECT_EMAIL_OR_PASSWORD = 'ERR_INCORRECT_EMAIL_OR_PASSWORD', // Если не корректный email или пароль
  ERR_ACCOUNT_ALREADY_EXIST = 'ERR_ACCOUNT_ALREADY_EXIST', // При регистрации если пользователь уже существует
  ERR_FIELD_REQUIRED = 'ERR_FIELD_REQUIRED', // Обязательное поле. В ошибке будет дополнительное поле fieldName с указанием, какое конкретно поле обязательно
  ERR_INCORRECT_PASSWORD = 'ERR_INCORRECT_PASSWORD', // Некорректный старый пароль при попытке его изменить
  ERR_INVALID_PASSWORD = 'ERR_INVALID_PASSWORD', // Пароль не соответствует регулярному выражению /^[\w-@{}()#$%^&*+=!~]{8,}$/
  ERR_NOT_VALID = 'ERR_NOT_VALID', // Не валидный id сущности
  ERR_AUTH = 'ERR_AUTH', // Токен не передан, либо не прошел авторизацию
  ERR_NO_FILES = 'ERR_NO_FILES', // Ошибка при загрузке файлов
  ERR_NOT_ALLOWED = 'ERR_NOT_ALLOWED', // Нет доступа к данной операции (нельзя редактировать заказ другого пользователя)
  ERR_NOT_FOUND = 'ERR_NOT_FOUND', // Сущность не найдена
  ERR_VALIDATION_ERROR = 'ERR_VALIDATION_ERROR', // Не валидные данные, например, не указано name
  ERR_INVALID_QUERY_PARAMS = 'ERR_INVALID_QUERY_PARAMS', // Все GET запросы могут принимать данные запроса в search params в формате { [key: string]: string // Нужно использовать JSON.stringify() }

  ERR_INTERNAL_SERVER = 'ERR_INTERNAL_SERVER', // Серверная ошибка. Обратитесь ко мне, этой ошибки быть не должно
}
