import "./Admin.css";
import "./Graphs.css";
import "./Users.css";
import "./AddProduct.css";
import "./form.css";
import React, { useEffect, useState } from "react";
import Icon from "../components/Icon";
import { Link, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../actions/userActions";
import Loader from "../components/Loader";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../actions/productActions";
import { getAllOrders } from "../actions/orderActions";

export default function Admin() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user._id !== "613cbdce6af721480741f386") {
      window.location.href = "/";
    }
  }, []);
  return (
    <div className="admin-container">
      <Switch>
        <Route path="/admin/" component={Graphs} exact />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/products" component={Products} />
        <Route path="/admin/orders" component={Orders} />
        <Route path="/admin/addproduct" component={AddProduct} />
        <Route path="/admin/editproduct/:id" component={EditProduct} />
      </Switch>
      <aside>
        <nav>
          <Link to="/admin/">
            <Icon name="graph" />
          </Link>
          <Link to="/admin/users">
            <Icon name="profile" d="32" />
          </Link>
          <Link to="/admin/addproduct">
            <Icon name="plus" />
          </Link>
          <Link to="/admin/products">
            <Icon name="box" />
          </Link>
          <Link to="/admin/orders">
            <Icon name="cart" />
          </Link>
        </nav>
      </aside>
    </div>
  );
}

function Graphs() {
  return (
    <main style={{ padding: "10px" }}>
      <h2 style={{ marginLeft: "7px" }}>pannello admin</h2>
      <section className="chart-card">
        <article className="chart-grid chart-grid-1">
          <iframe
            title="pie-chart-1"
            height="240"
            src="https://charts.mongodb.com/charts-full-stack-project-krrwb/embed/charts?id=867b5d1e-c0fe-4175-b5c6-e5f7841f3fe4&theme=light"
          />
          <iframe
            title="bar-chart-1"
            height="360"
            src="https://charts.mongodb.com/charts-full-stack-project-krrwb/embed/charts?id=d46166ae-c0a0-4268-b0a5-521cd61df0e1&theme=light"
          />
        </article>
        <article className="chart-grid chart-grid-2">
          <iframe
            title="graph-chart-1"
            height="300"
            src="https://charts.mongodb.com/charts-full-stack-project-krrwb/embed/charts?id=0e32d320-0ec7-427d-977c-cbdb5676ac30&theme=light"
          />
          <iframe
            title="graph-chart-1"
            height="500"
            src="https://charts.mongodb.com/charts-full-stack-project-krrwb/embed/charts?id=0c07d617-b16c-400f-87d3-14384b2ffed9&theme=light"
          />
          <iframe
            title="graph-chart-1"
            height="500"
            src="https://charts.mongodb.com/charts-full-stack-project-krrwb/embed/charts?id=0c07d617-b16c-400f-87d3-14384b2ffed9&theme=light"
          ></iframe>
        </article>
      </section>
    </main>
  );
}

