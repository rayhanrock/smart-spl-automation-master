import React from 'react'
import { useState } from 'react'
import Select from 'react-select'
import './task.css'
import { CAccordion, CAccordionItem,CAccordionHeader,CAccordionBody,CCard,CCardBody,CCardTitle,CCardSubtitle,CCardText,CRow,CCol, CFormLabel,CFormInput,CButton,CModal,CModalHeader,CModalTitle,CModalBody,CModalFooter,CFormTextarea,
 } from '@coreui/react'

function task() {

  const [visibleLg, setVisibleLg] = useState(false)

  const assigned = [
    { value: 'sunaan', label: 'Sunaan' },
    { value: 'rayhan', label: 'Rayhan' },
    { value: 'ayesha', label: 'Ayesha' }
  ]

  const priority = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ]

  const status = [
    { value: 'no progress', label: 'No Progress' },
    { value: 'in progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ]

  return (
    <>
      <div className='header2'>Tasks</div>
      
      <CButton className='task-button' color="info" variant="outline" onClick={() => setVisibleLg(!visibleLg)}>Add Task</CButton>
        <CModal alignment="center" size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
          <CModalHeader>
            <CModalTitle>Add Task</CModalTitle>
          </CModalHeader>
          <CModalBody>
              <CFormLabel htmlFor="exampleFormControlTextarea1">Title: </CFormLabel>
              <CFormInput type="text" placeholder="Enter Task Title" aria-label="default input example"/>
              <CFormLabel className='description' htmlFor="exampleFormControlTextarea1">Description: </CFormLabel>
              <CFormTextarea id="exampleFormControlTextarea1" rows="3" placeholder="Enter task description"></CFormTextarea>
              <CFormLabel className='description' htmlFor="exampleFormControlTextarea1">Assigned to: </CFormLabel>
              <Select options={assigned} isMulti/>
              <CFormLabel className='description' htmlFor="exampleFormControlTextarea1">Priority: </CFormLabel>
              <Select options={priority} isMulti/>
              <CFormLabel className='description' htmlFor="exampleFormControlTextarea1">Status: </CFormLabel>
              <Select options={status} isMulti/>
              <CFormLabel className='description' htmlFor="exampleFormControlTextarea1">Due Date: </CFormLabel>
              <CFormInput type="date" />
          </CModalBody>
          <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleLg(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
        </CModal>

    <CAccordion flush>
      <CAccordionItem itemKey={1} className='accordion'>
        <CAccordionHeader>Identify Stakeholders</CAccordionHeader>
          <CAccordionBody>

          <CFormLabel htmlFor="exampleFormControlTextarea1">Identify the main Stakeholders for this project in detail.</CFormLabel> <br/>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Assigned To: </CFormLabel> <br/>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Priority: </CFormLabel><br/>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Status: </CFormLabel><br/>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Due: </CFormLabel><br/>
          <CFormInput type="file" size="sm" id="formFileSm"/>

          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>

      <CAccordion flush>
      <CAccordionItem itemKey={1} className='accordion'>
        <CAccordionHeader>Gather requirements</CAccordionHeader>
          <CAccordionBody>
            
          <CFormLabel htmlFor="exampleFormControlTextarea1">Gather the necessary requirements for the project.</CFormLabel> <br/>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Assigned To: </CFormLabel> <br/>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Priority: </CFormLabel><br/>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Status: </CFormLabel><br/>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Due: </CFormLabel><br/>
          <CFormInput type="file" size="sm" id="formFileSm"/>

          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>

      <CAccordion flush>
      <CAccordionItem itemKey={1} className='accordion'>
        <CAccordionHeader>Design UI</CAccordionHeader>
          <CAccordionBody>
            
          <CFormLabel htmlFor="exampleFormControlTextarea1">Design User Interface.</CFormLabel> <br/>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Assigned To: </CFormLabel> <br/>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Priority: </CFormLabel><br/>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Status: </CFormLabel><br/>
          <CFormLabel htmlFor="exampleFormControlTextarea1">Due: </CFormLabel><br/>
          <CFormInput type="file" size="sm" id="formFileSm"/>

          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </>
    
  )
}

export default task