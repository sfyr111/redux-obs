import { forkJoin, of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { switchMap, map, mergeMap, debounceTime, catchError } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import { receiveBeers, searchBeersError, SEARCHED_BEERS } from '../actions/index'

const beers = `https://api.punkapi.com/v2/beers`;
const search = term => `${beers}?beer_name=${encodeURIComponent(term)}`;
const ajax$ = term => ajax.getJSON(search(term));

function searchBeersEpic(action$) {
  return action$.pipe(
    ofType(SEARCHED_BEERS),
    debounceTime(500),
    switchMap(({ payload }) => ajax$(payload).pipe(
      (res) => console.log(res) || res,
      map(receiveBeers),
      catchError(err => of(searchBeersError(err)))
    ))
  )
}

export const rootEpic = combineEpics(searchBeersEpic)


