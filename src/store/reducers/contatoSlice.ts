
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  priority: ContactPriority;
}

interface ContactState {
  contacts: Contact[];
  searchQuery: string;
  selectedLetter: string;  
}

const initialState: ContactState = {
  contacts: [],
  searchQuery: '',
  selectedLetter: '',  
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
    updateContact(state, action: PayloadAction<Contact>) {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    deleteContact(state, action: PayloadAction<string>) {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedLetter(state, action: PayloadAction<string>) { 
      state.selectedLetter = action.payload;
    },
  },
});

export const { addContact, updateContact, deleteContact, setSearchQuery, setSelectedLetter } = contactSlice.actions;
export default contactSlice.reducer;
