'use client'

import Input from "./Input";

//Components
import InputButton from "./InputButton";

type LoginForm = {
  onHandleSubmit: any,
  onHandleChange: Function
}

export default function LoginForm(props: LoginForm) {

  return (
    <section className="col-md-12 m-auto mb-4">
      <div className="lead text-primary mb-4 center">
        <span className="display-5 font-weight-bold">Login</span>
      </div>
      <form onSubmit={props.onHandleSubmit} className="p-5 profile">
        <div className="lead text-dark mb-2 center">
          <p>Entrar com o email e senha</p>
        </div>
        <div className="d-block mb-3">
          <div className="flex">
            <i className="bi bi-envelope me-1 text-secondary"></i>
            <label className="mt-2 text-dark font-weight-bold">Email</label>
          </div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="mt-2 text-dark bg-ccc form-control p-3"              
            event={props.onHandleChange}
          />
        </div>
        <div className="d-block mb-3">
          <div className="flex">
            <i className="bi bi-bag me-1 text-secondary"></i>
            <label className="mt-2 text-dark font-weight-bold">Senha</label>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            className="mt-2 text-dark bg-ccc form-control p-3"   
            event={props.onHandleChange}
          />
        </div>
        <div className="mt-2">
          <InputButton
            type="submit"
            name="login"            
            className="btn btn-primary form-control mt-3 font-weight-bold p-3"
            value="Entrar"
          />
        </div>
      </form>    
    </section>
  );
}
