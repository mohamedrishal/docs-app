import React, { useEffect, useState } from "react";
import MyQuillEditor from "../Components/MyQuillEditor ";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function Document() {
  const [email, setEmail] = useState([]);

  const channelCollectionRef = collection(db, "signup");

  const getEmail = async () => {
    const data = await getDocs(channelCollectionRef);
    console.log(data);
    const filleterdData = data.docs.map((doc) => ({
      ...doc.data(),
      id:doc.id
    }));
    console.log(filleterdData);
    setEmail(filleterdData)
    filleterdData.map((itme)=>{
      console.log(itme.email);
    })

  };

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <div>
      <div className="row container-fluid">
        <div
          style={{ overflowY: "auto" }}
          className="col-3 d-flex justify-content-center align-items-center flex-column border"
        >
          <button className="btn btn-light p-2 rounded-circle h-25 w-25 px-5 my-5 p-1 border  d-flex flex-column justify-content-center align-items-center">
            <i class="fa-solid fa-file-circle-plus pt-3  text-primary fs-3"></i>
            <p className="fw-fw-bolder">Create</p>

            {/* modal */}
          </button>

          <hr className="text-dark w-100 fw-bolder" />

          <div>
            <div
              style={{ width: "20rem" }}
              className="border p-3 d-flex justify-content-between align-items-center"
            >
              List 1{" "}
              <div className="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <div
              style={{ width: "20rem" }}
              className="border p-3 d-flex justify-content-between align-items-center"
            >
              List 2{" "}
              <div className="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <div
              style={{ width: "20rem" }}
              className="border p-3 d-flex justify-content-between align-items-center"
            >
              List 3{" "}
              <div className="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <div
              style={{ width: "20rem" }}
              className="border p-3 d-flex justify-content-between align-items-center"
            >
              List 4{" "}
              <div className="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <div
              style={{ width: "20rem" }}
              className="border p-3 d-flex justify-content-between align-items-center"
            >
              List 5{" "}
              <div className="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <div
              style={{ width: "20rem" }}
              className="border p-3 d-flex justify-content-between align-items-center"
            >
              List 6{" "}
              <div className="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <div
              style={{ width: "20rem" }}
              className="border p-3 d-flex justify-content-between align-items-center"
            >
              List 7{" "}
              <div className="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-9">
          <MyQuillEditor />
        </div>
      </div>
    </div>
  );
}

export default Document;
