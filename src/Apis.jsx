import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Api.css";

const Apis = () => {
  const [formData, setFormData] = useState({
    cname: "",
    cemail: "",
    mob: "",
    product: "",
  });

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  async function getCustomer() {
    try {
      const res = await axios.get(
        "https://mihexem7.pythonanywhere.com/customer/"
      );
      setCustomers(res.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }

  async function getData() {
    try {
      const response = await axios.get(
        "https://mejevo.pythonanywhere.com/product/"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getData();
    getCustomer();
  }, []);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    const selectedProductId = e.target.value;
    const selectedProduct = products.find(
      (product) => product.id === parseInt(selectedProductId)
    );

    if (selectedProduct) {
      const productUrl = `https://mejevo.pythonanywhere.com/product/${selectedProduct.id}`;
      setFormData({
        ...formData,
        product: productUrl,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.id);
    try {
      if (formData.id) {
        await axios.put(
          `https://mihexem7.pythonanywhere.com/customer/${formData.id}/`,
          formData
        );
        alert("Customer updated successfully!");
      } else {
        await axios.post(
          "https://mihexem7.pythonanywhere.com/customer/",
          formData
        );
        alert("Customer added successfully!");
      }

      setFormData({
        id: "",
        cname: "",
        cemail: "",
        mob: "",
        product: "",
      });

      getCustomer();
    } catch (error) {
      console.error("Error updating or creating customer:", error);
    }
  };

  const handleUpdate = async (v) => {
    setFormData(v);
  };

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(
        `https://mihexem7.pythonanywhere.com/customer/${customerId}/`
      );
      alert("Customer deleted successfully!");
      getCustomer();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="cname" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="cname"
                name="cname"
                value={formData.cname}
                onChange={(e) =>
                  setFormData({ ...formData, cname: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cemail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="cemail"
                name="cemail"
                value={formData.cemail}
                onChange={(e) =>
                  setFormData({ ...formData, cemail: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="product" className="form-label">
                Select Product
              </label>
              <select
                className="form-select"
                id="product"
                name="product"
                onChange={handleInputChange}
                required
              >
                <option value="">Select a Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.id} {product.name} {product.price} {product.cat}
                    {product.cmp}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="mob" className="form-label">
                Mobile No.
              </label>
              <input
                type="number"
                className="form-control"
                id="mob"
                name="mob"
                value={formData.mob}
                onChange={(e) =>
                  setFormData({ ...formData, mob: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {formData.id ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>

      <br />
      <br />
      <hr />
      <table>
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Product URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((v, i) => (
            <tr key={v.id}>
              <td>{i + 1}</td>
              <td>{v.id}</td>
              <td>{v.cname}</td>
              <td>{v.cemail}</td>
              <td>{v.mob}</td>
              <td>
                <a href={v.product}>{v.product}</a>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleUpdate(v)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(v.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Apis;
