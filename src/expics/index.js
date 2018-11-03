import { ajax } from 'rxjs/ajax'
import { combineEpics, ofType } from 'redux-observable'
import { FETCH_USER, fetchUserFulfilledAction } from "../actions/index";
import { switchMap, map } from 'rxjs/operators'

function loadStoriesEpic(action$) {
  return action$.pipe(
    ofType(FETCH_USER),
    switchMap(({ payload }) => ajax.getJSON(`https://api.github.com/users/${payload}`).pipe(
      map(user => fetchUserFulfilledAction(user))
    ))
  )
}

export const rootEpic = combineEpics(loadStoriesEpic)
