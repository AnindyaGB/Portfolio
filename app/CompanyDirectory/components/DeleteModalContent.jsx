
import React, { useCallback, useState, useEffect, Fragment } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import CreateModal from './Modal';

export default function DeleteModal(props) {

  const { departments, locations } = props

  const [deleteType, setDeleteType] = useState('departments')

  const [form, setForm] = useState({
    locations: "",
    departments: "",
    personnel: '',
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (props.id) {
      setDeleteType('personnel');
      setForm({ ...form, personnel: props.id.id });
    } else {
      setDeleteType('departments');
    }
  }, [props.id])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const deleteWhat = e => {
    setDeleteType(e)
    setForm({
      locations: "",
      departments: ""
    })
  }

  const onClose = () => {
    props.onClose()
    setDeleteType('departments')
    setIsLoading(false)
    setForm({
      locations: "",
      departments: ""
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
  setIsLoading(true);
    const res = await fetch(`/api/${deleteType}/${form[deleteType]}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to delete personnel");
    }

    props.onSuccess()
    onClose()

    return await res.json();
  }

  const deleteForm = {
    personnel: `Are you sure you want to delete ${props.id?.firstName} ${props.id?.lastName}?`,
    departments: <FormGroup>
      <Label for="departments">
        Department
      </Label>
      <Input
        id="departments"
        name="departments"
        type="select"
        onChange={handleChange}
        value={form.departments}
      >
        {departments.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </Input>
    </FormGroup>,
    locations: <FormGroup>
      <Label for="locations">
        Location
      </Label>
      <Input
        id="locations"
        name="locations"
        type="select"
        onChange={handleChange}
        value={form.locations}
      >
        {locations.map((l) => (
          <option key={l.value} value={l.value}>
            {l.label}
          </option>
        ))}
      </Input>
    </FormGroup>
  }

  const content = {
    header: 'Delete...',
    body:
      <Fragment>
        {deleteType !== 'personnel' ? <FormGroup>
          <Label for="exampleSelect">
            Delete...
          </Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            onChange={e => deleteWhat(e.target.value)}
          >
            <option value='departments'>
              Department
            </option>
            <option value='locations'>
              Location
            </option>

          </Input>
        </FormGroup> : null}
        {deleteForm[deleteType]}
      </Fragment>
  }
  return (
    <CreateModal onSubmit={handleSubmit} show={props.show} onClose={onClose} content={content} isDelete={true} error={error} isLoading={isLoading} />

  )

}