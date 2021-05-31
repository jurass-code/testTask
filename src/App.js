import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import {
  v4 as uuidv4
} from 'uuid';
import AddForm from './components/Add-Form';
import ListWorker from './components/List-Workers';
import Modal from './components/Modal';
import NewWorker from './components/New-worker';
import EditWorker from './components/Edit-Form';

function App() {

  const [workers, setWorkers] = useState(
    JSON.parse(localStorage.getItem('list')) || []
  );
  const [modalActive, setModalActive] = useState(false);
  const [modalEditActive, setModalEditActive] = useState(false);
  const formRef = useRef()

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(workers))
  }, [workers])

  const addWorker = (objForm) => {
    const newWorker = {
      id: uuidv4(),
      surname: objForm.surname.value,
      name: objForm.name.value,
      patronymic: objForm.patronymic.value,
      position: objForm.position.value,
      dateOfBirth: objForm.dateOfBirth.value,
      gender: objForm.gender.value,
      dateOfEmployment: objForm.dateOfEmployment.value,
      dateOfDismissal: objForm.dateOfDismissal.value,
      driver: objForm.driver.checked ? 'Есть' : 'Нет',
    };
    setWorkers((workers) => [...workers, newWorker])
  };

  const deleteWorker = (id) => {
    setWorkers(workers.filter(item => item.id !== id));
  }

  const editArrayWorkers = (objForm) => {
    const newArray = workers;
    newArray[objForm.id.value].surname = objForm.surname.value;
    newArray[objForm.id.value].name = objForm.name.value;
    newArray[objForm.id.value].patronymic = objForm.patronymic.value;
    newArray[objForm.id.value].position = objForm.position.value;
    newArray[objForm.id.value].dateOfBirth = objForm.dateOfBirth.value;
    newArray[objForm.id.value].gender = objForm.gender.value;
    newArray[objForm.id.value].dateOfEmployment = objForm.dateOfEmployment.value;
    newArray[objForm.id.value].dateOfDismissal = objForm.dateOfDismissal.value;
    newArray[objForm.id.value].driver = objForm.driver.checked ? 'Есть' : 'Нет';

    localStorage.setItem('list', JSON.stringify(newArray));
    setWorkers(() => JSON.parse(localStorage.getItem('list')))
  }

  const edit = (id) => {
    workers.forEach((item, index) => {
      if (item.id === id) {
        formRef.current.id.value = index;
        formRef.current.surname.value = item.surname;
        formRef.current.name.value = item.name;
        formRef.current.patronymic.value = item.patronymic
        formRef.current.position.value = item.position
        formRef.current.dateOfBirth.value = item.dateOfBirth
        formRef.current.gender.value = item.gender
        formRef.current.dateOfEmployment.value = item.dateOfEmployment
        formRef.current.dateOfDismissal.value = item.dateOfDismissal
        formRef.current.driver.checked = (item.driver === 'Есть' ? true : false)
      }
    });
    setModalEditActive(true);
  }
  return (
    <div className="wrapper">
      <div className='container'>
        <h1 className='title-app'>Реестр сотрудников</h1>
        <ListWorker setActive={setModalActive} content={<NewWorker array={workers} deleteWorker={deleteWorker} editWorker={edit}/>}/>
        <Modal active={modalActive} setActive={setModalActive} content={<AddForm modalClose={setModalActive} SubmitForm={addWorker} />}/>
        <Modal active={modalEditActive} setActive={setModalEditActive} content={<EditWorker modalClose={setModalEditActive} formRef={formRef} SubmitForm={editArrayWorkers} />}/>
      </div>
    </div>
  );
}
export default App;