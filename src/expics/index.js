import { of } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import { clear, LOAD_STORIES } from '../actions/index'
import { switchMap, delay } from 'rxjs/operators'

function loadStoriesEpic(action$) {
  console.log(action$)
  return action$.pipe(
    ofType(LOAD_STORIES),
    switchMap(() => of(clear()).pipe(delay(2000)))
  )

}

export const rootEpic = combineEpics(loadStoriesEpic)