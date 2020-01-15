import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default class AboutModal extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        trigger={<span onClick={this.handleOpen}>About PacketCafe</span>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
      >
        <Modal.Header>About</Modal.Header>
          <Modal.Content scrolling>
            <Modal.Description>
              <Header>PacketCafe</Header>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu est imperdiet, tempor justo id, feugiat eros. Sed aliquet magna ultrices tellus maximus, sed euismod libero faucibus. Sed semper pharetra pretium. Nam a eros non metus vestibulum commodo. Phasellus eu eros id magna sodales dictum. Nunc quam eros, euismod a lacinia non, varius sed urna. Mauris ligula elit, rhoncus at nisl nec, volutpat faucibus neque. Sed volutpat, quam nec vestibulum interdum, leo ligula euismod risus, in sagittis turpis felis vitae odio. Nulla vulputate imperdiet sagittis. Integer elementum a dui et pulvinar.
              </p>
              <Header>Blog</Header>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu est imperdiet, tempor justo id, feugiat eros. Sed aliquet magna ultrices tellus maximus, sed euismod libero faucibus. Sed semper pharetra pretium. Nam a eros non metus vestibulum commodo. Phasellus eu eros id magna sodales dictum. Nunc quam eros, euismod a lacinia non, varius sed urna. Mauris ligula elit, rhoncus at nisl nec, volutpat faucibus neque. Sed volutpat, quam nec vestibulum interdum, leo ligula euismod risus, in sagittis turpis felis vitae odio. Nulla vulputate imperdiet sagittis. Integer elementum a dui et pulvinar.
              </p>
              <Header>Get Involved</Header>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu est imperdiet, tempor justo id, feugiat eros. Sed aliquet magna ultrices tellus maximus, sed euismod libero faucibus. Sed semper pharetra pretium. Nam a eros non metus vestibulum commodo. Phasellus eu eros id magna sodales dictum. Nunc quam eros, euismod a lacinia non, varius sed urna. Mauris ligula elit, rhoncus at nisl nec, volutpat faucibus neque. Sed volutpat, quam nec vestibulum interdum, leo ligula euismod risus, in sagittis turpis felis vitae odio. Nulla vulputate imperdiet sagittis. Integer elementum a dui et pulvinar.
              </p>
            </Modal.Description>
          </Modal.Content>
          {/* <Modal.Actions>
            <Button primary>
              Proceed <Icon name='chevron right' />
            </Button>
          </Modal.Actions> */}
      </Modal>
    )
  }
}