import React from 'react';
import Layout from '../components/layout';

export default function Page2() {
    return (
        <div>
        <Layout title="This is seccond page ">
          <p>
            Так как весь функционал реализован на первой странице (фильтрация, сортировка по любому столбцу, паджинация), то здесь демонстрируется, разве что,  умение работать с роутером :)
          </p>
        </Layout>
      </div>
        );
  }