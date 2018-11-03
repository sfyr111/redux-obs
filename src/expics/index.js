import { forkJoin } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { switchMap, map, mergeMap } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import { FETCH_STORIES, fetchStoriesFulfilledAction } from "../actions/index";

const topStories = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
const url = id => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

function loadStoriesEpic(action$) {
  return action$.pipe(
    ofType(FETCH_STORIES),
    switchMap(({ payload }) => ajax.getJSON(topStories)),
    map(ids => ids.slice(0, 5)),
    map(ids => ids.map(url)),
    map(urls => urls.map(url => ajax.getJSON(url))), // 转换 url -> ajax
    mergeMap(reqs => forkJoin(reqs)), // 执行 ajax 请求
    map(stories => fetchStoriesFulfilledAction(stories))
  )
}

export const rootEpic = combineEpics(loadStoriesEpic)


