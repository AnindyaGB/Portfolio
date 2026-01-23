import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from "reactstrap";
import CreateModal from './Modal';

export default function EditDepartmentLocationModalContent(props) {

  const { departments, locations } = props

  const [editType, setEditType] = useState('departments')

  const [departmentForm, setDepartmentForm] = useState({
    name: "",
    locationID: "",
    departmentID: "",
  });
  const [locationForm, setLocationForm] = useState({
    name: "",
    locationID: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  function validateDepartment(form) {
  const errs = {};

  if (!form.name.trim()) {
    errs.name = "Department name is required";
  }

  if (!form.locationID) {
    errs.locationID = "Location is required";
  }

  return errs;
}

function validateLocation(form) {
  const errs = {};

  if (!form.name.trim()) {
    errs.name = "Location name is required";
  }

  return errs;
}


  const resetForm = () => {
    if (!departments.length || !locations.length) return;
    setDepartmentForm({
      locationID: departments[0].locationID,
      name: departments[0].label,
      departmentID: departments[0].value,
    });
    setLocationForm({
      name: locations[0].label,
      locationID: locations[0].value,
    })
  };
  const editWhat = e => {
    setEditType(e.target.value)
    setErrors({});
    resetForm()
  }

  const onClose = () => {
    props.onClose()
    setEditType('departments')
    setIsLoading(false)
    setErrors({});
    resetForm()
  }

  useEffect(() => {
    if (departments.length === 0 || locations.length === 0) return;
    resetForm()
  }, [departments, locations]);


  function handleDepartmentChange(e) {
    setDepartmentForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleLocationFormChange(e) {
    setLocationForm({ ...locationForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
setIsLoading(true)
      let validationErrors = {};

  if (editType === "departments") {
    validationErrors = validateDepartment(departmentForm);
  } else {
    validationErrors = validateLocation(locationForm);
  }

  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false)
      return;
    }
    
    if (editType === "departments") {
      const res = await fetch(`/api/departments/${departmentForm.departmentID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: departmentForm.name,
          locationID: Number(departmentForm.locationID),
        }),
      });

      if (!res.ok) {
        setError("Failed to update department");
        return;
      }
    }

    if (editType === "locations") {
      const res = await fetch(`/api/locations/${locationForm.locationID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: locationForm.name,
        }),
      });

      if (!res.ok) {
        setError("Failed to update location");
        return;
      }
    }

    props.onSuccess();
    onClose()
  }

  const editForm = {
    departments: <Fragment>
      <FormGroup>
        <Label for="departmentID">
          Department
        </Label>
        <Input
          id="departmentID"
          name="departmentID"
          type="select"
          value={departmentForm.departmentID}
          onChange={(e) => {
            const selected = departments.find(
              d => d.value === Number(e.target.value)
            );

            setDepartmentForm({
              departmentID: selected.value,
              name: selected.label,
              locationID: selected.locationID,
            });
          }}
        >
          {departments.map(d => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="name">
          Department Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Department Name..."
          onChange={handleDepartmentChange}
          value={departmentForm.name}
          invalid={!!errors.name}
        />
        <FormFeedback>{errors.name}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="locationID">
          Location
        </Label>
        <Input
          id="locationID"
          name="locationID"
          type="select"
          onChange={handleDepartmentChange}
          value={departmentForm.locationID}
        >
          {locations.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </Input>
      </FormGroup>
    </Fragment>,
    locations:
      <Fragment>
        <FormGroup>
          <Label for="locationID">
            Location
          </Label>
          <Input
            id="locationID"
            name="locationID"
            type="select"
            value={locationForm.locationID}
            onChange={(e) => {
              const selectedLocation = locations.find(
                l => l.value === Number(e.target.value)
              );

              setLocationForm({
                name: selectedLocation.label,
                locationID: selectedLocation.value,
              });
            }}
          >
            {locations.map(l => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="name">
            Location Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Location Name..."
            onChange={handleLocationFormChange}
            value={locationForm.name}
            invalid={!!errors.name}
          />
          <FormFeedback>{errors.name}</FormFeedback>
        </FormGroup>
      </Fragment>
  }
  const modalContent = {
    header: 'Edit..',
    body:
      <Form>
        <FormGroup>
          <Label for="exampleSelect">
            Edit...
          </Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            onChange={editWhat}
          >
            <option value='departments'>
              Department
            </option>
            <option value='locations'>
              Location
            </option>
          </Input>
        </FormGroup>
        {editForm[editType]}
      </Form>
  }

  return (
    <CreateModal content={modalContent} onSubmit={handleSubmit} show={props.show} onClose={onClose} error={error} isLoading={isLoading}  disableSubmit={
    editType === "departments"
      ? Object.keys(validateDepartment(departmentForm)).length > 0
      : Object.keys(validateLocation(locationForm)).length > 0
  }/>
  )
}