function Users() {
  const dispatch = useDispatch();
  const getAllUsersState = useSelector((state) => state.getAllUsersReducer);
  const { loading, users, err } = getAllUsersState;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  function _deleteUser(id) {
    dispatch(deleteUser(id));
  }

  return (
    <main>
      {loading && <Loader />}
      <h2 className="admin-title">lista utenti</h2>
      <section className="admin-table-container">
        {err && (
          <b className="admin-error">
            Impossibile caricare gli utenti, controllare il database o il
            backend
          </b>
        )}
        <table className="admin-table">
          <thead>
            <tr>
              <th>id</th>
              <th>nome utente</th>
              <th>email</th>
              <th>azioni</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((it, index) => {
                return (
                  <tr key={index}>
                    <td>{it._id}</td>
                    <td>{it.name}</td>
                    <td>{it.email}</td>
                    <td>
                      <button
                        className="admin-action"
                        onClick={() => _deleteUser(it._id)}
                      >
                        <Icon name="delete" />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function Products() {
  const dispatch = useDispatch();
  const getAllProductsState = useSelector(
    (state) => state.getAllProductsReducer
  );
  const { loading, products, err } = getAllProductsState;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  function _deleteProduct(id) {
    dispatch(deleteProduct(id));
  }

  return (
    <main>
      {loading && <Loader />}
      <h2 className="admin-title">lista prodotti</h2>
      <section className="admin-table-container">
        {err && (
          <b className="admin-error">
            Impossibile caricare gli utenti, controllare il database o il
            backend
          </b>
        )}
        <table className="admin-table">
          <thead>
            <tr>
              <th>nome</th>
              <th>prezzo</th>
              <th>stock</th>
              <th>id</th>
              <th>azioni</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((it, index) => {
                return (
                  <tr key={index}>
                    <td>{it.name}</td>
                    <td>{it.price}</td>
                    <td>{it.countInStock}</td>
                    <td>{it._id}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <button
                        className="admin-action"
                        onClick={() => _deleteProduct(it._id)}
                      >
                        <Icon name="delete" />
                      </button>
                      <a
                        className="admin-action"
                        href={"./editproduct/" + it._id}
                      >
                        <Icon name="edit" />
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function AddProduct() {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);
  const [category, setCategory] = useState("electronics");
  const [seller, setSeller] = useState("");

  const addProductState = useSelector((state) => state.addProductReducer);
  const { loading, success, err } = addProductState;

  function _addProduct(e) {
    e.preventDefault();
    const product = {
      price: price,
      countInStock: stock,
      name: name,
      seller: seller,
      category: category,
      image: imageUrl,
      description: description,
    };
    dispatch(addProduct(product));
  }

  return (
    <main>
      {loading && <Loader />}
      <form className="product-description" onSubmit={_addProduct}>
        <section className="col-1">
          <figure className="card image-container">
            <h1>url immagine</h1>
            <img
              src={imageUrl}
              alt={`${name}`.toLowerCase()}
              style={{ margin: "8px 0" }}
              required
            />
            <input
              className="admin-add-input"
              type="url"
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </figure>
        </section>
        <section className="col-2">
          <article className="card">
            <h1>nome prodotto</h1>
            <input
              className="admin-add-input"
              type="text"
              onChange={(e) => setName(e.target.value.toLowerCase())}
              minLength="4"
              maxLength="50"
              required
            />
            <h1>nome venditore</h1>
            <input
              className="admin-add-input"
              type="text"
              onChange={(e) => setSeller(e.target.value.toLowerCase())}
              minLength="2"
              maxLength="30"
              required
            />
          </article>
          <article className="card">
            <h1>prezzo €</h1>
            <input
              className="admin-add-input"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              defaultValue="1"
              required
            />
            <h1>stock</h1>
            <input
              className="admin-add-input"
              type="number"
              onChange={(e) => setStock(e.target.value)}
              step="1"
              defaultValue="10"
              required
            />
          </article>
          <article className="card description">
            <h3>descrizione</h3>
            <textarea
              className="admin-add-input"
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              minLength="16"
              maxLength="600"
              required
            />
            <h3>categoria</h3>
            <select
              className="admin-add-input"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue="1"
              required
            >
              <option value="electronics">elettronica</option>
              <option value="art">arte</option>
              <option value="it">IT</option>
              <option value="home">casa</option>
              <option value="clothing">abbigliamento</option>
              <option value="other">altro</option>
            </select>
          </article>
          <article className="card" id="orderInfo" style={{ padding: "0" }}>
            {success && (
              <b
                className="admin-success"
                style={{
                  height: "100%",
                  textAlign: "left",
                  borderRadius: "14px",
                  padding: "12px",
                }}
              >
                prodotto aggiunto
              </b>
            )}
            {err && (
              <b
                className="admin-error"
                style={{
                  height: "100%",
                  textAlign: "left",
                  borderRadius: "14px",
                  padding: "12px",
                }}
              >
                errore, riprovare
              </b>
            )}
            <button value="submit">
              <span>salva prodotto</span>
              <Icon name="save" />
            </button>
          </article>
        </section>
      </form>
    </main>
  );
}

function Orders() {
  const dispatch = useDispatch();
  const getAllOrdersState = useSelector((state) => state.getAllOrdersReducer);
  const { loading, orders, err } = getAllOrdersState;

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <main>
      {loading && <Loader />}
      <h2 className="admin-title">lista ordini</h2>
      <section className="admin-table-container">
        {err && (
          <b className="admin-error">
            Impossibile caricare gli utenti, controllare il database o il
            backend
          </b>
        )}
        <table className="admin-table">
          <thead>
            <tr>
              <th>id</th>
              <th>id utente</th>
              <th>importo</th>
              <th>data</th>
              <th>id transazione</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((it, index) => {
                return (
                  <tr key={index}>
                    <td>{it._id}</td>
                    <td>{it.userId}</td>
                    <td>{it.orderAmount}</td>
                    <td>{it.createdAt}</td>
                    <td>{it.transactionId}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function EditProduct({ match }) {
  const id = match.params.id;
  const dispatch = useDispatch();

  const getProductByIdState = useSelector(
    (state) => state.getProductByIdReducer
  );
  const { loading, product, error } = getProductByIdState;
  const updateProductState = useSelector((state) => state.updateProductReducer);
  const { success, err } = updateProductState;
  useEffect(() => {
    if (product && product.length !== 0) {
      setImageUrl(product.image);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.countInStock);
      setCategory(product.category);
      setSeller(product.seller);
    } else {
      dispatch(getProductById(id));
    }
  }, [dispatch, id, product]);

  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState("electronics");
  const [seller, setSeller] = useState("");

  function _updateProduct(e) {
    e.preventDefault();
    const product = {
      price: price,
      countInStock: stock,
      name: name,
      seller: seller,
      category: category,
      image: imageUrl,
      description: description,
    };
    dispatch(updateProduct(product, id));
  }

  return (
    <main>
      {(loading || (updateProductState && updateProductState.loading)) && (
        <Loader />
      )}
      <form className="product-description" onSubmit={_updateProduct}>
        <section className="col-1">
          <figure className="card image-container">
            <h1>url immagine</h1>
            <img
              src={imageUrl}
              alt={`${name}`.toLowerCase()}
              style={{ margin: "8px 0" }}
              required
            />
            <input
              className="admin-add-input"
              type="url"
              onChange={(e) => setImageUrl(e.target.value)}
              defaultValue={imageUrl}
              required
            />
          </figure>
        </section>
        <section className="col-2">
          <article className="card">
            <h1>nome prodotto</h1>
            <input
              className="admin-add-input"
              type="text"
              onChange={(e) => setName(e.target.value.toLowerCase())}
              minLength="10"
              maxLength="50"
              defaultValue={name}
              required
            />
            <h1>nome venditore</h1>
            <input
              className="admin-add-input"
              type="text"
              onChange={(e) => setSeller(e.target.value.toLowerCase())}
              minLength="2"
              maxLength="30"
              defaultValue={seller}
              required
            />
          </article>
          <article className="card">
            <h1>prezzo €</h1>
            <input
              className="admin-add-input"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              defaultValue={price}
              required
            />
            <h1>stock</h1>
            <input
              className="admin-add-input"
              type="number"
              onChange={(e) => setStock(e.target.value)}
              step="1"
              defaultValue={stock}
              required
            />
          </article>
          <article className="card description">
            <h3>descrizione</h3>
            <textarea
              className="admin-add-input"
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              minLength="16"
              maxLength="400"
              defaultValue={description}
              required
            />
            <h3>categoria</h3>
            <select
              className="admin-add-input"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
              required
            >
              <option value="electronics">elettronica</option>
              <option value="art">arte</option>
              <option value="it">IT</option>
              <option value="home">casa</option>
              <option value="other">altro</option>
            </select>
          </article>
          <article className="card" id="orderInfo" style={{ padding: "0" }}>
            {success && (
              <b
                className="admin-success"
                style={{
                  height: "100%",
                  textAlign: "left",
                  borderRadius: "14px",
                  padding: "12px",
                }}
              >
                prodotto aggiornato
              </b>
            )}
            {(error || err) && (
              <b
                className="admin-error"
                style={{
                  height: "100%",
                  textAlign: "left",
                  borderRadius: "14px",
                  padding: "12px",
                }}
              >
                errore, riprovare
              </b>
            )}
            <button value="submit">
              <span>aggiorna prodotto</span>
              <Icon name="save" />
            </button>
          </article>
        </section>
      </form>
    </main>
  );
}
