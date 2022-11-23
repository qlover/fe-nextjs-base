import request from '.';

export function getIndexPictures(data: any) {
  return request({
    url: '/api/games',
    method: 'GET',
    params: data,
  });
}
