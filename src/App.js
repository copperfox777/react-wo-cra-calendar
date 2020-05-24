// Создание строки таблицы вынесено
// Фильтрация сделана нечувствительной к регистру

import React, { Suspense, lazy, useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './vendor/bulma.sass'
import FetchService from "./services/fetchService";
// import dummyData from "./services/dummyData";

import Page1 from "./pages/page1";
const Page2 = lazy(() => import('./pages/page2'));
// Ленивая загрузка, загрузится только когда потребуется. 
// Увеличивает скорость загрузки и уменьшает размер первоначального бандла
// будет пауза 200мс при переходе на страницу 2

//Выделил получение данных в отдельный класс
const fetchService = new FetchService();

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Здесь идея такая, один раз данные загрузили и дальше работаем. 
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
        fetchService.getResource().then((result)=>{
          setData(result);
          setIsLoading(false);
        })
    };
    fetchData();
  }, []);
  
  // В целях разработки болванка.
    // useEffect(() => {
    //   setData(dummyData);
    //   setIsLoading(false);
    // }, []);

  return (
      <Router>
          <Suspense fallback={null}>
          <Switch>
            <Route exact path='/' render={() => ( <Page1 data={data} isLoading={isLoading} /> )}/>
            <Route exact path='/page-one' render={() => ( <Page1 data={data} isLoading={isLoading} /> )}/>
            {/* <Route path="/page-one/:page"
                    render={({ match }) => {
                      const { page } = match.params;
                      return <Page1 page={page} data={data} isLoading={isLoading} />
                    }}/> */}
            {/* Изначально была идея реализовать пагинацию путями, 
            но хотелось чтобы при этом фильтрация и сортировка не сбивалась.
              А тащить эти переменные вверх и прокидывать их стало лень. */}
            <Route exact path='/page-two' render={() => ( <Page2/> )}/>
            <Redirect to='/'/>
          </Switch>
        </Suspense>
    </Router>
  );
}
