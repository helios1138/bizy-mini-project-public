import * as _ from 'lodash'
import { createAction } from 'redux-actions'

export function createActions(actionMap, prevKeys = []) {
  return Object.keys(actionMap).reduce((result, key) => {
    const
      action = actionMap[key],
      actionName = [...prevKeys, key]
        .map(_.snakeCase)
        .join('/')
        .toUpperCase()

    if (_.isPlainObject(action)) {
      result[key] = createActions(action, [...prevKeys, key])
    }
    else if (Array.isArray(action)) {
      result[key] = createAction(actionName, ...action)
    }
    else {
      result[key] = createAction(actionName, action)
    }

    result[key].toString = () => actionName

    return result
  }, {})
}
