
import React, { useCallback, useState, useEffect, Fragment } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from "reactstrap";
import CreateModal from './Modal';

export default function CreateNewModal(props) {

  const { departments, locations } = props

  const [createType, setCreateType] = useState('personnel')

  const [form, setForm] = useState({
    name: "",
    locationID: "",
    firstName: "",
    lastName: "",
    email: "",
    departmentID: "",
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function validatePersonnel(form) {
    const errs = {};

    if (!form.firstName.trim()) {
      errs.firstName = "First Name is required";
    }

    if (!form.lastName) {
      errs.lastName = "Last Name is required";
    }

    if (!form.email) {
      errs.email = "Email Address is required";
    } else if (!isValidEmail(form.email)) {
      errs.email = "Enter a valid email address";
    }

    return errs;
  }

  function validateDepartments(form) {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = "Department Name is required";
    }

    return errs;
  }

    function validateLocations(form) {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = "Location Name is required";
    }

    return errs;
  }

  useEffect(() => {
    if (departments.length === 0 || locations.length === 0) return;
    setForm({ ...form, departmentID: departments[0].value, locationID: locations[0].value })
  }, [departments, locations])

    const resetForm = () => {
    setForm({

    name: "",
    firstName: "",
    lastName: "",
    email: "",
    departmentID: departments[0]?.value || "",
    locationID: locations[0]?.value || "",
  
    })
  }

  const onClose = () => {
    props.onClose()
    setCreateType('personnel')
    setIsLoading(false)
    setErrors({});
    resetForm()
  }

  const createWhat = e => {
    setCreateType(e)
    setErrors({});
    resetForm()
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true)

    let validationErrors = {};

    if (createType === "personnel") {
      validationErrors = validatePersonnel(form);
    } else if (createType === "departments") {
      validationErrors = validateDepartments(form);
    } else {
      validationErrors = validateLocations(form);
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false)
      return;
    }
    const res = await fetch(`/api/${createType}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Failed to create");
      return;
    }

    props.onSuccess();
    
    onClose();
  }

  const createForm = {
    personnel:
      <Fragment>
        <FormGroup>
          <Label for="firstName">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name..."
            onChange={handleChange}
            value={form.firstName}
            invalid={!!errors.firstName}
          />
          <FormFeedback>{errors.firstName}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="lastName">
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name..."
            onChange={handleChange}
            value={form.lastName}
            invalid={!!errors.lastName}
          />
          <FormFeedback>{errors.lastName}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="with a placeholder"
            type="email"
            onChange={handleChange}
            value={form.email}
            invalid={!!errors.email}
          />
          <FormFeedback>{errors.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="departmentID">
            Department
          </Label>
          <Input
            id="departmentID"
            name="departmentID"
            type="select"
            onChange={handleChange}
            value={form.departmentID}
          >
            {departments.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Fragment>,
    departments:
      <Fragment>
        <FormGroup>
          <Label for="name">
            Department Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Department Name..."
            onChange={handleChange}
            value={form.name}
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
            value={form.locationID}
            onChange={handleChange}
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
      <FormGroup>
        <Label for="name">
          Location Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Location Name..."
          onChange={handleChange}
          invalid={!!errors.name}
        />
        <FormFeedback>{errors.name}</FormFeedback>
      </FormGroup>
  }

  const content = {
    header: 'Create New...',
    body:
      <Form>
        <FormGroup>
          <Label for="exampleSelect">
            Create New...
          </Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            value={createType}
            onChange={e => createWhat(e.target.value)}
          >
            <option value='personnel'>
              Personnel
            </option>
            <option value='departments'>
              Department
            </option>
            <option value='locations'>
              Location
            </option>
          </Input>
        </FormGroup>
        {createForm[createType]}
      </Form>
  }

  return (
    <CreateModal content={content} onSubmit={handleSubmit} show={props.show} onClose={onClose} error={error} isLoading={isLoading} />
  );

}