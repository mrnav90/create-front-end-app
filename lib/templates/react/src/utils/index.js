import toastr from 'toastr';
import { isNil } from 'lodash';

export {
  setUserInfo,
  getUserInfo,
  setAccessToken,
  getAccessToken,
  isAuthenticated,
  revokeUser,
  setLanguage,
  getLanguage,
  setCSRFToken,
  getCSRFToken,
} from './cookie';

export function windowRedirect(url) {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
}

export function getWindowOrigin() {
  if (typeof window !== 'undefined') {
    const port = window.location.port ? `:${window.location.port}` : '';
    return `${window.location.protocol}//${window.location.hostname}${port}`;
  }
  return null;
}

export function notification(message, type) {
  toastr.options.preventDuplicates = true;
  toastr.options.positionClass = 'toast-top-center';
  switch (type) {
    case 'success':
      toastr.success(message);
      break;
    case 'error':
      toastr.error(message);
      break;
    case 'warning':
      toastr.warning(message);
      break;
    case 'remove':
      toastr.remove();
      break;
    case 'clear':
      toastr.clear();
      break;
    default:
      break;
  }
}

export const makeKeyFilter = (params = {}) => {
  return Object.keys(params)
    .filter(k => !isNil(params[k]))
    .sort()
    .reduce((acc, k) => `${acc}::${k}=${params[k]}`, '')
    .slice(2);
};

export const mapByProp = prop => arr =>
  arr.reduce(
    (acc, item) => ({
      ...acc,
      [item[prop]]: item,
    }),
    {},
  );

export const mapById = mapByProp('id');

export const transformError422 = errors => {
  if (Array.isArray(errors)) {
    return errors.reduce((acc, item) => {
      const [key] = Object.keys(item);
      const [val] = Object.values(item);

      return {
        ...acc,
        [key]: val,
      };
    }, {});
  }

  return {};
};

export const maybeInvalidateForm = (err, invalidateForm) => {
  if (err.status_code === 422) {
    invalidateForm(transformError422(err.errors));

    return true;
  }

  return false;
};

export const noop = () => null;
