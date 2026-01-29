"use client";

import { useEffect, useState, useRef } from "react";
import EditPersonnelModal from '../components/EditPersonnelModal';
import styles from './CompanyDirectory.module.css'
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
  const [sortBy, setSortBy] = useState("lastname");
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

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });
  const [isMobile, setIsMobile] = useState(false);
  const loaderRef = useRef(null);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  function showToast(message, type = "success") {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  }

  useEffect(() => {
    setPage(1);
  }, [search, departmentID, locationID, sortBy, order]);

  useEffect(() => {
  setPage(1);
  setPersonnel([]);
}, [isMobile])

useEffect(() => {
  if (!isMobile) return;

  const observer = new IntersectionObserver(entries => {
    if (
      entries[0].isIntersecting &&
      !loading &&
      page < totalPages
    ) {
      setPage(p => p + 1);
    }
  });

  if (loaderRef.current) {
    observer.observe(loaderRef.current);
  }

  return () => observer.disconnect();
}, [isMobile, page, totalPages, loading]);



  async function fetchPersonnel() {
    setLoading(true);

    const params = new URLSearchParams({
      search,
      sortBy,
      order,
      page,
      pageSize,
    });

    if (departmentID) params.append("departmentid", departmentID);
    if (locationID) params.append("locationid", locationID);

    const res = await fetch(`/api/personnel?${params}`, { cache: "no-store" });
    if (!res.ok) {
      showToast("Something went wrong", "danger");
      return;
    }
    const json = await res.json();

    setPersonnel(prev => {
  if (isMobile) {
    return page === 1 ? json.data : [...prev, ...json.data];
  } else {
    return json.data;
  }
});
    setTotalPages(json.totalPages);
    setLoading(false);
  }

  async function fetchDepartments() {
    const res = await fetch("/api/departments");
    if (!res.ok) {
      showToast("Something went wrong", "danger");
      return;
    }
    const departmentsArray = await res.json()
    setDepartments(departmentsArray);
  }

  async function fetchLocations() {
    const res = await fetch("/api/locations");
    if (!res.ok) {
      showToast("Something went wrong", "danger");
      return;
    }
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
      {toast.show && (
        <div style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999
        }}>
          <Toast>
            <ToastHeader
              icon={toast.type}
              toggle={() => setToast({ ...toast, show: false })}
            >
              {toast.type === "success" ? "Success" : "Error"}
            </ToastHeader>
            <ToastBody>
              {toast.message}
            </ToastBody>
          </Toast>
        </div>
      )}
      <div className={styles.filterBar}>
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
      </div>
      <CreateNewModal show={showCreateModal} onClose={() => setShowCreateModal(false)} onSuccess={() => {
        fetchAll();
        showToast("Personnel created successfully");
      }} departments={departments} locations={locations} />
      <DeleteModal show={showDeleteModal} onClose={onDeleteModalClose} id={selectedPersonnel} onSuccess={() => {
        fetchAll();
        showToast("Personnel deleted successfully");
      }} departments={departments} locations={locations} />
      <EditDepartmentLocationModalContent show={showEditDepartmentLocationModal} onClose={() => setShowEditDepartmentLocationModal(false)} onSuccess={() => {
        fetchAll();
        showToast("Changes saved successfully");
      }}
        departments={departments} locations={locations} />
      <EditPersonnelModal open={showEditPersonnelModal} personnel={selectedPersonnel} onClose={() => setShowEditPersonnelModal(false)} onUpdated={() => {
        fetchPersonnel();
        showToast("Personnel updated successfully");
      }} departments={departments} />


      <div className={styles.tableWrapper}>
        <Table striped hover className={styles.table} >
          <thead>
            <tr>
              <th onClick={() => handleSort("firstname")}>First Name{sortIndicator("firstname")}</th>
              <th onClick={() => handleSort("lastname")}>Last Name{sortIndicator("lastname")}</th>
              <th onClick={() => handleSort("email")}>Email Address{sortIndicator("email")}</th>
              <th onClick={() => handleSort("departmentid")}>Department{sortIndicator("departmentid")}</th>
              <th onClick={() => handleSort("location")}>Location{sortIndicator("location")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {personnel.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.emptyState}>
                  No personnel match your search.
                </td>
              </tr>
            ) : (
              personnel.map((p) => (
                <tr key={p.id}>
                  <td className="align-middle">{p.firstname}</td>
                  <td className="align-middle">{p.lastname}</td>
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
              )))}
          </tbody>
        </Table>
      </div>
      {/* Mobile Cards */}
      <div className={styles.mobileList}>
        {personnel.length === 0 ? (
          <div className={styles.emptyState}>
            No personnel match your search.
          </div>
        ) : (
          personnel.map(p => (
            <div key={p.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <strong>{p.firstname} {p.lastname}</strong>
              </div>

              <div className={styles.cardRow}>
                <span>Email:</span>
                <span>{p.email}</span>
              </div>

              <div className={styles.cardRow}>
                <span>Department:</span>
                <span>{p.department}</span>
              </div>

              <div className={styles.cardRow}>
                <span>Location:</span>
                <span>{p.location}</span>
              </div>

              <div className={styles.cardActions}>
                <Button
                  size="sm"
                  color="success"
                  onClick={() => {
                    setSelectedPersonnel(p);
                    setShowEditPersonnelModal(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  color="danger"
                  onClick={() => {
                    setSelectedPersonnel(p);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      {isMobile && <div ref={loaderRef} style={{ height: 1 }} />}

      <div className={styles.paginationWrapper}>
        <Pagination setPage={setPage} page={page} totalPages={totalPages} />
      </div>

    </div>
  );
}
