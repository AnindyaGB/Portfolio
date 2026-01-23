"use client";

import { Fragment, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from "reactstrap";
import CreateModal from './Modal';


export default function EditPersonnelModal({
  open,
  onClose,
  personnel,
  onUpdated,
  departments
}) {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    departmentID: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!open || !personnel) return;

    setForm({
      firstName: personnel.firstName,
      lastName: personnel.lastName,
      departmentID: personnel.departmentID,
    });
  }, [open, personnel]);

  function validatePersonnel(form) {
    const errs = {};

    if (!form.firstName.trim()) {
      errs.firstName = "First Name is required";
    }

    if (!form.lastName) {
      errs.lastName = "Last Name is required";
    }

    return errs;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
  setIsLoading(true)
    let validationErrors = validatePersonnel(form);;


    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false);
      return;
    };


    const res = await fetch(`/api/personnel/${personnel.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Failed to update personnel");
      return;
    }

    onUpdated();
    onClose();
    setIsLoading(false);
  }

  if (!open || !personnel) return null;

  const modalContent = {
    header: 'Edit User',
    body:
      <Form>
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
            value={personnel.email}
            disabled
          />
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
      </Form>
  }
  return (
  
    <CreateModal content={modalContent} onSubmit={handleSubmit} show={open} onClose={onClose} error={error} isLoading={isLoading} />
  );
}