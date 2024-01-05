import { IoClose } from "react-icons/io5";

import Button from "../components/button";
import Input from "../components/Input";

import styles from "./styles/editInfoUser.module.css";
import { useState } from "react";
import instanceApi from "../api/instancePrivate";

function EditInfoUser({ name, description, links, address, setEditBut,handleFetch }) {

    const [data, setData] = useState({ name: name, description: description, links: links, address: address });
    
    const { instancePriv } = instanceApi();
    
    
  const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
  };
   
  const handleSubmit = async () => {
    try {
      await instancePriv.patch('/edit/user',  data )
      setEditBut(false)
      handleFetch() 
    } catch (error) {
      console.log('Deu error'+error);
      }
  }

  
  return (
    <div className={styles.boxBackground}>
      <div className={styles.boxEditInfouser}>
        <div id={styles.header}>
          <IoClose onClick={()=> setEditBut(false)}/>
          <Button text="Salvar" handleClick={()=>handleSubmit()} />
        </div>
        <form>
        <Input
          type="text"
          name="name"
          text="Nome"
          value={data.name ? data.name : '' }
          handleChange={handleChange}
          />
        <div className={styles.boxInput}>
          <label htmlFor="description">Descrição</label>
          <textarea
            type="text"
            name="description"
            text="Descrição"
            value={data.description? data.description : ''}
            onChange={handleChange}
            rows='10'
            cols='10'
          ></textarea>
        </div>
        <Input
          type="text"
          name="address"
          text="Endereço"
          value={data.address? data.address : ''}
          handleChange={handleChange}
        />
        <Input
          type="text"
          name="links"
          text="Link"
          value={data.links? data.links : ''}
          handleChange={handleChange}
        />
        </form>
      </div>
    </div>
  );
}

export default EditInfoUser;
