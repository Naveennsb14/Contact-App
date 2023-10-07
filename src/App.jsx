import Navbar from "./components/Navbar"
import { FiSearch } from "react-icons/fi"
import { AiFillPlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import {collection, getDocs} from "firebase/firestore"
import { db } from "./config/firebase"
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from "react-icons/io"
import { RiEditCircleLine } from "react-icons/ri"


const App = () => {

  const [contacts, setContacts]= useState([]);

  useEffect(()=>{
    const getContacts = async () =>{

      try {
        const contactsRef = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsRef);
        const contactList = contactsSnapshot.docs.map((doc)=>{
          return {
            id: doc.id,
            ...doc.data()
          }
        })
        setContacts(contactList);
      } catch (error) {
        
      }
    };

    getContacts();

  },[])



  return (
    <div className="max-w-[370px] mx-auto px-4">
      <Navbar/>
      <div className="flex gap-2">
      <div className="flex relative items-center ml-1 flex-grow" >
      <FiSearch className="text-white text-3xl absolute"/>
        <input type="text" className=" text-white pl-9 flex-grow bg-transparent border border-white
        rounded-md h-10" />
      </div>
        <AiFillPlusCircle className="text-5xl text-white cursor-pointer"/>
      
      </div>
      <div>
        {contacts.map((contact)=>(
            <div key={contact.id}>
              <HiOutlineUserCircle/>
              <div className="text-white">
                <h2 className="">{contact.name}</h2>
                <p className="text-white">{contact.email}</p>
              </div>
              <div>
              <RiEditCircleLine/>
                <IoMdTrash/>
              </div>
            </div>

        ))
        }
      </div>
    </div>
 
  )
}

export default App
