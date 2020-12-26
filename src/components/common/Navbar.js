import React, { useContext, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/navbar.css';
import Autosuggest from 'react-autosuggest';
import firebase from '../firebase/base';
import AppContext from '../../context/AppContext';

function Navigation() {
  const { user } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const history = useHistory();

  React.useEffect(() => {
    const fetchData = async () => {
      await firebase.db
        .collection('characters')
        .get()
        .then((querySnapshot) => {
          setItems(querySnapshot.docs.map((doc) => doc.data()));
        });
    };

    return fetchData();
  }, []);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : items.filter(
          (lang) =>
            lang.characterName.toLowerCase().slice(0, inputLength) ===
            inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => suggestion.characterName;

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <div>{suggestion.characterName}</div>
  );
  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const inputProps = {
    placeholder: 'Search...',
    value,
    onChange: onChange,
  };

  return (
    <>
      <Navbar bg="white" id="app_navbar" sticky="top">
        <Navbar.Brand href="/">
          <img
            alt="logo"
            src="/assets/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
        <Nav className="mr-auto">
          {user ? (
            <Nav.Link
              className="nav-link-text"
              activeClassName="active"
              as={Link}
              to="/dashboard"
              exact
            >
              Home
            </Nav.Link>
          ) : (
            <Nav.Link
              className="nav-link-text"
              activeClassName="active"
              as={Link}
              to="/signin"
              exact
            >
              Home
            </Nav.Link>
          )}

          <Nav.Link
            className="nav-link-text"
            activeClassName="active"
            as={Link}
            to="/explore"
            exact
          >
            Explore
          </Nav.Link>
        </Nav>

        <Autosuggest
          className="center-search"
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />

        <SearchIcon className="search" style={{ fontSize: 32 }} />

        <Nav className="ml-auto">
          <Nav.Link
            className="nav-link-text"
            activeClassName="active"
            as={Link}
            to="/About"
            exact
          >
            About
          </Nav.Link>
          <NavDropdown title="Account" alignRight id="basic-nav-dropdown">
            {user ? (
              <>
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    firebase.logout();
                    toast.success('You have successfully logged out!', {
                      position: 'top-right',
                      autoClose: 3000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    history.push('/');
                  }}
                >
                  Logout
                </NavDropdown.Item>{' '}
              </>
            ) : (
              <>
                <NavDropdown.Item as={Link} to="/signin">
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/signup">
                  Register
                </NavDropdown.Item>{' '}
              </>
            )}
          </NavDropdown>
        </Nav>
      </Navbar>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Navigation;
