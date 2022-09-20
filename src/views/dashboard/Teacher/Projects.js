import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { Link } from "react-router-dom";
import reactIMG from "./../../../assets/images/theme.png";
import "../../dashboard/projects.css";
import {
  CRow,
  CCard,
  CButton,
  CCardBody,
  CCol,
  CCardImage,
  CCardTitle,
  CCardText,
  CCardFooter,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CMultiSelect,
} from "@coreui/react";

function projects() {
  const { joinCode } = useParams();
  console.log(joinCode);
  const [visible, setVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const getData = React.useCallback(async () => {
    axios
      .get(`http://127.0.0.1:8000/api/spl-manager/project/${joinCode}`)
      .then((res) => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [visible]);
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="header2">
        Projects
        <div className="butt">
          <CButton
            className="projects-button"
            color="dark"
            variant="outline"
            onClick={() => setVisible(!visible)}
          >
            Create Project
          </CButton>
          <Link to={"/createteam/" + joinCode}>
            <CButton
              className="projects-button"
              color="dark"
              variant="outline"
              onClick={() => setVisible(!visible)}
            >
              Create Team
            </CButton>
          </Link>
        </div>
        <CModal
          alignment="center"
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <CModalHeader>
            <CModalTitle>Create Project</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormLabel htmlFor="exampleFormControlTextarea1">
              Name:{" "}
            </CFormLabel>
            <CFormInput
              type="text"
              placeholder="Enter Project Name"
              aria-label="default input example"
            />
            <CFormLabel
              className="description"
              htmlFor="exampleFormControlTextarea1"
            >
              Description:{" "}
            </CFormLabel>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Enter a project description"
            ></CFormTextarea>
            <CFormLabel
              className="description"
              htmlFor="exampleFormControlTextarea1"
            >
              Team Name:{" "}
            </CFormLabel>
            <CFormInput
              type="text"
              placeholder="Enter Team Name"
              aria-label="default input example"
            />
            <CFormLabel
              className="description"
              htmlFor="exampleFormControlTextarea1"
            >
              Assigned to:{" "}
            </CFormLabel>
            <Select options={options} isMulti />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </div>

      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
        {projects.map((project) => (
          <CCol xs key={project.id}>
            <CCard>
              <CCardImage orientation="top" src={reactIMG} />
              <CCardBody>
                <CCardTitle>{project.title}</CCardTitle>
                <CCardText>{project.description}</CCardText>
                <a href="projects/task" className="stretched-link"></a>
              </CCardBody>
              <CCardFooter>
                <small className="text-medium-emphasis">
                  Assigned team: {project.team}
                </small>
              </CCardFooter>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  );
}

export default projects;
