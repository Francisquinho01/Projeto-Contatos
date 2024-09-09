import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Header from './components/header/Header';
import ContactForm from './components/addcontato/addcontato';
import EditContactForm from './components/EditContato/EditContactForm';
import { RootState, AppDispatch } from './store/store';
import { addContact, deleteContact, updateContact } from './store/reducers/contatoSlice';
import { ContactPriority } from './types/enums';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const searchQuery = useSelector((state: RootState) => state.contacts.searchQuery);
  const selectedLetter = useSelector((state: RootState) => state.contacts.selectedLetter);
  const [showForm, setShowForm] = React.useState(false);
  const [editContact, setEditContact] = React.useState<Contact | null>(null);

  const handleAddContact = (contact: { id: string; name: string; email: string; phone: string; priority: ContactPriority }) => {
    dispatch(addContact(contact));
    setShowForm(false);
  };

  const handleEditContact = (contact: Contact) => {
    dispatch(updateContact(contact));
    setEditContact(null);
  };

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
    setEditContact(null); 
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedLetter ? contact.name.toUpperCase().startsWith(selectedLetter) : true)
  );

  return (
    <>
      <Header onShowForm={handleShowForm} />
      <Container>
        {showForm && !editContact ? (
          <ContactForm onAddContact={handleAddContact} />
        ) : editContact ? (
          <EditContactForm
            contact={editContact}
            onUpdateContact={handleEditContact}
            onCancel={() => setEditContact(null)}
          />
        ) : (
          <Row>
            {filteredContacts.map(contact => {
            
              const names = contact.name.split(' ');
              const initials = (names[0]?.[0] || '') + (names[1]?.[0] || '');
              const backgroundColor = getRandomColor();
              return (
                <ContactCard
                  key={contact.id}
                  className={`contact-${contact.priority}`}
                >
                  <InitialsWrapper>
                    <Initials backgroundColor={backgroundColor}>
                      {initials.toUpperCase()}
                    </Initials>
                  </InitialsWrapper>
                  <h5>{contact.name}</h5>
                  <h5>{contact.email}</h5>
                  <h5>{contact.phone}</h5>
                  <Button onClick={() => setEditContact(contact)}>Editar</Button>
                  <Button onClick={() => handleDeleteContact(contact.id)}>Excluir</Button>
                </ContactCard>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
};

export default App;



const Container = styled.div`
  padding-top: 30px;
  padding-right: 10px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const ContactCard = styled.div`
  flex: 1 1 calc(25% - 20px);
  margin: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;

  h5 {
    font-size: 14px;
    margin: 10px 0;
  }

  &.contact-low {
    /* Additional styles for low priority */
  }

  &.contact-medium {
    /* Additional styles for medium priority */
  }

  &.contact-high {
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const InitialsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Initials = styled.div<{ backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${props => props.backgroundColor};
  color: white;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    background-color: chartreuse;
  }
`;
