import React, { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom";
import { useApp } from "../../hooks/useApp";
import { useAuth } from "../../hooks/useAuth";
import fetchApi from "../../helpers/fetchApi";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button"

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visiblePassowrd, setVisiblePassowrd] = useState(false);
  const { user, handleLogin } = useAuth();
  const { setToastAction } = useApp();

  const initialValues = {
      email: "",
      password: "",
  };
// console.log('uwiconnexer', user);

  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {

          setIsSubmitting(true);

          const response = await fetchApi('/login', {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                  "Content-Type": "application/json"
              }
          });

          await handleLogin(response);

          setToastAction({
              severity: "success",
              summary: "Success",
              detail: "Connexion réussie",
              life: 3000,
          })

          setErrors(null);

      } catch (response) {
          if (response.httpStatus === 422) {
              setErrors(response.errors);
          }

          setToastAction({
              severity: "error",
              summary: "Erreur",
              detail: response.message,
              life: 3000,
          })
      } finally {
          setIsSubmitting(false);
      }
  };

  useEffect(() => {
      document.title = 'Login';
  }, [])

  if (user.data) {
      return <Navigate replace to={'/dashboard'} />
  }

  return (
    <>
      
      <div className="z-10 relative">
        <div className="login-container">
          <div className="login-card">
            <Card className="w-100 p-4">
              <h4 className="text-center mb-2">Connexion</h4>
              <p className="text-center text-muted mb-4">
                Veuillez entrer votre nom d'utilisateur et votre mot de passe.
              </p>

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="p-field mb-3">
                  <label htmlFor="email">Email</label>
                  <InputText
                    id="email"
                    type="email"
                    className={`w-100 ${errors?.email ? "p-invalid" : ""}`}
                    value={data.email}
                    onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                  />
                  {errors?.email && <small className="p-error">{errors.email}</small>}
                </div>

                <div className="p-field mb-3 relative">
                  <label htmlFor="password">Mot de passe</label>
                  <InputText
                    id="password"
                    type={visiblePassowrd ? "text" : "password"}
                    className={`w-100 ${errors?.password ? "p-invalid" : ""}`}
                    value={data.password}
                    onChange={(e) => setData((d) => ({ ...d, password: e.target.value }))}
                  />
                  <span className="toggle-password" onClick={() => setVisiblePassowrd((v) => !v)}>
                    <i className={`pi ${visiblePassowrd ? "pi-eye-slash" : "pi-eye"}`} />
                  </span>
                  {errors?.password && <small className="p-error">{errors.password}</small>}
                </div>

                <Button
                  label="Se connecter"
                  icon="pi pi-sign-in"
                  className="mx-auto mt-4 btn-primary block"
                  type="submit"
                  loading={isSubmitting}
                />
              </form>
            </Card>
          </div>
        </div>
      </div>
      
    </>
    
  );
}

export default Login;