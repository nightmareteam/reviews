import React from 'react';
//import styled from 'styled-components';
const styled = window.styled;

/**
 * This class is the template for all modals
 * @extends React.Component
 */
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  /**
   * Keeps the dialog box open on user click
   * @param {Object} e - an event object
   */
  onDialogClick(e) {
    // The overlay closes on click, but we need to make sure
    // if the click happens on the dialog, nothing happens
    e.stopPropagation();
  }

  render() {
    return (
      <ModalOverlay >
        <ModalContent onClick={this.props.onClose}>
          <ModalDialog onClick={this.onDialogClick}>
            {this.props.children}
          </ModalDialog>
        </ModalContent>
      </ModalOverlay>
    );
  }
}

// This is the dark background for the modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, .65);
`;

const ModalContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  overflow: auto;
  text-align: center;
  padding: 4px;
  cursor: pointer;
`;

const ModalDialog = styled.div`
  top: 100px;
  position: relative;
  background: #1b2738;
  outline: 0;
  padding: 30px;
  width: auto;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  max-width: auto;
  cursor: default;
  border-radius: 4px;
`;

export default Modal;