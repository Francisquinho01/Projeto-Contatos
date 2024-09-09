import React, { useState, useEffect } from 'react';
import { Contact } from '../../store/reducers/contatoSlice';

interface EditContactFormProps {
  contact: Contact;
  onUpdateContact: (contact: Contact) => void;
  onCancel: () => void;
}

const EditContactForm: React.FC<EditContactFormProps> = ({ contact, onUpdateContact, onCancel }) => {
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);

  useEffect(() => {
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
  }, [contact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContact({ ...contact, name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome completo"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        required
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefone"
        required
      />
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default EditContactForm;
