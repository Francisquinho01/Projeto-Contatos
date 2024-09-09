
import React, { useState } from 'react';
import { ContactPriority } from '../../types/enums';
import './addcontato.css'
interface ContactFormProps {
  onAddContact: (contact: { id: string; name: string; email: string; phone: string; priority: ContactPriority }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [priority, setPriority] = useState(ContactPriority.LOW);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && phone) {
      onAddContact({ id: Date.now().toString(), name, email, phone, priority });
      setName('');
      setEmail('');
      setPhone('');
      setPriority(ContactPriority.LOW);
    }
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
      <select value={priority} onChange={(e) => setPriority(e.target.value as ContactPriority)}>
        <option value={ContactPriority.LOW}>Baixa</option>
        <option value={ContactPriority.MEDIUM}>Média</option>
        <option value={ContactPriority.HIGH}>Alta</option>
      </select>
      <button type="submit">Adicionar Contato</button>
    </form>
  );
};

export default ContactForm;
