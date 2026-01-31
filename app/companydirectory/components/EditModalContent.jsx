import React, { Fragment, useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import CreateModal from './Modal';

export default function EditDepartmentLocationModalContent(props) {

  const { departments, locations } = props

  const [editType, setEditType] = useState('departments')

  const [departmentForm, setDepartmentForm] = useState({
    name: "",
    locationid: "",
    departmentid: "",
  });
  const [locationForm, setLocationForm] = useState({
    name: "",
    locationid: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  const validateDepartment = (form) => {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = "Department name is required";
    }

    if (!form.locationid) {
      errs.locationid = "Location is required";
    }

    return errs;
  }

  const validateLocation = (form) => {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = "Location name is required";
    }

    return errs;
  }


  const resetForm = () => {
    if (!departments.length || !locations.length) return;
    setDepartmentForm({
      locationid: departments[0].locationid,
      name: departments[0].label,
      departmentid: departments[0].value,
    });
    setLocationForm({
      name: locations[0].label,
      locationid: locations[0].value,
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


  const handleDepartmentChange = (e) => {
    setDepartmentForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleLocationFormChange = (e) => {
    setLocationForm({ ...locationForm, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
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
      const res = await fetch(`/api/departments/${departmentForm.departmentid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: departmentForm.name,
          locationid: Number(departmentForm.locationid),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Failed to update department");
        setIsLoading(false);
        return;
      }
    }

    if (editType === "locations") {
      const res = await fetch(`/api/locations/${locationForm.locationid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: locationForm.name,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Failed to update location");
        setIsLoading(false)
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
          value={departmentForm.departmentid}
          onChange={(e) => {
            const selected = departments.find(
              d => d.value === Number(e.target.value)
            );

            setDepartmentForm({
              departmentid: selected.value,
              name: selected.label,
              locationid: selected.locationid,
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
        <Label for="locationid">
          Location
        </Label>
        <Input
          id="locationid"
          name="locationid"
          type="select"
          onChange={handleDepartmentChange}
          value={departmentForm.locationid}
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
          <Label for="locationid">
            Location
          </Label>
          <Input
            id="locationid"
            name="locationid"
            type="select"
            value={locationForm.locationid}
            onChange={(e) => {
              const selectedLocation = locations.find(
                l => l.value === Number(e.target.value)
              );

              setLocationForm({
                name: selectedLocation.label,
                locationid: selectedLocation.value,
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
    <CreateModal content={modalContent} onSubmit={handleSubmit} show={props.show} onClose={onClose} error={error} isLoading={isLoading} />
  )
}
