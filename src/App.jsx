import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddandUpdateContact from "./components/AddandUpdateContact";
import useDisclouse from "./hooks/useDisclouse";


const App = () => {
  const [contacts, setContacts] = useState([]);

  const{isOpen, onClose, onOpen} = useDisclouse()

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef,(snapshot)=>{
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
          return contactList;
        })
        
      } catch (error) {}
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-1">
          <div className="flex relative items-center ml-1 flex-grow">
            <FiSearch className="text-white text-3xl absolute" />
            <input onChange={filterContacts}
              type="text"
              className=" text-white pl-9 flex-grow bg-transparent border border-white
        rounded-md h-10"
            />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            className="text-5xl text-white cursor-pointer"
          />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddandUpdateContact onClose={onClose} isOpen={isOpen}/>
      <ToastContainer position="bottom-center"/>
      
    </>
  );
};

export default App;
