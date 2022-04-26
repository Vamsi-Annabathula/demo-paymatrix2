import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import "./styles.css";

const url = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [viewData, setViewData] = useState([]);
  const [currSet, setCurrSet] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url + "?_page=1&_limit=10");
        const jsonRes = await res.json();
        setViewData([...jsonRes]);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const nextPage = async (setNum) => {
    try {
      const res = await fetch(url + `?_page=${setNum}&_limit=10`);
      const jsonRes = await res.json();
      console.log(jsonRes);
      setViewData(jsonRes);
      setCurrSet(setNum);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      {viewData.map((ele) => {
        return (
          <div>
            <h1>
              <span>{ele.id}. </span>
              {ele.title}
            </h1>
            <h5>{ele.body}</h5>
          </div>
        );
      })}
      <Pagination
        totalItemsCount={20}
        onChange={(page) => nextPage(page)}
        activePage={currSet}
        itemsCountPerPage={10}
        pageRangeDisplayed={10}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
}
