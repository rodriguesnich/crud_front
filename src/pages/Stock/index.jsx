import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Stock() {
  const [state, setState] = useState([]);
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");

  useEffect(() => {
    api
      .get("stock")
      .then((response) => {
        console.log(response.data);
        let apiData = response.data;
        setState(apiData);
        console.log(data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  function handleQtdChange(event) {
    console.log('mudei');
    let product = event.target;
    let buy_price = product.parentElement.parentElement.children[2];
    let sell_price = product.parentElement.parentElement.children[3];

    function price_setter(buyPrice, sellPrice) {
      buy_price.innerHTML = buyPrice;
      sell_price.innerHTML = sellPrice;
    }

    state.forEach(function (element) {
      if (element.id === Number(product.className)) {
        console.log(element);
        if (product.value === "cx") {
          price_setter(element.package_buy_price, element.package_sell_price);
        } else {
          price_setter(
            element.product.product_buy_price,
            element.product.product_sell_price
          );
        }
      }
    });
  }

  function Row(info) {
    return (
      <tr>
        <td>{info.id}</td>
        <td>{info.product.product_name}</td>
        <td>{info.product.product_buy_price}</td>
        <td>{info.product.product_sell_price}</td>
        <td>
          <select
            name="product_qtd"
            id="product_qtd"
            className={`${info.id}`}
            onChange={handleQtdChange}
          >
            <option value="und">und</option>
            <option value="cx">cx</option>
          </select>
          {/* <input type="checkbox" className={`${info.product.id}`} onChange={handleQtdChange}/> */}
        </td>
        <td>{info.stock_amount}</td>
      </tr>
    );
  }

  return (
    <div className="card container bg-dark">
      <div className="card-body">
        <h3 className="text-light">Preços</h3>
      </div>
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>P/Comp</th>
            <th>P/Vend</th>
            <th>Qtd</th>
            <th>Estoque</th>
          </tr>
        </thead>
        <tbody>{state.map((item, index) => Row(item))}</tbody>
      </table>

      <br />
    </div>
  );
}
