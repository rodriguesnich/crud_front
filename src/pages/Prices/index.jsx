import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { database, authMethod } from "../../api/api";

export default function Prices({ user }) {
  const [userUid, setUserUid] = useState("");
  const [state, setState] = useState([]);
  // const [buyPrice, setBuyPrice] = useState("");
  // const [sellPrice, setSellPrice] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useEffect(() => {
  //   authMethod.onAuthStateChanged((user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       var uid = user.uid;
  //       console.log(uid);
  //       setUserUid(uid)
  //       console.log(userUid);
  //       // ...
  //     } else {
  //       // User is signed out
  //       // ...
  //     }
  //   });
  // }, []);

  function getProducts(params) {
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
  }

  useEffect(() => {
    // console.log("train get data");
    getProducts()
  }, []);

  function handleProductSubmit(params) {
    console.log("product Submit");
    let productForm = document.querySelector("#addProduct");
    let productData = new FormData(productForm);
    let productObj = Object.fromEntries(productData);

    database
      .collection("Products")
      .doc()
      .set(productObj)
      .then(() => {
        console.log("Document successfully written!");
        getProducts()
      });

    console.log(productObj);
    handleClose();
  }

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
        <td onClick={handleShow}>{data.product_name}</td>
        <td>{data.unit_buy_price}</td>
        <td>{data.unit_sell_price}</td>
        <td>
          <select
            name="product_qtd"
            id="product_qtd"
            className={`${props.data.id} form-select`}
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
    <>
      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="addProduct">
            <h5>Sobre</h5>
            <div className="row">
              <label className="col-12">
                Nome:
                <input
                  type="text"
                  name="product_name"
                  className="form-control"
                />
              </label>
            </div>
            <h5>Unidade</h5>
            <div className="row">
              <label className="col-12">
                Preço Compra:
                <input
                  type="number"
                  name="unit_buy_price"
                  className="form-control"
                />
              </label>
              <label className="col-12">
                Preço Venda:
                <input
                  type="number"
                  name="unit_sell_price"
                  className="form-control"
                />
              </label>
            </div>
            <h5>Pacote</h5>
            <div className="row">
              <label className="col-12">
                Preço Compra:
                <input
                  type="number"
                  name="package_buy_price"
                  className="form-control"
                />
              </label>
              <label className="col-12">
                Preço Venda:
                <input
                  type="number"
                  name="package_sell_price"
                  className="form-control"
                />
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleProductSubmit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="card container bg-dark">
        <div className="card-body">
          <div className="row">
            <h3 className="text-light col-8">Preços</h3>
            <Button variant="primary" className="col-4" onClick={handleShow}>
              + Produto
            </Button>
          </div>
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
            {state.map((item) => (
              <Row key={item.id} data={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
