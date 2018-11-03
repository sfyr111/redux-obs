import { forkJoin, of, throwError } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { switchMap, map, mergeMap, debounceTime, catchError, filter, concat, takeUntil, delay } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import { CANCEL_SEARCH, receiveBeers, searchBeersError, searchBeersLoading, SEARCHED_BEERS } from '../actions/index'

const beers = `https://api.punkapi.com/v2/beers`;
const search = term => `${beers}?beer_name=${encodeURIComponent(term)}`;
const ajax$ = term =>
  term === 'skull'
    ? throwError(new Error('failed!'))
    : ajax.getJSON(search(term))

function searchBeersEpic(action$) {
  return action$.pipe(
    ofType(SEARCHED_BEERS),
    debounceTime(500),
    filter(action => action.payload !== ''), // 排除空 string 参数
    switchMap(({ payload }) => {
      const loading = of(searchBeersLoading(true))
      const request = ajax$(payload).pipe(
        takeUntil(action$.ofType(CANCEL_SEARCH)),
        map(receiveBeers),
        catchError(err => of(searchBeersError(err)))
      )
      return loading.pipe(concat(request))
    })
  )
}

export const rootEpic = combineEpics(searchBeersEpic)


