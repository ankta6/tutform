import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import Formvalid from "./Formvalid.css";
import * as yup from "yup";

export const FormValid = () => {
  const [arr2, setArr2] = useState([]);
  const [bol, setBol] = useState(false);
  const [formObject, setFormObject] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const validation = yup.object().shape({
    id: yup
      .number()
      .min(1)
      .max(20 * 5)
      .required("Please enter your id"),
    name: yup.string().min(2).max(20).required("Please enter your name"),
    email: yup
      .string()
      .required("please enter your email")
      .email("please enter valid email"),
    password: yup
      .string()
      .min(6)
      .max(10)
      .required("please enter your password"),
    confirm_password: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Password is not matched"),
  });
  const handleSubmit = (values, action) => {
    console.log(arr2);
    // setArr2([arr2]);
    setFormObject([values]);

    action.resetForm();
    handleEdit(values);

    // c{onsole.log(tableData);
    if(bol==true){
return ;
    }else{
      arr2.push(values);
    }
  };

  const handleDelete = (i) => {
    const data = [...arr2];

    data.splice(i, 1);
    setArr2(data);
  };
  const handleEdit = (values) => {
    const data = { ...values };
   
      arr2.filter((item, index) => {
        if (item.id === data.id) {
          arr2.splice(index, 1);
          arr2.push(data);
          setBol(true);
        } 
        // setArr2(arr2);
      });
    }
 

  return (
    <>
      <h1>Form validation with formik and yup library</h1>

      <Formik
        initialValues={formObject}
        validationSchema={validation}
        onSubmit={handleSubmit}
        // saveData={saveData}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form>
          <div className="form">
            Id: <Field type="text" name="id" placeholder=" enter your id" />
            <p className="danger">
              <ErrorMessage name="id" />
            </p>
          </div>
          <div className="form">
            Name:{" "}
            <Field type="text" name="name" placeholder=" enter your name" />
            <p className="danger">
              <ErrorMessage name="name" />
            </p>
          </div>
          <div className="form">
            Email:{" "}
            <Field type="email" name="email" placeholder=" enter your email" />
            <p className="danger">
              <ErrorMessage name="email" />
            </p>
          </div>
          <div className="form">
            Password:{" "}
            <Field
              type="password"
              name="password"
              placeholder=" enter your password"
            />
            <p className="danger">
              <ErrorMessage name="password" />
            </p>
          </div>
          <div>
            confirmPassword:
            <Field
              type="password"
              name="confirm_password"
              placeholder="confirm_password"
            />
            <p className="danger">
              <ErrorMessage name="confirm_password" />
            </p>
          </div>
          <button type="submit" >
            Submit
          </button>
        </Form>
      </Formik>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {arr2?.map((e, index) => {
            return (
              <tr key={index}>
                <td>{e.id}</td>
                <td>{e.name}</td>

                <td>{e.email}</td>
                <td>{e.password}</td>
                <td>
                  <button type="submit" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
