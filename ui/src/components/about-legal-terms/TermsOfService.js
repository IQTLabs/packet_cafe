import _ from 'lodash';
import React, { Component } from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

export default class TermsOfServiceModal extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        trigger={<span onClick={this.handleOpen}>Terms of Service</span>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
      >
        <Modal.Header>Profile Picture</Modal.Header>
          <Modal.Content scrolling>
            <Modal.Description>
              <Header>Modal Header</Header>

            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary>
              Proceed <Icon name='chevron right' />
            </Button>
          </Modal.Actions>
      </Modal>
    )
  }
}