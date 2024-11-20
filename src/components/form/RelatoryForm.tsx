'use client'

// Components
import Input from "./Input";
import InputButton from "./InputButton";

type RelatoryFormProps = {
  onHandleChange: Function,
  onHandleSubmit: any,
}

export default function RelatoryForm(props: RelatoryFormProps) {

  return (
    <section className="col-md-12 m-auto mb-4">
      <div className="lead text-primary mb-5 center">
        <span className="display-5 font-weight-bold">Gerar Relatório</span>
      </div>
      <form onSubmit={props.onHandleSubmit} className="p-5 profile">
        <div className="lead text-dark mb-2 center">
          <p>Preencha os dados do formulário abaixo</p>
        </div>
        <div className="row">
          <div className="d-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Data inicial</label>
            <Input
              type="Date"
              name="startDate"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="d-block mb-3">
            <label className="mt-2 text-dark font-weight-bold">Data final</label>
            <Input
              type="date"
              name="endDate"
              className="mt-2 text-dark bg-ccc form-control p-3"
              event={props.onHandleChange}
            />
          </div>
          <div className="mt-2">
            <InputButton
              type="submit"
              name="do_relatory"            
              className="btn btn-primary form-control mt-3 font-weight-bold p-3"
              value="Gerar"
            />
          </div>
        </div>
      </form>    
    </section>
  );
}

