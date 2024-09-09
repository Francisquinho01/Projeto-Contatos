
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setSelectedLetter } from '../../store/reducers/contatoSlice';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

interface HeaderProps {
  onShowForm: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowForm }) => {
  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    dispatch(setSelectedLetter('')); 
  };

  const handleLetterClick = (letter: string) => {
    dispatch(setSelectedLetter(letter));
    dispatch(setSearchQuery('')); 
  };

  return (
    <>
      <HeaderContainer>
        <div className="container A">
          <div className="row">
            <div className="col-12">
              <Title>Projeto Contatos</Title>
            </div>
            <div className="col-12">
              <Nav>
                <ul>
                  <li><NavButton onClick={onShowForm}>Novo Contato</NavButton></li>
                  <li>
                    <SearchInput
                      type="text"
                      placeholder="Procurar Contato"
                      onChange={handleSearchChange}
                    />
                  </li>
                  <li>
                    <AlphabetContainer>
                      {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(letter => (
                        <AlphabetButton key={letter} onClick={() => handleLetterClick(letter)}>
                          {letter}
                        </AlphabetButton>
                      ))}
                    </AlphabetContainer>
                  </li>
                </ul>
              </Nav>
            </div>
          </div>
        </div>
        <Subtitle>Lista De Contatos</Subtitle>
      </HeaderContainer>
    </>
  );
};

export default Header;


const HeaderContainer = styled.header`
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
  width: 100%;
  padding: 10px 0;
`;

const Title = styled.h1`
  text-align: center;
`;

const Nav = styled.nav`
  background: linear-gradient(to right, #000000, #434343);
  border-radius: 15px;
  padding: 10px;
  width: 100%;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  li {
    margin: 5px;
  }
`;

const NavButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #555;
    transform: scale(1.05);
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
`;

const AlphabetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const AlphabetButton = styled.button`
  background-color: #444;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #666;
    transform: scale(1.1);
  }
`;

const Subtitle = styled.h1`
  text-align: center;
`;
