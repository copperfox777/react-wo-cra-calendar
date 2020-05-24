import React, { useState, useMemo, useCallback } from "react";
import Layout from "../components/layout";
import Spinner from "../components/spinner/spinner";
import Table from "../components/table";
import Pagination from "../components/pagination";

export default function Page1({ isLoading, data }) {
  const [filter, setFilter] = useState("");
  const [sortColumnName, setSortColumnName] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // Тут все хэндлеры
  const filterHandler = (event) => setFilter(event.target.value);

  const pageChangeHandler = (payload) => {
    const n_page = page + payload;
    if (n_page <= pages && n_page >= 1) {
      setPage(n_page);
    }
  };


  // Чтобы не переназначать функцию во время рендера и не перерисовывать заголовок,
  // потому что там эта функция передаётся
  const tableSortHandler = useCallback((event) => {
    setSortColumnName(event.target.getAttribute("name"));
    setPage(1);
  },[]);
    // Всё таки при смене сортировки следует переходить
  // на 1 страницу паджинации, так как общий порядок совсем другой

  //Внутренняя логика и вычисления тут
  // Для повышения производительности мемоизируем наши "тяжелые" (нет) вычислительные функции
  // Разкоментив консоль легко убедиться, что при листании страниц видимые табличные данные
  // не пересчитываются
  let memoizedFilterData = useMemo(() => {
    // console.log('memoizedFilterData called');
    if (filter !== "") {
      let fltr = filter.toLocaleLowerCase();
      return data.filter(
        (item) => item.location && item.location.toLowerCase().startsWith(fltr)
      );
    } else {
      return data;
    }
  }, [filter, data]);

  // мемоизируем
  let memoizedSortedData = useMemo(() => {
    // console.log('memoizedSortedData called');
    if (sortColumnName !== "") { 
      return memoizedFilterData.slice().sort((a, b) => a[sortColumnName] > b[sortColumnName] ? 1 : b[sortColumnName] > a[sortColumnName] ? -1 : 0 );
    } else {
      return memoizedFilterData;
    }
  }, [sortColumnName, memoizedFilterData]);

  // А сюда собственно нет смысла добавлять мемоизацию 
  let dataToPage = memoizedSortedData.slice((page - 1) * 10, page * 10);
  
  // Общее количество страниц могло измениться 
  if (pages !== Math.trunc(memoizedSortedData.length / 10)) {
    setPages(Math.trunc(memoizedSortedData.length / 10));
  }

  
  if (isLoading) {
    return (
      <Layout title="The page is loading ">
        <Spinner />
      </Layout>
    );
  }

  return (
    <div>
      <Layout>
        <input
          name="filter"
          className="input"
          type="text"
          placeholder="Фильтр городов"
          value={filter}
          onChange={filterHandler}
        ></input>
        <Table data={dataToPage} tableSortHandler={tableSortHandler} />
        <Pagination
          page={page}
          pages={pages}
          pageChangeHandler={pageChangeHandler}
        />
      </Layout>
    </div>
  );
}
