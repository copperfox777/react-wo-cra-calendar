export default class FetchService {
  _proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  _targetUrl = 'https://web-standards.ru/calendar.json'
  // _apiBase = 'https://web-standards.ru/calendar.json';
  // _url = '';

  getResource = async () => {
    try {
      const response = await fetch(`${this._proxyUrl}${this._targetUrl}`);
      if (!response.ok) {
        throw new Error(`Could not fetch ${this.targetUrl} , received ${response.status}`);
      }
      const data = await response.json();
      return this.transformData(data);
    } catch (err) {
      console.log('Fetch error :', err)
      return [];
    }
  };

  // getAnyAPIResource = async (url) => {
  //   fetch(url)
  //     .then(function (response) {
  //       if (!response.ok) {
  //         throw Error(response.statusText);
  //       }
  //       return response;
  //     })
  //     .then(function (response) {
  //       console.log("ok");
  //       let data = response.json();
  //       return this.transformData(data);;
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       return {};
  //     });
  // };
  _processDate(date){
    let nDate = `${date.split('T')[0]} ${date.split('T')[1].slice(0,-4)}`;
    return nDate;
  }

  transformData = (data) => {
    // console.log('data', data)
    const transformedData = data.map((item) => {
      return {
        uid: item.uid,
        start: this._processDate(item.start),
        end: this._processDate(item.end),
        summary: item.summary || '',
        location: item.location || '',
        description: item.description || '',
      };
    });
    // console.log('transformedData', transformedData)
    return transformedData;
  };
}
