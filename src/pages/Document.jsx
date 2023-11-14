import React, { useEffect, useState } from "react";
import { db,auth } from "../config/firebase";
import {
  getDocs,
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UserProfile from "../Components/UserProfile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid light",
  boxShadow: 24,
  p: 5,
};

function Document() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState(null);
  const [itemId, setItemId] = useState(null);

  const [save,setSave] = useState(false);

  const cuId = auth.currentUser.uid;


  const userDocRef = doc(db, 'users', cuId);
  const userDocumentsCollection = collection(userDocRef, 'documents');


  // create
  const handleAddTask = async () => {

    await addDoc(userDocumentsCollection, {
      taskname: taskName,
      content: " ",
    });
    setTaskName("");
    handleClose();
    getTask();

  };

  // read
  const getTask = async () => {
   
    const data = await getDocs(userDocumentsCollection);
    console.log(data);
    const filleterdData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setTasks(filleterdData);
  };

  // delete
  const handleDeleteTask = async (id,name) => {
    const taskDoc = doc(userDocumentsCollection, id);
    await deleteDoc(taskDoc);
    alert(`Deleted ${name}..`)
    getTask();

  };
  console.log(content);

  // update
  const handleEditTask = async (id) => {
    const taskDoc = doc(userDocumentsCollection, id);
    await updateDoc(taskDoc, {
      content: content,
    });
    getTask();
    setSave(false);
    alert(`Updated...`)
  };

  const contentChange = (value) => {
    setContent(value);
    getTask();

  };

  const itemSelect =(id)=>{
    setItemId(id)
    setSave(true)
    getTask();
  }

  useEffect(() => {
    getTask();
  },[]);

  return (
    <div>
      <div style={{width:"100%",height:'100%',backgroundColor: "#ececff"}} className="row">
        <div style={{backgroundColor:"#f1f1f1",height:"100vh"}} className="col-3 d-flex  justify-content-center align-items-center flex-column border shadow">
          <button
            style={{ height: "6rem", width: "6rem" }}
            onClick={handleOpen}
            className="btn btn-light rounded-circle m-3 border d-flex flex-column justify-content-center align-items-center shadow"
          >
            <i class="fa-solid fa-file-circle-plus pt-3  text-primary fs-4"></i>
            <p className="fw-fw-bolder text-info">Create</p>

            {/* modal */}
          </button>

          <UserProfile/>

          <hr className="text-dark w-100 fw-bolder" />

          <div
            style={{ overflowY: "auto", maxHeight: "100%", height: "76vh" }}
            className="p-3"
          >
            {tasks?.map((item) => (
              
              <div
                onClick={()=>itemSelect(item.id)}
                key={item.id}
                style={{ width: "20rem",borderRadius:"20% 0% 20% 0%" }}
                className={save && itemId === item.id ? 'btn border bg-light p-3 d-flex justify-content-between align-items-center m-2 shadow':'btn border  p-3 d-flex justify-content-between align-items-center m-2 shadow'}
              >
                {item.taskname}
                <div>
                  <div
                    onClick={() => handleEditTask(item.id)}
                    className="btn rounded-circle border-1 border-success me-2"
                  >
                    {save && itemId === item.id  ? <i class="fa-regular fa-floppy-disk text-success fs-5"></i> :<i class="fa-solid fa-pen-to-square text-info"></i> }
                  </div>
                  <div
                    onClick={() => handleDeleteTask(item.id,item.taskname)}
                    className="btn rounded-circle border-1 border-danger"
                  >
                    <i class="fa-solid fa-trash text-danger"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* quill */}
        <div className="col-9" style={{ backgroundColor: "#ececff" }}>
          {tasks?.map((item, index) =>
            itemId === null && index===0 ? (<div
              style={{ height: "90vh" }}
              key={item.id}
              className="d-flex justify-content-center align-items-center"
            >
              <h1>
                <i className="fa-regular fa-file-excel fs-1"></i>
              </h1>
            </div>) :

            itemId === item.id && (
              <div key={item.id} className="p-5 animate__animated animate__bounce">
                <h1 style={{fontFamily:"Edu TAS Beginner",borderRadius:"20% 0% 20% 0%"}} className=" mb-2 p-3  shadow border  fw-bolder fs-2">{item.taskname} 📌</h1>
                <ReactQuill
                  style={{height:"500px"}}
                  key={item.id}
                  theme="snow"
                  defaultValue={item.content}
                  onChange={contentChange}
                />
              </div>
            ) 
         
          )}
        </div>
      </div>

      {/* Modal  */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="text-center" sx={style}>
            <TextField
              onChange={(e) => setTaskName(e.target.value)}
              className="w-100"
              id="outlined-basic"
              label="Add Task"
              variant="outlined"
            />
            <Button
              value={taskName}
              onClick={handleAddTask}
              className="w-50 mt-3 "
              variant="outlined"
            >
              ADD
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Document;
