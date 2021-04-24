import { useEffect, useState } from "react";

import { database } from "../../api/api";

export default function Stock() {
  const [state, setState] = useState([]);
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");

  useEffect(() => {
    console.log("train get data");
    database
      .collection("Products")
      .get()
      .then((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc);
          // console.log(doc.id, " => ", doc.data());
        });
        setState(data);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  function handleQtdChange(event) {
    let product = event.target;
    let buy_price = product.parentElement.parentElement.children[1];
    let sell_price = product.parentElement.parentElement.children[2];

    function price_setter(buyPrice, sellPrice) {
      buy_price.innerHTML = buyPrice;
      sell_price.innerHTML = sellPrice;
    }

    state.forEach(function (element) {
      console.log(element.id);
      if (element.id === product.className) {
        console.log(element);
        if (product.value === "cx") {
          price_setter(
            element.data().package_buy_price,
            element.data().package_sell_price
          );
        } else {
          price_setter(
            element.data().unit_buy_price,
            element.data().unit_sell_price
          );
        }
      }
    });
  }

  function Row(props) {
    let data = props.data.data();
    return (
      <tr>
        <td>{data.product_name}</td>
        <td>{data.unit_buy_price}</td>
        <td>{data.unit_sell_price}</td>
        <td>
          <select
            name="product_qtd"
            id="product_qtd"
            className={`${props.data.id}`}
            onChange={handleQtdChange}
          >
            <option value="und">und</option>
            <option value="cx">cx</option>
          </select>
        </td>
      </tr>
    );
  }

  return (
    <div className="card container bg-dark">
      <div className="card-body">
        <h3 className="text-light">Tabela de Preços</h3>
      </div>
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>P/Comp</th>
            <th>P/Vend</th>
            <th>Qtd</th>
          </tr>
        </thead>
        <tbody>
          {/* {state.map((item, index) => Row(item))} */}
          {state.map((item) => (
            <Row key={item.id} data={item} />
          ))}
        </tbody>
      </table>

      <br />
    </div>
  );
}
