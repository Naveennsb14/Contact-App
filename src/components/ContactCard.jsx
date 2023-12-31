import { deleteDoc,doc } from "firebase/firestore";
import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import useDisclouse from "../hooks/useDisclouse";
import AddandUpdateContact from "./AddandUpdateContact";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {


    const {isOpen, onClose, onOpen}  = useDisclouse();




  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div
      key={contact.id}
      className="flex items-center justify-between bg-yellow rounded-lg p-2"
    >
      <div className="flex">
        <HiOutlineUserCircle className="text-4xl text-orange" />
        <div className="">
          <h2 className="font-medium">{contact.name}</h2>
          <p className="text-sm">{contact.email}</p>
        </div>
      </div>
      <div className="flex text-3xl">
        <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
        <IoMdTrash
          onClick={() => deleteContact(contact.id)}
          className="text-orange cursor-pointer"
        />
      </div>
    </div>
    <AddandUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

export default ContactCard;
