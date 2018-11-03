import { switchMap, map, mergeMap, debounceTime, catchError, filter, concat, takeUntil, delay } from 'rxjs/operators'

export function fetchUserEpic(action$) {
  return action$.ofType('FETCH_USER').pipe(
    map(action => ({
      type: 'FETCH_USER_FULFILLED',
      payload: {
        name: 'Shane',
        user: action.payload
      }
    }))
  )
}