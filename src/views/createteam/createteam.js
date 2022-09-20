import React from "react";
import "./createteam.css";
import {
  CForm,
  CFormLabel,
  CFormTextarea,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CTable,
} from "@coreui/react";

function createteam() {
  const teacherColumns = [
    {
      key: "id",
      label: "#",
      _props: { scope: "col" },
    },
    {
      key: "class",
      label: "Mentors",
      _props: { scope: "col" },
    },
    {
      key: "heading_1",
      label: "",
      _props: { scope: "col" },
    },
    {
      key: "heading_2",
      label: "Designation",
      _props: { scope: "col" },
    },
  ];
  const teacherItems = [
    {
      id: 1,
      class: "Dipok",
      heading_2: "Lecturer",
      _cellProps: { id: { scope: "row" }, class: { colSpan: 2 } },
    },
    {
      id: 1,
      class: "Ifty",
      heading_2: "Lecturer",
      _cellProps: { id: { scope: "row" }, class: { colSpan: 2 } },
    },
  ];
  return (
    <>
      <div className="header">Mentor List</div>
      <CTable columns={teacherColumns} items={teacherItems} />

      <div className="header">Student List</div>
      {/* <CTable columns={columns} items={items} /> */}
    </>
  );
}

export default createteam;
