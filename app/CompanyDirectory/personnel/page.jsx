"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Modal from '../components/Modal';
import EditPersonnelModal from '../components/EditPersonnelModal';
import styles from './CompanyDirectory.module.css'
import Select from 'react-select'
import '@fortawesome/fontawesome-free/css/all.min.css';
import CreateNewModal from '../components/CreateModalContent';
import DeleteModal from "../components/DeleteModalContent";
import EditDepartmentLocationModalContent from '../components/EditModalContent';
import Pagination from '../components/Pagination';

import { Button, Input, Table, Toast, ToastHeader, ToastBody } from "reactstrap";

export default function PersonnelPage() {
  const [personnel, setPersonnel] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [locationID, setLocationID] = useState("");
  const [sortBy, setSortBy] = useState("lastName");
  const [order, setOrder] = useState("ASC");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [showEditPersonnelModal, setShowEditPersonnelModal] = useState(false);
  const [showEditDepartmentLocationModal, setShowEditDepartmentLocationModal] = useState(false);

  const [selectedPersonnel, setSelectedPersonnel] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function fetchPersonnel() {
    setLoading(true);

    const params = new URLSearchParams({
      search,
      sortBy,
      order,
      page,
      pageSize,
    });

    if (departmentID) params.append("departmentID", departmentID);
    if (locationID) params.append("locationID", locationID);

    const res = await fetch(`/api/personnel?${params}`, { cache: "no-store" });
    const json = await res.json();

    setPersonnel(json.data);
    setTotalPages(json.totalPages);
    setLoading(false);
  }

  async function fetchDepartments() {
    const res = await fetch("/api/departments");
    const departmentsArray = await res.json()
    setDepartments(departmentsArray);
  }

  async function fetchLocations() {
    const res = await fetch("/api/locations");
    const locationsArray = await res.json()
    setLocations(locationsArray);
  }

  const filterDepartments = [{ value: '', label: 'All Departments' }, ...departments];
  const filterLocations = [{ value: '', label: 'All Locations' }, ...locations]

  useEffect(() => {
    fetchDepartments();
    fetchLocations();
  }, []);

  useEffect(() => {
    fetchPersonnel();
  }, [page, pageSize, search, departmentID, locationID, sortBy, order]);

  function handleSort(column) {
    if (sortBy === column) {
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(column);
      setOrder("ASC");
    }
    setTimeout(fetchPersonnel, 0);
  }

  function sortIndicator(column) {
    if (sortBy !== column) return <i className="fa-solid fa-sort"></i>;
    return order === "ASC" ? <i className="fa-solid fa-sort-up"></i> : <i className="fa-solid fa-sort-down"></i>;
  }

  const fetchAll = () => {
    fetchPersonnel();
    fetchDepartments();
    fetchLocations();
  }

  const onDeleteModalClose = () => {
    setShowDeleteModal(false);
    setSelectedPersonnel(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.crud}>
        <Button color="primary" onClick={() => setShowCreateModal(true)} >
          {'New'}
        </Button>
        <Button color="success" onClick={() => setShowEditDepartmentLocationModal(true)} >
          {'Edit'}
        </Button>
        <Button color="danger" onClick={() => setShowDeleteModal(true)} >
          {'Delete'}
        </Button>
      </div>

      <CreateNewModal show={showCreateModal} onClose={() => setShowCreateModal(false)} onSuccess={fetchAll} departments={departments} locations={locations} />
      <DeleteModal show={showDeleteModal} onClose={onDeleteModalClose} id={selectedPersonnel} onSuccess={fetchAll} departments={departments} locations={locations} />
      <EditDepartmentLocationModalContent show={showEditDepartmentLocationModal} onClose={() => setShowEditDepartmentLocationModal(false)} onSuccess={fetchAll} departments={departments} locations={locations} />
      <EditPersonnelModal open={showEditPersonnelModal} personnel={selectedPersonnel} onClose={() => setShowEditPersonnelModal(false)} onUpdated={fetchPersonnel} departments={departments}/>

      {/* Filters */}
      <div className={styles.filters}>
        <Input
          placeholder="Search name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
        <Input
          id="deptFilter"
          name="deptFilter"
          type="select"
          onChange={e => setDepartmentID(e.target.value)}
          value={departmentID}
          className={styles.select}
        >
          {filterDepartments.map(d => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </Input>
        <Input
          id="locFilter"
          name="locFilter"
          type="select"
          onChange={e => setLocationID(e.target.value)}
          value={locationID}
          className={styles.select}
        >
          {filterLocations.map(l => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </Input>
        <Input
          id="pagination"
          name="pagination"
          type="select"
          onChange={e => {
            setPageSize(e.target.value);
            setPage(1);
          }}
          value={pageSize}
          className={styles['selectpagnation']}
        >
          {[{ value: 5, label: '5' }, { value: 10, label: '10' }, { value: 25, label: '25' }, { value: 50, label: '50' }].map(l => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </Input>
      </div>

<div className={styles.tableWrapper}>
      <Table striped hover className={styles.table} >
        <thead>
          <tr>
            <th onClick={() => handleSort("firstName")}>First Name{sortIndicator("firstName")}</th>
            <th onClick={() => handleSort("lastName")}>Last Name{sortIndicator("lastName")}</th>
            <th onClick={() => handleSort("email")}>Email Address{sortIndicator("email")}</th>
            <th onClick={() => handleSort("departmentID")}>Department{sortIndicator("departmentID")}</th>
            <th onClick={() => handleSort("location")}>Location{sortIndicator("location")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {personnel.map((p) => (
            <tr key={p.id}>
              <td className="align-middle">{p.firstName}</td>
              <td className="align-middle">{p.lastName}</td>
              <td className="align-middle">{p.email}</td>
              <td className="align-middle">{p.department}</td>
              <td className="align-middle">{p.location}</td>
              <td className="align-middle">
                <div className={styles.crud}>
                  <Button color="success" title={'Edit Personnel'} size="sm" onClick={() => {
                    setSelectedPersonnel(p);
                    setShowEditPersonnelModal(true);
                  }} >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                  <Button color="danger" title={'Delete Personnel'} size="sm" onClick={() => {
                    setSelectedPersonnel(p);
                    setShowDeleteModal(true);
                  }} >
                    <i className="fa-solid fa-xmark"></i>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
</div>
      <Pagination setPage={setPage} page={page} totalPages={totalPages} />


    </div>
  );
}
